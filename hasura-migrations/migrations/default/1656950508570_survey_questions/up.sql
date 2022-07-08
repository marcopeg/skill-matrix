
CREATE VIEW "public"."surveys_questions" AS
SELECT
  "id",
  "survey_id",
  "board_id",
  "etag",
  "type",
  "data"
FROM (
  -- Join each question version with the related survey
  SELECT DISTINCT ON ("s"."id", "q"."id")
    "q"."id" AS "id",
    "s"."id" AS "survey_id",
    "s"."board_id",
    "q"."etag",
    "q"."type",
    "q"."data",
    "q"."is_deleted"
  FROM "public"."questions" AS "q"
  JOIN "public"."surveys" AS "s" 
    ON "q"."board_id" = "s"."board_id"
  WHERE "s"."created_at" >= "q"."etag"
  ORDER BY "s"."id" DESC, "q"."id", "q"."etag" DESC
) ds
WHERE "is_deleted" IS FALSE
;
