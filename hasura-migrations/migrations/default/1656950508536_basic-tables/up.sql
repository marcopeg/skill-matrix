CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;



---
--- BOARDS
---

CREATE TABLE "public"."boards" (
  "id" SERIAL NOT NULL, 
  "name" TEXT NOT NULL, 
  PRIMARY KEY ("id") 
);




---
--- USERS
---

CREATE TABLE "public"."users" (
  "id" SERIAL NOT NULL, 
  "name" TEXT NOT NULL,
  PRIMARY KEY ("id") 
);




---
--- BOARD ADMINS
---

CREATE TABLE "public"."boards_admins" (
  "board_id" INT NOT NULL, 
  "user_id" INT NOT NULL,
  CONSTRAINT "board_admins_pkey" PRIMARY KEY ("board_id", "user_id"),
  CONSTRAINT "boards_admins_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id"),
  CONSTRAINT "boards_admins_user_id_fkey" FOREIGN KEY("user_id") REFERENCES "users"("id")
);




---
--- QUESTIONS
---
--- This is a "append only" table, new versions of the same record are
--- appended at the very bottom of the table with a new "etag" timestamp.
---
--- Fillfactor is 100 because there is never fragmentation due to UPDATE or DELETE statements:
--- https://medium.com/nerd-for-tech/postgres-fillfactor-baf3117aca0a
---
--- Drawback:
--- If we perfome a huge amount of editing on the questions, this solution
--- might not be performing very well at scale.
--- Need some heavy testing.

CREATE TABLE "public"."questions" (
  "id" SERIAL NOT NULL, 
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  "board_id" INT NOT NULL,
  "data" JSON NOT NULL,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "questions_pkey" PRIMARY KEY ("id", "created_at"),
  CONSTRAINT "questions_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id")
) WITH (fillfactor = 100);





---
--- SURVEYS
---
--- The "created_at" identifies the version of the question that
--- is referred in the survey.
---

CREATE TABLE "public"."surveys" (
  "id" SERIAL NOT NULL, 
  "board_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  "opens_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  "closes_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp() + '1w'::interval,
  CONSTRAINT "surveys_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "surveys_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id")
);

CREATE TRIGGER "set_public_surveys_updated_at"
BEFORE UPDATE ON "public"."surveys"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_surveys_updated_at" ON "public"."surveys" 
IS 'Trigger to set value of column "updated_at" to current timestamp on row update';




---
--- ANSWERS
---

CREATE TABLE "public"."answers" (
  "id" BIGSERIAL NOT NULL, 
  "board_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "survey_id" INT NOT NULL,
  "question_id" INT NOT NULL,
  "question_created_at" TIMESTAMPTZ NOT NULL,
  "score" SMALLINT NOT NULL,
  "data" JSON NOT NULL DEFAULT '{}',
  "notes" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT "answers_pkey" PRIMARY KEY ("id", "created_at"),
  CONSTRAINT "answers_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id"),
  CONSTRAINT "answers_user_id_fkey" FOREIGN KEY("user_id") REFERENCES "boards"("id"),
  CONSTRAINT "answers_survey_id_fkey" FOREIGN KEY("survey_id") REFERENCES "surveys"("id"),
  CONSTRAINT "answers_question_fkey" FOREIGN KEY("question_id", "question_created_at") REFERENCES "questions"("id", "created_at")
) WITH (fillfactor = 100);
