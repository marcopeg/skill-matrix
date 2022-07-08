BEGIN;
SELECT plan(9);

PREPARE "get_surveys" AS
SELECT 
  "board_id",
  "survey_id",
  "id",
  ("data"->>'v')::int AS "question_v"
FROM "public"."surveys_questions";

PREPARE "get_survey" AS
SELECT 
  "board_id",
  "survey_id",
  "id",
  ("data"->>'v')::int AS "question_v"
FROM "public"."surveys_questions"
WHERE "survey_id" = $1;




--- 
--- ASSOCIATE QUESTIONS TO A SURVEY
---

INSERT INTO "public"."boards" VALUES (1, 'b1');
INSERT INTO "public"."questions" ("board_id", "id", "type", "data") 
VALUES (1, 1, 'star', '{"v":1}');

INSERT INTO "public"."surveys" ("id", "board_id") VALUES (1, 1);

SELECT results_eq(
  'get_surveys',
  $$VALUES ( 1, 1, 1, 1 )$$,
  'It should return only questions associated with a survey'
);



---
--- GET THE VERSION THAT IS CLOSEST TO THE SURVEY
---

INSERT INTO "public"."questions" ("board_id", "id", "type", "data") 
VALUES (1, 1, 'star', '{"v":2}');

SELECT results_eq(
  'get_surveys',
  $$VALUES ( 1, 1, 1, 1 )$$,
  'It should select the version that is closes to the survey'
);



---
--- IT SHOULD ALWAYS GET THE LASTEST AVAILABLE VERSION BY CONTEXT
---

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES (1, 1, 'star', '{"v":3}'), (1, 1, 'star', '{"v":4}');

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (2, 1);

SELECT results_eq(
  'get_surveys',
  $$VALUES 
    ( 1, 2, 1, 4 )
  , ( 1, 1, 1, 1 )
  $$,
  'It should select the version that is closes to the survey with multiple questions available'
);



---
--- IT SHOULD COLLECT MULTIPLE QUESTIONS FOR A SURVEY
---

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES (1, 2, 'star', '{"v":1}');

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (3, 1);

SELECT results_eq(
  'EXECUTE get_survey(3)',
  $$VALUES 
    ( 1, 3, 1, 4 )
  , ( 1, 3, 2, 1 )
  $$,
  'It should identify multiple questions for a specific survey'
);

SELECT results_eq(
  'EXECUTE get_surveys',
  $$VALUES 
    ( 1, 3, 1, 4 )
  , ( 1, 3, 2, 1 )
  , ( 1, 2, 1, 4 )
  , ( 1, 1, 1, 1 )
  $$,
  'It should identify multiple questions for each survey'
);



---
--- IT SHOULD NOT LIST DELETED QUESTIONS
---

INSERT INTO "public"."questions" ("board_id", "id", "type", "data", "is_deleted")
VALUES (1, 2, 'star', '{"v":2}', true);

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (4, 1);

SELECT results_eq(
  'EXECUTE get_survey(4)',
  $$VALUES ( 1, 4, 1, 4 )$$,
  'It should skip deleted questions'
);



---
--- IT SHOULD SKIP INTERMEDIATE VERSIONS
---

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES (1, 3, 'star', '{"v":1}');

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES (1, 3, 'star', '{"v":2}');

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (5, 1);

SELECT results_eq(
  'EXECUTE get_survey(5)',
  $$VALUES 
    ( 1, 5, 1, 4 )
  , ( 1, 5, 3, 2 )
  $$,
  'It should skip intermediate'
);



---
--- IT SHOULD HANDLE MULTIPLE BOARDS
---

INSERT INTO "public"."boards" VALUES (2, 'b2');

SELECT results_eq(
  'EXECUTE get_survey(4)',
  $$VALUES ( 1, 4, 1, 4 )$$,
  'An existing survey should stay immutable to the creation of a new board'
);

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES 
  (2, 4, 'star', '{"v":1}')
, (2, 5, 'star', '{"v":1}')
, (2, 4, 'star', '{"v":2}')
;

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (6, 2);

SELECT results_eq(
  'EXECUTE get_survey(6)',
  $$VALUES 
    ( 2, 6, 4, 2 )
  , ( 2, 6, 5, 1 )
  $$,
  'It should list questions for a survey related to a new board'
);


SELECT * FROM finish();
ROLLBACK;