BEGIN;
SELECT plan(1);

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
  (1,     'User1')
, (2,     'User2')
;

INSERT INTO "public"."surveys_invites" 
  ("survey_id",   "user_id") VALUES 
  (1,             1)
, (1,             2)
;

SELECT * FROM "public"."log_survey_by_user"(
  '{
    "x-hasura-user-id": 1,
    "x-hasura-survey-id": 1
  }'::json,
  1,
  10
);

SELECT results_eq(
  $$SELECT
      "question_id",
      "answer_score"::text
    FROM "public"."get_survey_by_user"('{"x-hasura-survey-id":1,"x-hasura-user-id":1}'::json)$$,
  $$VALUES 
    ( 1, '10' )
  , ( 2, null)
  $$,
  'It should join a survey cached questions with the related available answers'
);


SELECT * FROM finish();
ROLLBACK;