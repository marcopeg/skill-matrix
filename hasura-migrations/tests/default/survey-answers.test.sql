BEGIN;
SELECT plan(2);

-- p1: user_id
-- p2: survey_id
PREPARE "get_survey_questions_answers" (int, int) AS
SELECT
  "user_id",
  "board_id",
  "survey_id",
  "question_id",
  "answer_id",
  "question_data"::text AS "question_data",
  "answer_score" AS "answer_score",
  "answer_data"::text AS "answer_data"
  FROM "public"."get_survey_by_user"($2, $1);

INSERT INTO "public"."boards" VALUES (1, 'b1');

INSERT INTO "public"."questions" 
  ("board_id",  "id",   "data",     "created_at") VALUES 
  (1,           1,      '{"v":1}',  '2022-07-08 11:10')
, (1,           2,      '{"v":1}',  '2022-07-08 11:10')
;

INSERT INTO "public"."surveys" 
  ("id",  "board_id", "created_at") VALUES 
  (1,     1,          '2022-07-08 11:10');

INSERT INTO "public"."users" 
  ("id",  "name") VALUES 
  (1,     'User1');

INSERT INTO "public"."answers" 
  ("id",  "board_id",  "survey_id",  "user_id",  "question_id",  "question_created_at",     "score",  "data",      "notes") VALUES
  (1,     1,           1,            1,          1,              '2022-07-08 11:10',        10,       '{"v":1}',   'foo')
;

SELECT results_eq(
  $$EXECUTE get_survey_questions_answers(1, 1)$$,
  $$VALUES 
    ( 1, 1, 1, 1, 1::bigint, '{"v": 1}', 10::smallint, '{"v":1}' )
  , ( 1, 1, 1, 2, null, '{"v": 1}', null, null )
  $$,
  'It should join a survey cached questions with the related available answers'
);


---
--- WRITE ONLY LOG
--- Answers are never modified, only a new version gets appended
---

INSERT INTO "public"."answers" 
  ("id",  "board_id",  "survey_id",  "user_id",  "question_id",  "question_created_at",     "score",  "data",      "notes") VALUES
  (1,     1,           1,            1,          1,              '2022-07-08 11:10',        20,       '{"v":2}',   'foo')
;

SELECT results_eq(
  $$EXECUTE get_survey_questions_answers(1, 1)$$,
  $$VALUES 
    ( 1, 1, 1, 1, 1::bigint, '{"v": 1}', 20::smallint, '{"v":2}' )
  , ( 1, 1, 1, 2, null, '{"v": 1}', null, null )
  $$,
  'It should return the latest version of an answer'
);


SELECT * FROM finish();
ROLLBACK;