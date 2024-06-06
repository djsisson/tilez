"use client";

import { SignInButton, SignedOut } from "@clerk/nextjs";
import { useGameState, useGameStateDispatch } from "./GameContext";
import { useEffect, useState, useRef } from "react";
import { isWord, getAllWords, uploadScore } from "@/lib/GameLogic";
import { GameActionType } from "@/lib/GameTypes";
import { Badge } from "./ui/badge";
import Help from "./Help";
import { useUser } from "@clerk/clerk-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NewGameButton from "./NewGameButton";
import { Button } from "./ui/button";

export default function CurrentWord() {
  const dispatch = useGameStateDispatch();
  const gameState = useGameState();
  const [currentWord, setCurrentWord] = useState([] as string[]);
  const [currentDefinition, setCurrentDefinition] = useState("");
  const [completed, setCompleted] = useState(false);
  const [allWords, setAllwords] = useState([] as string[]);
  const [hoverOpen, setHoverOpen] = useState(false);
  const ref = useRef<NodeJS.Timeout>();
  const refDefinitions = useRef(new Map() as Map<string, string>);
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
    setCurrentDefinition("");
    if (
      !gameState.rows.reduce((a, b) => a && b.tiles[b.position + 1].found, true)
    ) {
      const checkWord = async () => {
        if (await isWord(currentWord.join(""))) {
          dispatch({
            type: GameActionType.FOUND,
          });
        }
      };
      checkWord();
    } else {
      const checkWord = async () => {
        if (await isWord(currentWord.join(""))) {
          if (refDefinitions.current.has(currentWord.join(""))) {
            setCurrentDefinition(
              refDefinitions.current.get(currentWord.join("")) || "",
            );
          } else {
            const newDefinition = await getDefinition();
            setCurrentDefinition(newDefinition);
            refDefinitions.current.set(currentWord.join(""), newDefinition);
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
      <div className="rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
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
                  title={refDefinitions.current.get(x) || "No Definition Found"}
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
        <div
          onClick={() => setHoverOpen(!hoverOpen)}
          onMouseEnter={() => {
            clearTimeout(ref.current);
            setTimeout(() => setHoverOpen(true), 200);
          }}
          onMouseLeave={() => {
            clearTimeout(ref.current);
            ref.current = setTimeout(() => setHoverOpen(false), 200);
          }}
        >
          <Popover open={hoverOpen}>
            <PopoverTrigger>
              <Badge
                variant={`${currentDefinition ? "default" : "secondary"}`}
                aria-disabled={true}
                className={`cursor-pointer text-center text-base uppercase md:text-xl lg:text-2xl ${currentDefinition ? "" : "border border-solid border-muted-foreground"}`}
              >
                {currentWord}
              </Badge>
            </PopoverTrigger>
            {currentDefinition && (
              <PopoverContent
                onMouseEnter={() => {
                  clearTimeout(ref.current);
                  setTimeout(() => setHoverOpen(true), 200);
                }}
                onMouseLeave={() => {
                  clearTimeout(ref.current);
                  setTimeout(() => setHoverOpen(false), 200);
                }}
                className="rounded-lg border border-solid border-border normal-case"
              >
                {currentDefinition}
              </PopoverContent>
            )}
          </Popover>
        </div>
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
