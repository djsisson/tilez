"use client";

import { useGameState, useGameStateDispatch } from "./GameContext";
import { useEffect, useState } from "react";
import { IsWord } from "@/lib/newgame";
import { GameActionType } from "@/lib/GameTypes";

export default function CurrentWord() {
  const dispatch = useGameStateDispatch();
  const gameState = useGameState();
  const [currentWord, setCurrentWord] = useState([] as string[]);

  useEffect(() => {
    setCurrentWord(gameState.rows.map((x) => x.tiles[x.position + 1].letter));
  }, [gameState]);

  useEffect(() => {
    if (
      !gameState.rows.reduce((a, b) => a && b.tiles[b.position + 1].found, true)
    ) {
      const checkWord = async () => {
        if (await IsWord(currentWord.join(""))) {
          dispatch({
            type: GameActionType.FOUND,
          });
        }
      };
      checkWord();
    }
  }, [currentWord]);

  return (
    <div className="text-semi-bold border border-solid border-border px-4 py-2 uppercase">
      {currentWord ? currentWord : null}
    </div>
  );
}
