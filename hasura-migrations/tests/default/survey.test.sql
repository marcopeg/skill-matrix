BEGIN;
SELECT plan(5);


PREPARE "get_surveys_view" AS
-- SELECT 
--   "board_id",
--   "survey_id",
--   "id",
--   ("data"->>'v')::int AS "question_v"
-- FROM "public"."surveys_questions";

SELECT DISTINCT ON ("s"."id", "q"."id")
  "s"."board_id",
  "s"."id" AS "survey_id",
  "q"."id" AS "question_id",
  ("data"->>'v')::int AS "question_v"
FROM "public"."questions" AS "q"
JOIN "public"."surveys" AS "s" 
  ON "q"."board_id" = "s"."board_id"
WHERE "q"."etag" <= "s"."created_at"
ORDER BY "s"."id" DESC, "q"."id", "q"."etag" DESC
;

PREPARE "get_survey_view" (INT) AS
SELECT DISTINCT ON ("s"."id", "q"."id")
  "s"."board_id",
  "s"."id" AS "survey_id",
  "q"."id" AS "question_id",
  ("data"->>'v')::int AS "question_v"
FROM "public"."questions" AS "q"
JOIN "public"."surveys" AS "s" 
  ON "q"."board_id" = "s"."board_id"
WHERE "q"."etag" <= "s"."created_at"
  AND "s"."id" = $1
ORDER BY "s"."id" DESC, "q"."id", "q"."etag" DESC
;




--- 
--- ASSOCIATE QUESTIONS TO A SURVEY
---

INSERT INTO "public"."boards" VALUES (1, 'b1');
INSERT INTO "public"."questions" ("board_id", "id", "type", "data") 
VALUES (1, 1, 'star', '{"v":1}');

INSERT INTO "public"."surveys" ("id", "board_id") VALUES (1, 1);

SELECT results_eq(
  'get_surveys_view',
  $$VALUES ( 1, 1, 1, 1 )$$,
  'It should return only questions associated with a survey'
);



---
--- GET THE VERSION THAT IS CLOSEST TO THE SURVEY
---

INSERT INTO "public"."questions" ("board_id", "id", "type", "data") 
VALUES (1, 1, 'star', '{"v":2}');

SELECT results_eq(
  'get_surveys_view',
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
  'get_surveys_view',
  $$VALUES 
    ( 1, 2, 1, 4 )
  , ( 1, 1, 1, 1 )
  $$,
  'It should select the version that is closes to the survey'
);



---
--- IT SHOULD COLLECT MULTIPLE QUESTIONS FOR A SURVEY
---

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES (1, 2, 'star', '{"v":1}');

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (3, 1);

SELECT results_eq(
  'EXECUTE get_survey_view( 3 )',
  $$VALUES 
    ( 1, 3, 1, 4 )
  , ( 1, 3, 2, 1 )
  $$,
  'It should select the version that is closes to the survey'
);

SELECT results_eq(
  'EXECUTE get_surveys_view',
  $$VALUES 
    ( 1, 3, 1, 4 )
  , ( 1, 3, 2, 1 )
  , ( 1, 2, 1, 4 )
  , ( 1, 1, 1, 1 )
  $$,
  'It should select the version that is closes to the survey'
);



SELECT * FROM finish();
ROLLBACK;