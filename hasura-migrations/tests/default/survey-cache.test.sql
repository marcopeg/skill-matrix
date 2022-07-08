BEGIN;
SELECT plan(1);

-- PREPARE "foo" AS
-- SELECT json_agg(q2) as questions FROM (
--   -- Filter only the active questions
--   SELECT "id", "type", "data" FROM (
--     -- Get latest questions for a board
--     SELECT DISTINCT ON ("id") "id", "type", "data", "is_deleted"
--     FROM "public"."questions" 
--     WHERE "board_id" = 1
--     ORDER BY "id", "etag" DESC
--   ) q1
--   WHERE "is_deleted" IS FALSE
-- ) q2;

INSERT INTO "public"."boards" VALUES (1, 'b1');
INSERT INTO "public"."questions" ("board_id", "id", "data", "created_at") 
VALUES 
  (1, 1, '{"v":1}', '2022-07-08 11:10')
, (1, 2, '{"v":1}', '2022-07-08 11:10')
, (1, 1, '{"v":2}', '2022-07-08 11:11')
;

INSERT INTO "public"."surveys" ("id", "board_id") VALUES (1, 1);

SELECT results_eq(
  $$SELECT ("cache"->>'questions')::text FROM "public"."surveys"$$,
  $$VALUES ( '[{"id":1,"created_at":"2022-07-08T11:11:00+00:00","data":{"v":2}}, 
 {"id":2,"created_at":"2022-07-08T11:10:00+00:00","data":{"v":1}}]' )$$,
  'It should return only questions associated with a survey'
);

SELECT * FROM finish();
ROLLBACK;