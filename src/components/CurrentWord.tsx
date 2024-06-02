"use client";

import { useGameState } from "./GameContext";
import { useEffect, useState } from "react";

export default function CurrentWord() {
  const gameState = useGameState();
  const [currentWord, setCurrentWord] = useState([] as string[]);

  useEffect(() => {
    setCurrentWord(gameState.rows.map((x) => x.tiles[x.position + 1].letter));
  }, [gameState]);

  return (
    <div className="px-4 py-2 border border-border border-solid uppercase text-semi-bold">
      {currentWord ? currentWord : null}
    </div>
  );
}
