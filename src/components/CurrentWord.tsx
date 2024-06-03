"use client";

import { useGameState, useGameStateDispatch } from "./GameContext";
import { useEffect, useState } from "react";
import { IsWord } from "@/lib/newgame";
import { GameActionType } from "@/lib/GameTypes";
import { Badge } from "./ui/badge";


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
    <div className="grid grid-cols-3 items-center w-full">
      <div><Badge variant={"outline"}>Your moves: {gameState.moves}</Badge></div>
    <div className="text-semi-bold border border-solid border-border px-4 py-2 uppercase text-center">
      {currentWord ? <Badge className="p-2">{currentWord}</Badge> : null}
    </div>
    <div className="text-right"><Badge variant={"outline"}>?</Badge></div>
    </div>
  );
}
