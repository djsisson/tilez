import { relations } from "drizzle-orm/relations";
import { tilez_users, tilez_games } from "./schema";

export const tilez_gamesRelations = relations(tilez_games, ({one}) => ({
	tilez_user: one(tilez_users, {
		fields: [tilez_games.user_id],
		references: [tilez_users.id]
	}),
}));

export const tilez_usersRelations = relations(tilez_users, ({many}) => ({
	tilez_games: many(tilez_games),
}));