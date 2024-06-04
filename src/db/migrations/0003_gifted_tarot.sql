DROP TABLE "tilez_words";--> statement-breakpoint
ALTER TABLE "tilez_games" ALTER COLUMN "game_start" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tilez_games" ALTER COLUMN "game_end" SET DEFAULT now();