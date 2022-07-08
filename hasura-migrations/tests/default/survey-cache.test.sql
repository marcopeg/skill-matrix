BEGIN;
SELECT plan(1);

PREPARE "foo" AS
SELECT json_agg(q2) as questions FROM (
  -- Filter only the active questions
  SELECT "id", "type", "data" FROM (
    -- Get latest questions for a board
    SELECT DISTINCT ON ("id") "id", "type", "data", "is_deleted"
    FROM "public"."questions" 
    WHERE "board_id" = 1
    ORDER BY "id", "etag" DESC
  ) q1
  WHERE "is_deleted" IS FALSE
) q2;

INSERT INTO "public"."boards" VALUES (1, 'b1');
INSERT INTO "public"."questions" ("board_id", "id", "type", "data") 
VALUES 
  (1, 1, 'star', '{"v":1}')
, (1, 2, 'star', '{"v":1}')
, (1, 1, 'star', '{"v":2}')
;

INSERT INTO "public"."surveys" ("id", "board_id") VALUES (1, 1);

SELECT results_eq(
  $$SELECT ("cache"->>'questions')::text FROM "public"."surveys"$$,
  $$VALUES ( '[{"id":1,"type":"star","data":{"v":2}}, 
 {"id":2,"type":"star","data":{"v":1}}]' )$$,
  'It should return only questions associated with a survey'
);

SELECT * FROM finish();
ROLLBACK;