DROP TRIGGER "i18n_update_cache_trg" ON "public"."i18n_publish";
DROP FUNCTION "public"."i18n_update_cache_fn"();
DROP TABLE "public"."i18n_publish" CASCADE;
DROP MATERIALIZED VIEW IF EXISTS "public"."i18n_translations_documents";