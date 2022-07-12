BEGIN;
SELECT plan(5);

INSERT INTO "public"."boards" VALUES (1, 'b1');

INSERT INTO "public"."questions" 
  ("board_id",  "id",   "data",     "created_at",         "priority") VALUES 
  (1,           1,      '{"v":1}',  '2022-07-08 11:10',   1)
, (1,           2,      '{"v":1}',  '2022-07-08 11:10',   2)
;

INSERT INTO "public"."surveys" 
  ("id",  "board_id", "created_at") VALUES 
  (1,     1,          '2022-07-08 11:10');

INSERT INTO "public"."users" 
  ("id",  "name") VALUES 
  (1,     'User1')
, (2,     'User2')
;

INSERT INTO "public"."surveys_invites" 
  ("survey_id",   "user_id") VALUES 
  (1,             1)
, (1,             2)
;

INSERT INTO "public"."answers" 
  ("board_id",  "survey_id",  "user_id",  "question_id",  "question_created_at",     "score",  "data",      "notes") VALUES
  (1,           1,            1,          1,              '2022-07-08 11:10',        10,       '{"v":1}',   'foo')
;

SELECT results_eq(
  $$SELECT
      "question_id",
      "answer_score"::text
    FROM "public"."get_survey_by_user"('{"x-hasura-survey-id":1,"x-hasura-user-id":1}'::json)$$,
  $$VALUES 
    ( 2, null )
  , ( 1, '10' )
  $$,
  'It should join a survey cached questions with the related available answers'
);


---
--- WRITE ONLY LOG
--- Answers are never modified, only a new version gets appended
---

INSERT INTO "public"."answers" 
  ("board_id",  "survey_id",  "user_id",  "question_id",  "question_created_at",     "score",  "data",      "notes") VALUES
  (1,           1,            1,          1,              '2022-07-08 11:10',        20,       '{"v":2}',   'foo')
;

SELECT results_eq(
  $$SELECT
      "question_id",
      "answer_score"::text
    FROM "public"."get_survey_by_user"('{"x-hasura-survey-id":1,"x-hasura-user-id":1}'::json)$$,
  $$VALUES 
    ( 2, null )
  , ( 1, '20' )
  $$,
  'It should return the latest version of an answer'
);

SELECT results_eq(
  $$SELECT
      "question_id",
      "answer_score"::text
    FROM "public"."get_survey_by_user"('{"x-hasura-survey-id":1,"x-hasura-user-id":2}'::json)$$,
  $$VALUES 
    ( 2, null )
  , ( 1, null )
  $$,
  'It should return null values if no answers are given'
);

SELECT results_eq(
  $$SELECT COUNT(*)::int FROM "public"."get_survey_by_user"('{"x-hasura-survey-id":1,"x-hasura-user-id":3}'::json)$$,
  $$VALUES ( 0 )$$,
  'It should return no rows if a user is not invited to a survey'
);

SELECT results_eq(
  $$SELECT COUNT(*)::int FROM "public"."get_survey_by_user"('{"x-hasura-survey-id":3,"x-hasura-user-id":1}'::json)$$,
  $$VALUES ( 0 )$$,
  'It should return no rows if a survey does not exists'
);







SELECT * FROM finish();
ROLLBACK;