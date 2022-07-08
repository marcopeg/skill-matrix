TRUNCATE "public"."boards" CASCADE;
TRUNCATE "public"."users" CASCADE;
TRUNCATE "public"."boards_admins" CASCADE;


---
--- BOARD1
---

INSERT INTO "public"."boards" VALUES (1, 'board1');

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES 
  ( 1, 1, 'star', '{"__schema":"question:star@1", "title":"Question#1"}' )
, ( 1, 2, 'star', '{"__schema":"question:star@1", "title":"Question#2"}' )
, ( 1, 3, 'star', '{"__schema":"question:star@1", "title":"Question#3"}' )
;


---
--- BOARD2
---

INSERT INTO "public"."boards" VALUES (2, 'board2');

INSERT INTO "public"."questions" ("board_id", "id", "type", "data")
VALUES 
  ( 2, 4, 'star', '{"__schema":"question:star@1", "title":"Question#1"}' )
, ( 2, 5, 'star', '{"__schema":"question:star@1", "title":"Question#2"}' )
, ( 2, 6, 'star', '{"__schema":"question:star@1", "title":"Question#3"}' )
;


---
--- USERS
---

INSERT INTO "public"."users" VALUES 
  (1, 'User1')
, (2, 'User2')
;


---
--- ADMINS
---

INSERT INTO "public"."boards_admins" VALUES 
  (1, 1)
, (2, 1)
, (2, 2)
;


---
--- SURVEYS
---

INSERT INTO "public"."surveys" VALUES 
  (1, 1)
, (2, 2)
;



---
--- INVITES
---

INSERT INTO "public"."surveys_invites" VALUES 
  (1, 1)
, (1, 2)
, (2, 1)
, (2, 2)
;



---
--- RESET SERIES VALUES
---

SELECT setval('boards_id_seq', COALESCE((
  SELECT MAX(id) + 1 FROM "public"."boards"
), 1), false);

SELECT setval('questions_id_seq', COALESCE((
  SELECT MAX(id) + 1 FROM "public"."questions"
), 1), false);

SELECT setval('surveys_id_seq', COALESCE((
  SELECT MAX(id) + 1 FROM "public"."surveys"
), 1), false);

SELECT setval('users_id_seq', COALESCE((
  SELECT MAX(id) + 1 FROM "public"."users"
), 1), false);