CREATE OR REPLACE FUNCTION "public"."log_survey_by_user"(
  "hasura_session" JSON,
  "question_id" INT,
  "score" INT,
  "data" JSON DEFAULT '{}',
  "notes" TEXT DEFAULT ''
)
RETURNS SETOF "public"."survey_by_user" AS $$
# variable_conflict use_variable
DECLARE
  VAR_question record;
BEGIN

  -- Get question etag
  SELECT
    "board_id", 
    "question".* 
  INTO VAR_question
  FROM (
    SELECT
      "board_id",
      ("cache" ->> 'questions')::jsonb AS "data"
    FROM "public"."surveys"
    WHERE "id" = ("hasura_session" ->> 'x-hasura-survey-id')::int
  ) "cache",
  jsonb_to_recordset("cache"."data") AS "question" (
    "id" INT,
    "created_at" TIMESTAMPTZ,
    "data" JSON
  )
  WHERE "question"."id" = "question_id";

  -- Check question existance
  IF VAR_question.created_at IS NULL THEN
    RAISE EXCEPTION 'Question not found (ID=%)', "question_id";
  END IF;

  -- Append new answer version
  RETURN QUERY
  INSERT INTO "public"."answers" VALUES (
    VAR_question.board_id,
    ("hasura_session" ->> 'x-hasura-user-id')::int,
    ("hasura_session" ->> 'x-hasura-survey-id')::int,
    question_id,
    VAR_question.created_at,
    "score",
    "data",
    "notes"
  ) RETURNING
    ("hasura_session" ->> 'x-hasura-user-id')::int AS "user_id",
    VAR_question.board_id,
    ("hasura_session" ->> 'x-hasura-survey-id')::int AS "survey_id",
    question_id AS "question_id",
    VAR_question.created_at AS "question_created_at",
    VAR_question.data::json AS "question_data",
    created_at AS "answer_created_at",
    "score" AS "answer_score",
    "data" AS "answer_data",
    "notes" AS "answer_notes"
  ;
END;
$$ VOLATILE LANGUAGE plpgsql;