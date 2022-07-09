
CREATE VIEW "public"."surveys_questions" AS
SELECT
  "id",
  "survey_id",
  "board_id",
  "created_at",
  "data"
FROM (
  -- Join each question version with the related survey
  SELECT DISTINCT ON ("s"."id", "q"."id")
    "q"."id" AS "id",
    "s"."id" AS "survey_id",
    "s"."board_id",
    "q"."created_at",
    "q"."data",
    "q"."is_deleted"
  FROM "public"."questions" AS "q"
  JOIN "public"."surveys" AS "s" 
    ON "q"."board_id" = "s"."board_id"
  WHERE "s"."created_at" >= "q"."created_at"
  ORDER BY "s"."id" DESC, "q"."id", "q"."created_at" DESC
) ds
WHERE "is_deleted" IS FALSE
;

COMMENT ON VIEW "public"."surveys_questions" IS 
'Lists the proper question version for a specific survey based on "survey.created_at" date';