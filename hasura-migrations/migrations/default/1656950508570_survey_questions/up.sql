
CREATE VIEW "public"."surveys_questions" AS
SELECT DISTINCT ON ("s"."id", "q"."id")
  "q"."id" AS "id",
  "s"."id" AS "survey_id",
  "s"."board_id",
  "q"."etag",
  "q"."type",
  "q"."data"
FROM "public"."questions" AS "q"
JOIN "public"."surveys" AS "s" 
  ON "q"."board_id" = "s"."board_id"
WHERE "q"."etag" <= "s"."created_at"
ORDER BY "s"."id" DESC, "q"."id", "q"."etag" DESC;

-- SELECT DISTINCT ON ("q"."id") 
--   "s"."board_id" AS "board_id", 
--   "s"."id" AS "survey_id",
--   "q"."id" AS "question_id",
--   "q"."etag",
--   "q"."type",
--   "q"."data"
-- FROM "public"."surveys" AS "s"
-- JOIN "questions" AS "q" ON "s"."board_id" = "q"."board_id"
-- WHERE "q"."is_deleted" = false
-- ORDER BY "q"."id", "q"."etag" DESC;