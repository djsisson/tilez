"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useGameState, useGameStateDispatch } from "./GameContext";
import { useEffect, useState } from "react";
import { IsWord, getAllWords, uploadScore } from "@/lib/newgame";
import { GameActionType } from "@/lib/GameTypes";
import { Badge } from "./ui/badge";
import Help from "./Help";
import { useUser } from "@clerk/clerk-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import NewGameButton from "./NewGameButton";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function CurrentWord() {
  const dispatch = useGameStateDispatch();
  const gameState = useGameState();
  const [currentWord, setCurrentWord] = useState([] as string[]);
  const [definition, setDefinition] = useState("");
  const [completed, setCompleted] = useState(false);
  const [allWords, setAllwords] = useState([] as string[]);
  const [definitions, setDefinitions] = useState(
    new Map() as Map<string, string>,
  );
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    setCurrentWord(gameState.rows.map((x) => x.tiles[x.position + 1].letter));
    setCompleted(gameState.completed || false);
  }, [gameState]);

  useEffect(() => {
    if (completed && allWords.length == 0) {
      async function getWords() {
        const words = await getAllWords(
          gameState.rows.map((x) => x.tiles.map((y) => y.letter).join("")),
        );
        setAllwords(words.filter((x) => !gameState.found.includes(x)));
      }
      getWords();
    }
    if (!completed && allWords.length > 0) {
      setAllwords([]);
    }
  }, [completed]);

  useEffect(() => {
    if (!gameState.uploaded && isSignedIn && isLoaded && completed) {
      async function upload() {
        const uploaded = await uploadScore(gameState);
        if (uploaded) dispatch({ type: GameActionType.UPLOADED });
      }
      upload();
    }
  }, [isSignedIn, isLoaded, completed]);

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
          if (definitions.has(currentWord.join(""))) {
            setDefinition(definitions.get(currentWord.join("")) || "");
          } else {
            const newDefinition = await getDefinition();
            setDefinition(newDefinition);
            setDefinitions((old) =>
              new Map(old).set(currentWord.join(""), newDefinition),
            );
          }
        }
      };
      checkWord();
    }
  }, [currentWord]);

  async function getDefinition() {
    if (currentWord.length == 0) return;
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord.join("")}`,
      { cache: "force-cache" },
    );

    if (!result.ok) {
      return "No definition found";
    }
    const data = await result.json();
    const definition = data[0].meanings[0].definitions[0].definition;
    return definition;
  }

  return completed ? (
    <div className="modal absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col gap-4 rounded-lg bg-secondary p-4">
        <div className="text-center">Congratulations, you won!</div>
        <div className="text-center">You made {gameState.moves} moves.</div>
        <div className="flex gap-2">
          <div className="flex flex-col border-secondary-foreground p-2">
            <div>Found words:</div>
            {gameState.found.map((x) => (
              <div
                key={x}
                className="cursor-pointer italic"
                title={definitions.get(x) || ""}
              >
                {x}
              </div>
            ))}
          </div>
          <div className="flex flex-col border-secondary-foreground p-2">
            <div>Other Words:</div>
            {allWords.map((x) => (
              <div key={x} className="italic">
                {x}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-around gap-4 text-center">
          <NewGameButton></NewGameButton>
          <SignedOut>
            <Button asChild>
              <SignInButton
                fallbackRedirectUrl="/"
                signUpFallbackRedirectUrl="/"
              />
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  ) : (
    <div className="grid w-full grid-cols-3 place-content-center">
      <div className="flex items-center">
        {gameState.moves == 0 ? (
          ""
        ) : (
          <Badge
            title="Moves"
            className="border border-solid border-muted-foreground text-base"
            variant={"outline"}
          >
            {gameState.moves}
          </Badge>
        )}
      </div>
      <div title="Current Word" className="flex items-center justify-center">
        {definition != "" ? (
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="cursor-pointer border border-solid border-muted-foreground text-center text-base uppercase md:text-xl lg:text-2xl">
                {currentWord}
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="rounded-lg border border-solid border-border normal-case">
              {definition}
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Badge
            variant={"secondary"}
            className="border border-solid border-muted-foreground text-center text-base uppercase md:text-xl lg:text-2xl"
          >
            {currentWord}
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-end" title="Help">
        <Badge
          variant={"outline"}
          className="border border-solid border-muted-foreground text-base"
        >
          <Help></Help>
        </Badge>
      </div>
    </div>
  );
}
