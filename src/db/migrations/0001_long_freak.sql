ALTER TABLE "tilez_games" DROP CONSTRAINT "tilez_games_clerk_game_id";--> statement-breakpoint
ALTER TABLE "tilez_users" DROP CONSTRAINT "tilez_users_email_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tilez_games_clerk_game_id_idx" ON "tilez_games" USING btree (game_id);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tilez_users_clerk_id_idx" ON "tilez_users" USING btree (clerk_id);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tilez_users_username_idx" ON "tilez_users" USING btree (username);--> statement-breakpoint
ALTER TABLE "tilez_games" ADD CONSTRAINT "tilez_games_clerk_game_id_key" UNIQUE("game_id");--> statement-breakpoint
ALTER TABLE "tilez_words" ADD CONSTRAINT "tilez_words_word_key" UNIQUE("word");--> statement-breakpoint
ALTER TABLE "tilez_words" ADD CONSTRAINT "tilez_words_word_idx" UNIQUE("word");