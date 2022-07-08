ALTER TABLE "public"."surveys" DROP "cache";
DROP TRIGGER "surveys_populate_cache_trg" ON "public"."surveys";
DROP FUNCTION "public"."survey_populate_cache_fn";