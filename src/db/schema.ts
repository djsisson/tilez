import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  unique,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const tilez_users = pgTable(
  "tilez_users",
  {
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    clerk_id: text("clerk_id").notNull(),
    username: text("username").notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    email: text("email").notNull(),
    imglink: text("imglink"),
  },
  (table) => {
    return {
      tilez_users_clerk_id_key: unique("tilez_users_clerk_id_key").on(
        table.clerk_id
      ),
      tilez_users_username_key: unique("tilez_users_username_key").on(
        table.username
      ),
      tilez_users_email_key: unique("tilez_users_email_key").on(table.email),
    };
  }
);

export const tilez_games = pgTable(
  "tilez_games",
  {
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    game_id: text("game_id").notNull(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => tilez_users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    game_start: timestamp("game_start").defaultNow(),
    game_end: timestamp("game_end"),
    num_moves: integer("num_moves").default(0),
    completed: boolean("completed").default(false),
  },
  (table) => {
    return {
      tilez_games_clerk_game_id: unique("tilez_games_clerk_game_id").on(
        table.game_id
      ),
    };
  }
);
