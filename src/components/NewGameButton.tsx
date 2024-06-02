"use client";

import { useGameStateDispatch } from "./GameContext";
import { Button } from "./ui/button";
import { GameActionType } from "@/lib/GameTypes";

export default function NewGameButton() {
  const dispatch = useGameStateDispatch();
  return (
    <Button onClick={() => dispatch({ type: GameActionType.RESET })}>
      New Game
    </Button>
  );
}
