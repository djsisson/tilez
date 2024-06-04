"use client";

import { useGameStateDispatch } from "./GameContext";
import { Button } from "./ui/button";
import { GameActionType } from "@/lib/GameTypes";
import { NewGame } from "@/lib/newgame";

export default function NewGameButton() {
  const dispatch = useGameStateDispatch();
  return (
    <Button
      title="New Game"
      onClick={async () =>
        dispatch({ type: GameActionType.RESET, payload: await NewGame() })
      }
    >
      New Game
    </Button>
  );
}
