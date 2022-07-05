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
--- This is a "append only" table, new versions of the same record are
--- appended at the very bottom of the table with a new "created_at" timestamp.
---
--- Fillfactor is 100 because there is never fragmentation due to UPDATE or DELETE statements:
--- https://medium.com/nerd-for-tech/postgres-fillfactor-baf3117aca0a
---
---
--- Drawback:
--- If we perfome a huge amount of editing on the questions, this solution
--- might not be performing very well at scale.
--- Need some heavy testing.

CREATE TABLE "public"."questions" (
  "id" SERIAL NOT NULL, 
  "board_id" INT NOT NULL,
  "type" TEXT NOT NULL,
  "data" JSON NOT NULL,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT "questions_pkey" PRIMARY KEY ("id", "created_at"),
  CONSTRAINT "questions_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id")
) WITH (fillfactor = 100);







---
--- SURVEYS
---

CREATE TABLE "public"."surveys" (
  "id" SERIAL NOT NULL, 
  "board_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "opens_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "closes_at" TIMESTAMPTZ NOT NULL DEFAULT now() + '1w'::interval,
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
--- SURVEYS QUESTIONS
--- immutable snapshot of the question at the time of a survey
---

-- CREATE TABLE "public"."surveys_questions" (
--   "id" SERIAL NOT NULL, 
--   "board_id" INT NOT NULL,
--   "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
--   "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
--   "opens_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
--   "closes_at" TIMESTAMPTZ NOT NULL DEFAULT now() + '1w'::interval,
--   CONSTRAINT "surveys_pkey" PRIMARY KEY ("id"),
--   CONSTRAINT "surveys_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id")
-- );






---
--- ANSWERS
---

CREATE TABLE "public"."answers" (
  "id" BIGSERIAL NOT NULL, 
  "board_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "question_id" INT NOT NULL,
  "score" SMALLINT NOT NULL,
  "data" JSON NOT NULL DEFAULT '{}',
  "notes" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "answers_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "answers_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id"),
  CONSTRAINT "answers_user_id_fkey" FOREIGN KEY("user_id") REFERENCES "boards"("id")
);

CREATE TRIGGER "set_public_answers_updated_at"
BEFORE UPDATE ON "public"."answers"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_answers_updated_at" ON "public"."answers" 
IS 'Trigger to set value of column "updated_at" to current timestamp on row update';
