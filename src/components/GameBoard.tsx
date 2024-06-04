"use client";

import GameRow from "./GameRow";
import CurrentWord from "./CurrentWord";
import NewGameButton from "./NewGameButton";
import { useState, useEffect } from "react";

export default function GameBoard() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;
  return (
    <div className="flex max-w-prose select-none flex-col items-center gap-3 overflow-hidden rounded-lg border border-solid border-border bg-secondary px-4 py-2 text-lg md:text-2xl lg:text-4xl">
      <CurrentWord></CurrentWord>
      <div className="grid grid-cols-5 grid-rows-6 gap-3">
        <GameRow rowNumber={0}></GameRow>
        <GameRow rowNumber={1}></GameRow>
        <GameRow rowNumber={2}></GameRow>
        <GameRow rowNumber={3}></GameRow>
        <GameRow rowNumber={4}></GameRow>
        <GameRow rowNumber={5}></GameRow>
      </div>
      <div>
        <NewGameButton></NewGameButton>
      </div>
    </div>
  );
}
