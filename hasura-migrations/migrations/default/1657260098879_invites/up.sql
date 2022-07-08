CREATE TABLE "public"."surveys_users" (
  "survey_id" INT NOT NULL, 
  "user_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT "surveys_users_pkey" PRIMARY KEY ("survey_id", "user_id"),
  CONSTRAINT "surveys_users_survey_id_fkey" FOREIGN KEY("survey_id") REFERENCES "surveys"("id"),
  CONSTRAINT "surveys_users_user_id_fkey" FOREIGN KEY("user_id") REFERENCES "users"("id")
);

COMMENT ON TABLE "public"."surveys_users" IS 'Tracks the invites for a user to fill up a survey';