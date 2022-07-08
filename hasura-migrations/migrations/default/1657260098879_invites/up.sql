CREATE TABLE "public"."surveys_invites" (
  "survey_id" INT NOT NULL, 
  "user_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT "surveys_invites_pkey" PRIMARY KEY ("survey_id", "user_id"),
  CONSTRAINT "surveys_invites_survey_id_fkey" FOREIGN KEY("survey_id") REFERENCES "surveys"("id"),
  CONSTRAINT "surveys_invites_user_id_fkey" FOREIGN KEY("user_id") REFERENCES "users"("id")
);

COMMENT ON TABLE "public"."surveys_invites" IS 'Tracks the invites for a user to fill up a survey';

COMMENT ON VIEW "public"."surveys_questions" IS 'Lists the proper question version for a specific survey based on "survey.created_at" date';