BEGIN;
SELECT plan(1);

SELECT has_table('public', 'i18n_languages', 'It should have table "i18n_languages"');

-- INSERT INTO "public"."i18n_translations" VALUES
--   ('en', 'key', )

SELECT * FROM finish();
ROLLBACK;