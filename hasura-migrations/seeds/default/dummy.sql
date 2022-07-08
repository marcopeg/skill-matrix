TRUNCATE "public"."boards" CASCADE;
TRUNCATE "public"."users" CASCADE;
TRUNCATE "public"."boards_admins" CASCADE;


---
--- BOARD1
---

INSERT INTO "public"."boards" VALUES (1, 'board1');

INSERT INTO "public"."questions" 
  ("board_id",  "id",   "data",                                                   "created_at") VALUES 
  (1,           1,      '{"__schema":"question:star@1", "title":"Question#1"}',   '2022-07-08 11:10')
, (1,           2,      '{"__schema":"question:star@1", "title":"Question#2"}',   '2022-07-08 11:10')
, (1,           3,      '{"__schema":"question:star@1", "title":"Question#3"}',   '2022-07-08 11:10')
;

---
--- BOARD2
---

INSERT INTO "public"."boards" VALUES (2, 'board2');

INSERT INTO "public"."questions" 
  ("board_id",  "id",   "data",                                                   "created_at") VALUES 
  (2,           4,      '{"__schema":"question:star@1", "title":"Question#1"}',   '2022-07-08 11:10')
, (2,           5,      '{"__schema":"question:star@1", "title":"Question#2"}',   '2022-07-08 11:10')
, (2,           6,      '{"__schema":"question:star@1", "title":"Question#3"}',   '2022-07-08 11:10')
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

INSERT INTO "public"."surveys" 
  ("id",  "board_id", "created_at") VALUES 
  (1,     1,          '2022-07-08 11:10')
, (2,     2,          '2022-07-08 11:10')
;



---
--- INVITES
---

INSERT INTO "public"."surveys_invites" 
  ("survey_id", "user_id",  "created_at" ) VALUES 
  (1,           1,          '2022-07-08 11:10')
, (1,           2,          '2022-07-08 11:10')
, (2,           1,          '2022-07-08 11:10')
, (2,           2,          '2022-07-08 11:10')
;





---
--- ANSWERS
---

INSERT INTO "public"."answers" 
  ("board_id",  "survey_id",  "user_id",  "question_id",  "question_etag",                  "score",  "data", "notes") VALUES
  (1,           1,            1,          1,              '2022-07-08 11:10',  10,       '{}',   'foo')
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