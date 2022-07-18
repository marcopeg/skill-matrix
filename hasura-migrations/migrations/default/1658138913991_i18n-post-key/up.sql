CREATE OR REPLACE FUNCTION "public"."i18n_upsert_key"(
  namespace TEXT,
  key TEXT
)
RETURNS SETOF "public"."i18n_keys" AS $$
# variable_conflict use_variable
BEGIN
  RETURN QUERY 
  INSERT INTO "public"."i18n_keys"
    ("namespace", "key") 
  VALUES
    (namespace, key)
  ON CONFLICT ON CONSTRAINT "i18n_keys_unique_key"
  DO UPDATE SET
    "updated_at" = now()
  RETURNING *;
END;
$$ LANGUAGE plpgsql;

