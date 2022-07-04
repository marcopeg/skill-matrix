CREATE TABLE IF NOT EXISTS "public"."Boards" (
 "board_id" SERIAL,
 "name" TEXT NOT NULL,
 CONSTRAINT "boards_pkey" PRIMARY KEY ("board_id")
);