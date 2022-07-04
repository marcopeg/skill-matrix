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
  PRIMARY KEY ("board_id", "user_id") 
);

-- Foreign Keys
ALTER TABLE ONLY "public"."boards_admins"
ADD CONSTRAINT "boards_admins_board_id_fkey" 
    FOREIGN KEY ("board_id") 
    REFERENCES "public"."boards"("id") 
    ON UPDATE CASCADE 
    ON DELETE CASCADE;

ALTER TABLE ONLY "public"."boards_admins"
ADD CONSTRAINT "boards_admins_user_id_fkey" 
    FOREIGN KEY ("user_id") 
    REFERENCES "public"."users"("id") 
    ON UPDATE CASCADE 
    ON DELETE CASCADE;




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
  PRIMARY KEY ("id") 
);

CREATE TRIGGER "set_public_questions_updated_at"
BEFORE UPDATE ON "public"."questions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_questions_updated_at" ON "public"."questions" 
IS 'Trigger to set value of column "updated_at" to current timestamp on row update';

-- Foreign Keys
ALTER TABLE ONLY "public"."questions"
ADD CONSTRAINT "questions_board_id_fkey" 
    FOREIGN KEY ("board_id") 
    REFERENCES "public"."boards"("id") 
    ON UPDATE CASCADE 
    ON DELETE CASCADE;

