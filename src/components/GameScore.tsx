"use client";

import { getScore } from "@/lib/newgame";
import { useState, useEffect } from "react";
import { useGameState } from "./GameContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiOutlineInformationCircle } from "react-icons/hi2";

export default function GameScore() {
  const [games, setGames] = useState(0);
  const [average, setAverage] = useState("0");
  const gameState = useGameState().uploaded;

  useEffect(() => {
    async function getScores() {
      const scores = await getScore();
      setGames(scores.games);
      setAverage(scores.average || "0");
    }
    getScores();
  }, [gameState]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2">
          <HiOutlineInformationCircle />
          Stats
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4 text-sm italic">
          <div>Games Played: {games}</div>
          <div>Average Moves: {parseInt(average)}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
