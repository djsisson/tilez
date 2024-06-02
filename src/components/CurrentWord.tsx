"use client";

import { useGameState } from "./GameContext";
import { useEffect, useState } from "react";

export default function CurrentWord() {
  const gameState = useGameState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function getCurrentWord() {
    return gameState.rows.map((x) => x.tiles[x.position + 1].letter);
  }

  return (
    <div className="px-4 py-2 border border-border border-solid uppercase text-semi-bold">
      {mounted ? getCurrentWord() : null}
    </div>
  );
}
