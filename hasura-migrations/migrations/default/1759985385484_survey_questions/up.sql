CREATE TABLE IF NOT EXISTS "public"."Survey_Questions" (
 "survey_id" INT NOT NULL,
 "question_id" INT NOT NULL,
 "type" type,
 "data" JSON,
 "etag" TEXT
);

ALTER TABLE ONLY "public"."Survey_Questions" 
ADD CONSTRAINT "questions_pkey" 
FOREIGN KEY (question_id) REFERENCES "Questions"(question_id) 
ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."Survey_Questions" 
ADD CONSTRAINT "surveys_pkey" 
FOREIGN KEY (survey_id) REFERENCES "Survey"(survey_id) 
ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;