"use client";

import { useGameState, useGameStateDispatch } from "./GameContext";
import { useEffect, useState } from "react";
import { IsWord } from "@/lib/newgame";
import { GameActionType } from "@/lib/GameTypes";
import { Badge } from "./ui/badge";
import Help from "./Help";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
          const allFound = gameState.rows.reduce(
            (a, b) => a && b.tiles[b.position + 1].found,
            true,
          );
          if (allFound) {
            dispatch({ type: GameActionType.COMPLETED });
          }
        }
      };
      checkWord();
    }
  }, [currentWord]);

  async function getDefinition() {
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord.join("")}`,
    );

    if (!result.ok) {
      const errorMessage = result.status;
      throw errorMessage;
    }
    console.log(result);
    const data = await result.json();
    console.log(data);
    const definition = await data[0].meanings[0].definitions[0].definition;

    return definition[0].meanings ? definition : null;
  }

  return (
    <div className="grid w-full grid-cols-3 items-center">
      <div>
        <Badge variant={"outline"}>Your moves: {gameState.moves}</Badge>
      </div>
      <div className="text-semi-bold border border-solid border-border px-4 py-2 text-center uppercase">
        {currentWord ? (
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="p-2">{currentWord}</Badge>
            </HoverCardTrigger>
            <HoverCardContent>{/* {getDefinition()} */}</HoverCardContent>
          </HoverCard>
        ) : null}
      </div>
      <div className="text-right">
        <Badge variant={"outline"}>
          <Help></Help>
        </Badge>
      </div>
    </div>
  );
}
