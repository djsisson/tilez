"use server";
import { words_six } from "@/data/6letter";
import { words_easy } from "@/data/english6-all";
import { filter } from "@/data/_filtered";
import { GameState, GameRow, GameTile } from "./GameTypes";
import { db } from "@/db/db";
import { tilez_games, tilez_users } from "@/db/migrations/schema";
import { auth } from "@clerk/nextjs/server";
import { avg, count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function getRandomWord() {
  const i = Math.floor(Math.random() * words_easy.length);
  return words_easy[i];
}

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function mixWords() {
  let totalLength = 0;
  const output = [];
  do {
    totalLength = 0;
    const words = [
      Array.from(getRandomWord()),
      Array.from(getRandomWord()),
      Array.from(getRandomWord()),
    ];
    for (let i = 0; i < 6; i++) {
      const chars = new Set([words[0][i], words[1][i], words[2][i]]);
      output[i] = Array.from(chars);
      shuffleArray(output[i]);
      totalLength += output[i].length;
    }
  } while (totalLength < 17 || isFiltered(output.map((x) => x.join(""))));
  return output;
}

export async function NewGame(): Promise<GameState> {
  const words = mixWords();
  let rows = [] as GameRow[];
  do {
    rows = words.map(
      (x) =>
        ({
          position: Math.floor(Math.random() * x.length) - 1,
          tiles: x.map((y) => ({ letter: y, found: false }) as GameTile),
        }) as GameRow,
    );
  } while (
    words_six.includes(rows.map((x) => x.tiles[x.position + 1].letter).join(""))
  );
  const _gameState: GameState = {
    gameStart: new Date(),
    completed: false,
    found: [],
    moves: 0,
    rows: rows,
  };
  revalidatePath("/");
  return _gameState;
}

export async function IsWord(word: string): Promise<Boolean> {
  return words_six.includes(word);
}

function isFiltered(letters: string[]): boolean {
  const words = [] as string[];
  const re = new RegExp(letters.map((x) => `[${x}]`).join(""));
  filter.filter((x) => re.exec(x)).map((x) => words.push(x));
  return words.length > 0;
}

export async function getAllWords(letters: string[]): Promise<string[]> {
  const words = [] as string[];
  const re = new RegExp(letters.map((x) => `[${x}]`).join(""));
  words_six.filter((x) => re.exec(x)).map((x) => words.push(x));
  return words;
}
async function getUserIdFromClerkId() {
  const { userId } = auth();
  if (!userId) return false;
  const userIdFromClerk = await db
    .select()
    .from(tilez_users)
    .where(eq(tilez_users.clerk_id, userId));
  if (!userIdFromClerk.length) return false;
  return userIdFromClerk[0].id;
}

export async function uploadScore(game: GameState): Promise<boolean> {
  const userId = await getUserIdFromClerkId();
  if (!userId) return false;
  const newGame = await db
    .insert(tilez_games)
    .values({
      user_id: userId,
      game_id: game.rows
        .map((x) => x.tiles.map((y) => y.letter).join(""))
        .join("-"),
      game_start: new Date(game.gameStart).toUTCString(),
      num_moves: game.moves,
      completed: true,
    })
    .onConflictDoNothing()
    .returning();
  return newGame.length > 0;
}

export async function getScore() {
  const userId = await getUserIdFromClerkId();
  if (!userId) return { games: 0, average: "0" };
  const scores = await db
    .select({ games: count(), average: avg(tilez_games.num_moves) })
    .from(tilez_games)
    .where(eq(tilez_games.user_id, userId));
  return scores[0];
}
