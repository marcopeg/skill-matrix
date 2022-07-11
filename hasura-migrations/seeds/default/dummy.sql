TRUNCATE "public"."boards" CASCADE;
TRUNCATE "public"."users" CASCADE;
TRUNCATE "public"."boards_admins" CASCADE;


---
--- BOARD1
---

INSERT INTO "public"."boards" VALUES (1, 'board1');

INSERT INTO "public"."questions" ("id", "board_id", "created_at", "data") VALUES 
  ( 1, 1, '2022-07-08 11:10', '
  {
    "__schema":"question:star@1", 
    "title": "Star rating question"
  }')
, ( 2, 1, '2022-07-08 11:10', '
  {
    "__schema":"question:star@1", 
    "title": "Star rating - with custom stars",
    "stars": 10
  }')
, ( 3, 1, '2022-07-08 11:10', '
  {
    "__schema":"question:bool@1", 
    "title":"Boolean question"
  }')
, ( 4, 1, '2022-07-08 11:10', '
  {
    "__schema":"question:scale@1", 
    "title":"Numeric Scale question"
  }')
, ( 5, 1, '2022-07-08 11:10', '
  {
    "__schema":"question:scale@1", 
    "title":"Numeric Scale question - with custom span & vertical direction",
    "span": 3,
    "direction": "column"
  }')
, ( 6, 1, '2022-07-08 11:10', '
  {
    "__schema":"question:multi@1", 
    "title":"Multiple choiche",
    "values": [
      { "value": 10,  "label": "Option n.1" }
    , { "value": 20,  "label": "Option n.2" }
    , { "value": 30,  "label": "Option n.3" }
    ]
  }')
, ( 7, 1, '2022-07-08 11:10', '
  {
    "__schema":"question:multi@1", 
    "title":"Multiple choiche - inline",
    "direction": "row",
    "display": "{label} ({value})",
    "values": [
      { "value": 10,  "label": "Option n.1" }
    , { "value": 20,  "label": "Option n.2" }
    , { "value": 30,  "label": "Option n.3" }
    ]
  }')
;
    

---
--- BOARD2
---

-- INSERT INTO "public"."boards" VALUES (2, 'board2');

-- INSERT INTO "public"."questions" 
--   ("board_id",  "id",   "data",                                                   "created_at") VALUES 
--   (2,           4,      '{"__schema":"question:star@1", "title":"Question#1"}',   '2022-07-08 11:10')
-- , (2,           5,      '{"__schema":"question:bool@1", "title":"Question#2"}',   '2022-07-08 11:10')
-- , (2,           6,      '{"__schema":"question:multi@1", "title":"Question#3"}',  '2022-07-08 11:10')
-- ;


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
-- , (2, 1)
-- , (2, 2)
;


---
--- SURVEYS
---

INSERT INTO "public"."surveys" 
  ("id",  "board_id", "created_at") VALUES 
  (1,     1,          '2022-07-08 11:10')
-- , (2,     2,          '2022-07-08 11:10')
;



---
--- INVITES
---

INSERT INTO "public"."surveys_invites" 
  ("survey_id", "user_id",  "created_at" ) VALUES 
  (1,           1,          '2022-07-08 11:10')
, (1,           2,          '2022-07-08 11:10')
-- , (2,           1,          '2022-07-08 11:10')
-- , (2,           2,          '2022-07-08 11:10')
;




---
--- ANSWERS
---

-- SELECT * FROM "public"."log_survey_by_user"('{"x-hasura-user-id": 1, "x-hasura-survey-id": 1}'::json, 1, 20);
-- SELECT * FROM "public"."log_survey_by_user"('{"x-hasura-user-id": 1, "x-hasura-survey-id": 1}'::json, 2, 20);
-- SELECT * FROM "public"."log_survey_by_user"('{"x-hasura-user-id": 1, "x-hasura-survey-id": 1}'::json, 3, 20);
-- SELECT * FROM "public"."log_survey_by_user"('{"x-hasura-user-id": 1, "x-hasura-survey-id": 1}'::json, 4, 20);
-- SELECT * FROM "public"."log_survey_by_user"('{"x-hasura-user-id": 1, "x-hasura-survey-id": 1}'::json, 5, 70);


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
