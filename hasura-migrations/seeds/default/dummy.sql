TRUNCATE "public"."questions" CASCADE;
TRUNCATE "public"."surveys" CASCADE;
TRUNCATE "public"."boards" CASCADE;

INSERT INTO "public"."boards" VALUES (1, 'b1');

INSERT INTO "public"."questions" ("board_id", "id", "type", "data") 
VALUES (1, 1, 'star', '{"v":1}');

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (1, 1);

INSERT INTO "public"."questions" ("board_id", "id", "type", "data") 
VALUES (1, 1, 'star', '{"v":2}');

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES (1, 1, 'star', '{"v":3}'), (1, 1, 'star', '{"v":4}');

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (2, 1);

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES (1, 2, 'star', '{"v":1}');

INSERT INTO "public"."surveys" ("id", "board_id")
VALUES (3, 1);


-- SELECT
--   "s"."board_id",
--   "s"."id" AS "survey_id",
--   "q"."id" AS "question_id",
--   ("data"->>'v')::int AS "question_v"
-- FROM "public"."questions" AS "q"
-- JOIN "public"."surveys" AS "s" 
--   ON "q"."board_id" = "s"."board_id"
-- ;


SELECT DISTINCT ON ("s"."id", "q"."id")
  "s"."board_id",
  "s"."id" AS "survey_id",
  "q"."id" AS "question_id",
  ("data"->>'v')::int AS "question_v"
FROM "public"."questions" AS "q"
JOIN "public"."surveys" AS "s" 
  ON "q"."board_id" = "s"."board_id"
WHERE "q"."etag" <= "s"."created_at"
ORDER BY "s"."id", "q"."id", "q"."etag" DESC;