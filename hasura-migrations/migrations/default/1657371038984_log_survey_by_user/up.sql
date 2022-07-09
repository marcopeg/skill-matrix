CREATE OR REPLACE FUNCTION "public"."log_survey_by_user"(
  "hasura_session" JSON,
  "question_id" INT,
  "score" SMALLINT,
  "data" JSON DEFAULT '{}',
  "notes" TEXT DEFAULT ''
)
RETURNS SETOF "public"."survey_by_user" AS $$
# variable_conflict use_variable
BEGIN
  RETURN QUERY
  SELECT
    (hasura_session ->> 'x-hasura-user-id')::int AS "user_id",
    (hasura_session ->> 'x-hasura-board-id')::int AS "board_id",
    (hasura_session ->> 'x-hasura-survey-id')::int AS "survey_id",
    question_id AS "question_id",
    now() AS "question_created_at",
    '{}'::json AS "question_data",
    1::bigint AS "answer_id",
    now() AS "answer_created_at",
    score AS "answer_score",
    data AS "answer_data",
    notes AS "answer_notes"
    FROM "public"."users" LIMIT 1
  ;
END;
$$ VOLATILE LANGUAGE plpgsql;