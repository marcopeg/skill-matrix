CREATE TYPE type AS ENUM ('type-a', 'type-b', 'type-c', 'type-d');

CREATE TABLE IF NOT EXISTS "public"."Questions" (
 "question_id" SERIAL,
 "board_id" INT NOT NULL,
 "type" type,
 "data" JSON,
 "etag" TEXT,
 "is_deleted" BOOLEAN, 
 CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

ALTER TABLE ONLY "public"."Questions" 
ADD CONSTRAINT "boards_pkey" 
FOREIGN KEY (board_id) REFERENCES "Boards"(board_id) 
ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;