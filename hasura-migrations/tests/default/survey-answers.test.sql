BEGIN;
SELECT plan(2);

-- p1: user_id
-- p2: survey_id
PREPARE "get_survey_questions_answers" (int, int) AS
SELECT DISTINCT ON ("a"."id")
  "q"."user_id",
  "q"."board_id",
  "q"."survey_id",
  "q"."id" AS "question_id",
  "a"."id" AS "answer_id",
  "q"."data"::text AS "question_data",
  "a"."score" AS "answer_score",
  "a"."data"::text AS "answer_data",
  "a"."notes" AS "answer_notes"
  -- "a"."question_etag" AS "question_created_at",
  -- "a"."created_at" AS "answer_created_at",
  -- "a"."updated_at" AS "answer_updated_at"
FROM (
  SELECT 
    $1 AS "user_id", 
    "board_id", 
    "survey_id", 
    "question".*
  FROM
    (
      SELECT
        "id" AS "survey_id", 
        "board_id", 
        ("cache" ->> 'questions')::jsonb AS "cache"
      FROM "public"."surveys"
      WHERE "id" = $2
    ) "srv",
    jsonb_to_recordset("srv"."cache") AS "question" (
      "id" INT,
      "created_at" TIMESTAMPTZ,
      "data" JSON
    )
) "q"
LEFT JOIN "public"."answers" AS "a" 
   ON "a"."user_id" = "q"."user_id" 
  AND "a"."question_id" = "q"."id"

ORDER BY "a"."id"
;

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
    ( 1, 1, 1, 1, 1::bigint, '{"v": 1}', 10::smallint, '{"v":1}', 'foo' )
  , ( 1, 1, 1, 2, null, '{"v": 1}', null, null, null )
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
    ( 1, 1, 1, 1, 1::bigint, '{"v": 1}', 20::smallint, '{"v":2}', 'foo' )
  , ( 1, 1, 1, 2, null, '{"v": 1}', null, null, null )
  $$,
  'It should return the latest version of an answer'
);


SELECT * FROM finish();
ROLLBACK;