ALTER TABLE "tilez_words" DROP CONSTRAINT "tilez_words_word_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tilez_words_word_idx" ON "tilez_words" USING btree (word);