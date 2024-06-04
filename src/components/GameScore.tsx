"use client";

import { getScore } from "@/lib/newgame";
import { useState, useEffect } from "react";
import { useGameState } from "./GameContext";

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
    <div className="flex gap-4 text-sm italic">
      <div>Games: {games}</div>
      <div>Average Moves: {parseInt(average)}</div>
    </div>
  );
}
