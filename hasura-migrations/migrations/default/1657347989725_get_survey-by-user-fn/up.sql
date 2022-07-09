CREATE TABLE "public"."survey_by_user" (
  "user_id" INT NOT NULL, 
  "board_id" INT NOT NULL, 
  "survey_id" INT NOT NULL,
  "question_id" INT NOT NULL,
  "question_created_at" TIMESTAMPTZ NOT NULL,
  "question_data" JSON NOT NULL,
  "answer_id" BIGINT NOT NULL,
  "answer_created_at" TIMESTAMPTZ NOT NULL,
  "answer_score" SMALLINT NOT NULL,
  "answer_data" JSON NOT NULL,
  "answer_notes" TEXT NOT NULL
);

COMMENT ON TABLE "public"."survey_by_user" IS 
'Output data-type for function: "get_survey_by_user(surveyId, userId)"';



CREATE OR REPLACE FUNCTION "public"."get_survey_by_user"(
  hasura_session JSON
)
RETURNS SETOF "public"."survey_by_user" AS $$
# variable_conflict use_variable
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON ("q"."id")
    (hasura_session ->> 'x-hasura-user-id')::int AS "user_id",
    "q"."board_id",
    "q"."survey_id",
    "q"."id" AS "question_id",
    "q"."created_at" AS "question_created_at",
    "q"."data" AS "question_data",
    "a"."id" AS "answer_id",
    "a"."created_at" AS "answer_created_at",
    "a"."score" AS "answer_score",
    "a"."data" AS "answer_data",
    "a"."notes" AS "answer_notes"
  FROM (
    SELECT 
      "board_id", 
      "survey_id", 
      "question".*
    FROM
      (
        SELECT
          "id" AS "survey_id", 
          "board_id", 
          ("cache" ->> 'questions')::jsonb AS "cache"
        FROM "public"."surveys" AS "s"
        -- Check for a valid invite
        JOIN "public"."surveys_invites" AS "i" 
          ON "s"."id" = "i"."survey_id" 
         AND "i"."user_id" = (hasura_session ->> 'x-hasura-user-id')::int
        WHERE "id" = (hasura_session ->> 'x-hasura-survey-id')::int
      ) "srv",
      jsonb_to_recordset("srv"."cache") AS "question" (
        "id" INT,
        "created_at" TIMESTAMPTZ,
        "data" JSON
      )
  ) "q"
  LEFT JOIN "public"."answers" AS "a" 
    ON "a"."user_id" = (hasura_session ->> 'x-hasura-user-id')::int
    AND "a"."question_id" = "q"."id"

  ORDER BY "q"."id", "a"."id" DESC
  ;
END;
$$ IMMUTABLE LANGUAGE plpgsql;


