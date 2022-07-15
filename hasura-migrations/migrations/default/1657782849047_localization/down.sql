DROP VIEW "public"."i18n_translations_documents";
DROP VIEW "public"."i18n_translations_values";
DROP AGGREGATE "public"."i18n_jsonb_set_agg"(jsonb, text[]);
DROP FUNCTION "public"."i18n_jsonb_set_rec";
DROP TABLE "public"."i18n_values" CASCADE;
DROP TABLE "public"."i18n_keys" CASCADE;
DROP TABLE "public"."i18n_languages" CASCADE;
