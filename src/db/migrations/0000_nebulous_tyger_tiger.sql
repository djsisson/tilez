CREATE TABLE IF NOT EXISTS "tilez_games" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"game_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"game_start" timestamp DEFAULT now(),
	"game_end" timestamp,
	"num_moves" integer DEFAULT 0,
	"completed" boolean DEFAULT false,
	CONSTRAINT "tilez_games_clerk_game_id" UNIQUE("game_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tilez_users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"clerk_id" text NOT NULL,
	"username" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"imglink" text,
	CONSTRAINT "tilez_users_clerk_id_key" UNIQUE("clerk_id"),
	CONSTRAINT "tilez_users_username_key" UNIQUE("username"),
	CONSTRAINT "tilez_users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tilez_words" (
	"word" varchar(6) NOT NULL,
	"length" integer DEFAULT 6 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tilez_games" ADD CONSTRAINT "tilez_games_user_id_tilez_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tilez_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
