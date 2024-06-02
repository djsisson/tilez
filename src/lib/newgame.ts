"use server";
import { words_six } from "@/data/6letter";
import { GameState, GameRow, GameTile } from "./GameTypes";

function getRandomWord() {
  const i = Math.floor(Math.random() * words_six.length);
  return words_six[i];
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
  } while (totalLength < 17);
  return output;
}

export async function NewGame(): Promise<GameState> {
  const words = mixWords();
  const _gameState: GameState = {
    gameStart: new Date(),
    moves: 0,
    rows: words.map(
      (x) =>
        ({
          position: Math.floor(Math.random() * x.length) - 1,
          tiles: x.map((y) => ({ letter: y, found: false } as GameTile)),
        } as GameRow)
    ),
  };
  return _gameState;
}

export async function IsWord(word: string): Promise<Boolean> {
  return words_six.includes(word);
}
