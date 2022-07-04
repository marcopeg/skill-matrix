CREATE TABLE IF NOT EXISTS "public"."Answers" (
 "answer_id" serial,
 "user_id" INT NOT NULL,
 "survey_id" INT NOT NULL,
 "question_id" INT NOT NULL,
 "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
 "updated_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
 "score" INT CHECK (score BETWEEN 0 AND 100),
 "notes" TEXT NOT NULL
 
 
);

ALTER TABLE ONLY "public"."Answers" 
ADD CONSTRAINT "users_pkey" 
FOREIGN KEY (user_id) REFERENCES "Users"(user_id) 
ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."Answers" 
ADD CONSTRAINT "surveys_pkey" 
FOREIGN KEY (survey_id) REFERENCES "Survey"(survey_id) 
ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."Answers" 
ADD CONSTRAINT "questions_pkey" 
FOREIGN KEY (question_id) REFERENCES "Questions"(question_id) 
ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
