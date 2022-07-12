---
--- ADD THE QUESTIONS CACHE COLUMN
---

ALTER TABLE "public"."surveys"
ADD "cache" JSON NULL;
COMMENT ON TABLE "public"."surveys" IS 'Contains a cached version of the board''s questions at the point in time of the creation of the survey';




---
--- PERFORM THE QUESTIONS CACHE AS DATA AUTOMATION
---

CREATE OR REPLACE FUNCTION "public"."survey_populate_cache_fn"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."cache" = (
    -- Convert the dataset to a json document
    SELECT json_build_object('questions', json_agg(q2)) FROM (
      -- Filter only the active questions
      SELECT 
        "id", 
        "created_at",
        "data",
        "priority" 
      FROM (
        -- Get latest questions for a board
        SELECT DISTINCT ON ("id") 
          "id", 
          "created_at", 
          "data", 
          "priority",
          "is_deleted"
        FROM "public"."questions" 
        WHERE "board_id" = NEW.board_id
        ORDER BY "id", "created_at" DESC
      ) q1
      WHERE "is_deleted" IS FALSE
    ) q2
  );
  RETURN _new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "surveys_populate_cache_trg"
BEFORE INSERT OR UPDATE ON "public"."surveys"
FOR EACH ROW
EXECUTE PROCEDURE "public"."survey_populate_cache_fn"();
COMMENT ON TRIGGER "set_public_surveys_updated_at" ON "public"."surveys" 
IS 'Trigger to set value of column "updated_at" to current timestamp on row update';
