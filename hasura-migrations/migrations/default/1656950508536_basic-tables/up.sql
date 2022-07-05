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

CREATE TABLE "public"."questions" (
  "id" SERIAL NOT NULL, 
  "board_id" INT NOT NULL,
  "type" TEXT NOT NULL,
  "data" JSON NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "questions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "questions_board_id_fkey" FOREIGN KEY("board_id") REFERENCES "boards"("id")
);

CREATE TRIGGER "set_public_questions_updated_at"
BEFORE UPDATE ON "public"."questions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_questions_updated_at" ON "public"."questions" 
IS 'Trigger to set value of column "updated_at" to current timestamp on row update';





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
