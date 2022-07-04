CREATE TABLE "public"."boards" (
  "id" SERIAL NOT NULL, 
  "name" TEXT NOT NULL, 
  PRIMARY KEY ("id") 
);

CREATE TABLE "public"."users" (
  "id" SERIAL NOT NULL, 
  "name" TEXT NOT NULL,
  PRIMARY KEY ("id") 
);

CREATE TABLE "public"."boards_admins" (
  "board_id" INT NOT NULL, 
  "user_id" INT NOT NULL,
  PRIMARY KEY ("board_id", "user_id") 
);