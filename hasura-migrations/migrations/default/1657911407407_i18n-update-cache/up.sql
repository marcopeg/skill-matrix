CREATE MATERIALIZED VIEW "public"."i18n_translations_documents" AS
SELECT
  "language_id", 
  "public"."i18n_jsonb_set_agg"(to_jsonb(value), string_to_array(key, '.')) AS "value"
FROM     "public"."i18n_translations_values"
GROUP BY "language_id";




CREATE TABLE "public"."i18n_publish" (
  "created_at" TIMESTAMPTZ PRIMARY KEY DEFAULT 'now()',
  "publishes_at" TIMESTAMPTZ DEFAULT 'now()'
);

---
--- Dropping and recreating the materialized view was inspired by:
--- https://stackoverflow.com/a/43885714/1308023
---
CREATE OR REPLACE FUNCTION "public"."i18n_update_cache_fn"()
RETURNS TRIGGER AS $$
BEGIN
  DROP MATERIALIZED VIEW IF EXISTS "public"."i18n_translations_documents";
  EXECUTE FORMAT('
    CREATE MATERIALIZED VIEW "public"."i18n_translations_documents" AS 
    SELECT * FROM (
      SELECT
        "language_id", 
        "public"."i18n_jsonb_set_agg"(to_jsonb(value), string_to_array(key, ''.'')) AS "value"
      FROM (
        SELECT 
        DISTINCT ON ("v"."language_id", "v"."key_id") 
          "v"."language_id" AS "language_id",
          "k"."key",
          "v"."value",
          "v"."updated_at"
        FROM "public"."i18n_values"  AS "v"
        LEFT JOIN "public"."i18n_keys" AS "k" ON "v"."key_id" = "k"."id"
        WHERE "v"."created_at" <= %L
        ORDER BY "v"."language_id", "v"."key_id", "v"."created_at" DESC
      ) "q"
      GROUP BY "language_id"
    ) "wrapper"
  JOIN (
    SELECT
      "publishes_at" AS "created_at" 
    FROM "public"."i18n_publish"
    ORDER BY "publishes_at" DESC
    LIMIT 1
  ) "etag" ON 1 = 1
  ', NEW."publishes_at");
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "i18n_update_cache_trg"
AFTER INSERT ON "public"."i18n_publish"
FOR EACH ROW
EXECUTE PROCEDURE "public"."i18n_update_cache_fn"();
COMMENT ON TRIGGER "i18n_update_cache_trg" ON "public"."i18n_publish" 
IS 'Update translations documents';

