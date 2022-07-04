CREATE TABLE IF NOT EXISTS "public"."Survey" (
 "survey_id" SERIAL,
 "board_id" INT NOT NULL,
 "open_since"  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
 "open_until" TIMESTAMPTZ NOT NULL,
 CONSTRAINT "surveys_pkey" PRIMARY KEY ("survey_id")
);