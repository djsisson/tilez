import {
  pgTable,
  unique,
  varchar,
  integer,
  uniqueIndex,
  uuid,
  text,
  foreignKey,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const tilez_words = pgTable(
  "tilez_words",
  {
    word: varchar("word", { length: 6 }).notNull(),
    length: integer("length").default(6).notNull(),
  },
  (table) => {
    return {
      tilez_words_word_key: unique("tilez_words_word_key").on(table.word),
      tilez_words_word_idx: uniqueIndex("tilez_words_word_idx").using(
        "btree",
        table.word,
      ),
    };
  },
);

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
      clerk_id_idx: uniqueIndex("tilez_users_clerk_id_idx").using(
        "btree",
        table.clerk_id,
      ),
      username_idx: uniqueIndex("tilez_users_username_idx").using(
        "btree",
        table.username,
      ),
      tilez_users_clerk_id_key: unique("tilez_users_clerk_id_key").on(
        table.clerk_id,
      ),
      tilez_users_username_key: unique("tilez_users_username_key").on(
        table.username,
      ),
    };
  },
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
    game_start: timestamp("game_start", { mode: "string" }).defaultNow(),
    game_end: timestamp("game_end", { mode: "string" }),
    num_moves: integer("num_moves").default(0),
    completed: boolean("completed").default(false),
  },
  (table) => {
    return {
      clerk_game_id_idx: uniqueIndex("tilez_games_clerk_game_id_idx").using(
        "btree",
        table.game_id,
      ),
      tilez_games_clerk_game_id_key: unique("tilez_games_clerk_game_id_key").on(
        table.game_id,
      ),
    };
  },
);
