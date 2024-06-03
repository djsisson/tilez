"use client";

import { useGameState, useGameStateDispatch } from "./GameContext";
import { useEffect, useState } from "react";
import { IsWord, getAllWords } from "@/lib/newgame";
import { GameActionType } from "@/lib/GameTypes";
import { Badge } from "./ui/badge";
import Help from "./Help";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import NewGameButton from "./NewGameButton";

export default function CurrentWord() {
  const dispatch = useGameStateDispatch();
  const gameState = useGameState();
  const [currentWord, setCurrentWord] = useState([] as string[]);
  const [definition, setDefinition] = useState("");
  const [completed, setCompleted] = useState(false);
  const [allWords, setAllwords] = useState([] as string[]);

  useEffect(() => {
    setCurrentWord(gameState.rows.map((x) => x.tiles[x.position + 1].letter));
    setCompleted(gameState.completed || false);
  }, [gameState]);

  useEffect(() => {
    if (completed) {
      async function getWords() {
        const words = await getAllWords(
          gameState.rows.map((x) => x.tiles.map((y) => y.letter).join("")),
        );
        setAllwords(words.filter((x) => !gameState.found.includes(x)));
      }
      getWords();
    }
  }, [completed]);

  useEffect(() => {
    setDefinition("");
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
    } else {
      const checkWord = async () => {
        if (await IsWord(currentWord.join(""))) {
          getDefinition();
        }
      };
      checkWord();
    }
  }, [currentWord]);

  async function getDefinition() {
    if (currentWord.length == 0) return;
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord.join("")}`,
    );

    if (!result.ok) {
      setDefinition("No definition found");
      return;
    }
    const data = await result.json();
    const definition = data[0].meanings[0].definitions[0].definition;
    setDefinition(definition);
    return;
  }

  return completed ? (
    <div className="modal absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col gap-4 rounded-lg border border-solid border-border bg-secondary p-4">
        <div>Congratulations, you won!</div>
        <div>you took {gameState.moves} moves</div>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <div>Found Words</div>
            {gameState.found.map((x) => (
              <div key={x}>{x}</div>
            ))}
          </div>
          <div className="flex flex-col">
            <div>Words Not Found</div>
            {allWords.map((x) => (
              <div key={x}>{x}</div>
            ))}
          </div>
        </div>
        <div>
          <NewGameButton></NewGameButton>
        </div>
      </div>
    </div>
  ) : (
    <div className="grid w-full grid-cols-3 items-center">
      <div>
        <Badge className="text-base" variant={"outline"}>
          {gameState.moves}
        </Badge>
      </div>
      <div className="border border-solid border-border px-4 py-2 text-center uppercase">
        {definition != "" ? (
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="cursor-pointer p-2 text-base md:text-xl lg:text-2xl">
                {currentWord}
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="border-sold rounded-lg border border-border p-4 normal-case">
              {definition}
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Badge
            variant={"secondary"}
            className="p-2 text-base md:text-xl lg:text-2xl"
          >
            {currentWord}
          </Badge>
        )}
      </div>
      <div className="text-right">
        <Badge variant={"outline"} className="text-base">
          <Help></Help>
        </Badge>
      </div>
    </div>
  );
}
