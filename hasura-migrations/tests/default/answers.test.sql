BEGIN;
SELECT plan(3);

-- Seed required data:
INSERT INTO "public"."boards" VALUES (1, 'Board1');
INSERT INTO "public"."users" VALUES (1, 'User1');

INSERT INTO "public"."questions" ("id", "board_id", "data", "created_at") VALUES 
  (1, 1, '{"v":1}', '2022-07-08 11:10')
, (2, 1, '{"v":1}', '2022-07-08 11:10')
;

INSERT INTO "public"."surveys" ("id", "board_id") VALUES (1, 1);

-- Add Answers
INSERT INTO "public"."answers" 
  ("id",  "board_id",  "survey_id",  "user_id",  "question_id",  "question_created_at",     "score",  "data",      "notes") VALUES
  (1,     1,           1,            1,          1,              '2022-07-08 11:10',        10,       '{"v":1}',   'foo')
, (2,     1,           1,            1,          2,              '2022-07-08 11:10',        10,       '{"v":1}',   'foo')
;




-- Verify that there is only one version for answer n.1
SELECT results_eq(
  'SELECT COUNT(*) FROM "public"."answers" WHERE "id" = 1',
  $$VALUES ( 1::bigint )$$,
  'AnswerID=1 should have only on record'
);


-- Add a write-only modification to such an answer:
INSERT INTO "public"."answers" 
  ("id",  "board_id",  "survey_id",  "user_id",  "question_id",  "question_created_at",     "score",  "data",      "notes") VALUES
  (1,     1,           1,            1,          1,              '2022-07-08 11:10',        20,       '{"v":2}',   'foo')
;

SELECT results_eq(
  'SELECT COUNT(*) FROM "public"."answers" WHERE "id" = 1',
  $$VALUES ( 2::bigint )$$,
  'AnswerID=1 should have two records'
);

-- Try to get the latest result for a specific question:
SELECT results_eq(
  $$
    SELECT DISTINCT ON ("id") "id", ("data"->>'v')::int AS "v" 
    FROM "public"."answers" 
    WHERE "id" = 1 
    ORDER BY "id", "created_at" DESC
  $$,
  $$VALUES ( 1::bigint, 2 )$$,
  'It should return the latest version of a given record'
);


SELECT * FROM finish();
ROLLBACK;