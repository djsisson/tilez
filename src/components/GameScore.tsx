"use client";

import { getScore } from "@/lib/GameLogic";
import { useState, useEffect, useRef } from "react";
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

  const [hoverOpen, setHoverOpen] = useState(false);
  const ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    async function getScores() {
      if (!gameState && games) return;
      const scores = await getScore();
      setGames(scores.games);
      setAverage(scores.average || "0");
    }
    getScores();
  }, [gameState]);

  return (
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
          <div className="flex items-center gap-2 hover:cursor-pointer">
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
    </div>
  );
}
