BEGIN;
SELECT plan(1);

SELECT has_extension('public', 'pgcrypto', 'It should have exension "pgcrypto"');

SELECT * FROM finish();
ROLLBACK;