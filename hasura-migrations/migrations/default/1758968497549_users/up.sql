CREATE TABLE IF NOT EXISTS "public"."Users" (
 "user_id" SERIAL,
 "name" TEXT NOT NULL,
 "settings" TEXT NOT NULL,
 CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);