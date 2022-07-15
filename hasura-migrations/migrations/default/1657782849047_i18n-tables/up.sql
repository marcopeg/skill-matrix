---
--- TRANSLATIONS DATA STRUCTURE
---
--- Inspired by:
--- https://stackoverflow.com/a/54738152/1308023
---


CREATE FUNCTION "public"."i18n_jsonb_set_rec"(jsonb, jsonb, text[])
RETURNS jsonb
AS $$
  SELECT CASE
    WHEN array_length($3, 1) > 1 and ($1 #> $3[:array_upper($3, 1) - 1]) is null
    THEN "public"."i18n_jsonb_set_rec"($1, jsonb_build_object($3[array_upper($3, 1)], $2), $3[:array_upper($3, 1) - 1])
    ELSE jsonb_set($1, $3, $2, true)
  end
$$ IMMUTABLE LANGUAGE SQL;

CREATE AGGREGATE "public"."i18n_jsonb_set_agg"(jsonb, text[]) (
  sfunc    = i18n_jsonb_set_rec,
  stype    = jsonb,
  initcond = '{}'
);



CREATE TABLE "public"."i18n_languages" (
  "id"            VARCHAR(2) PRIMARY KEY,
  "name"          TEXT NOT NULL,
  "label"         TEXT,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT 'now()',
  "updated_at"    TIMESTAMPTZ NOT NULL DEFAULT 'now()'
);

CREATE TRIGGER "set_i18n_languages_updated_at"
BEFORE UPDATE ON "public"."i18n_languages"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();


CREATE TABLE "public"."i18n_keys" (
  "id"            SERIAL PRIMARY KEY,
  "key"           TEXT NOT NULL UNIQUE,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT 'now()',
  "updated_at"    TIMESTAMPTZ NOT NULL DEFAULT 'now()'
);

CREATE TABLE "public"."i18n_values" (
  "language_id"   VARCHAR(2),
  "key_id"        INT,
  "value"         TEXT,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT 'now()',
  CONSTRAINT "i18n_values_unique_translation" UNIQUE ("language_id", "key_id", "created_at"),
  CONSTRAINT "i18n_language_id_fkey" FOREIGN KEY("language_id") REFERENCES "i18n_languages"("id"),
  CONSTRAINT "i18n_key_id_fkey" FOREIGN KEY("key_id") REFERENCES "i18n_keys"("id")
) WITH (fillfactor = 100);




CREATE VIEW "public"."i18n_translations_values" AS
SELECT 
DISTINCT ON ("v"."language_id", "v"."key_id") 
   "v"."language_id" AS "language_id",
   "k"."key",
   "v"."value",
   "v"."created_at"
FROM "public"."i18n_values"  AS "v"
LEFT JOIN "public"."i18n_keys" AS "k" ON "v"."key_id" = "k"."id"
ORDER BY "v"."language_id", "v"."key_id", "v"."created_at" DESC;


CREATE VIEW "public"."i18n_translations_keys" AS
SELECT
	"public"."i18n_jsonb_set_agg"(to_jsonb(value), string_to_array(key, '.')) AS "data"
FROM (
	SELECT 
		'*' AS "language_id", 
		"key", 
		'' AS "value" 
	FROM "public"."i18n_keys"
      ) "q"
GROUP BY "language_id";