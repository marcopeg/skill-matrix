
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
