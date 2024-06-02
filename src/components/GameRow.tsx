"use client";

import GameTile from "./GameTile";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import { useState, useEffect } from "react";
import { useGameState, useGameStateDispatch } from "./GameContext";
import * as GameTypes from "@/lib/GameTypes";

export default function GameRow({ rowNumber }: { rowNumber: number }) {
  const [position, setPosition] = useState(0);
  const [letters, setLetters] = useState([] as GameTypes.GameTile[]);
  const gameState = useGameState();
  const dispatch = useGameStateDispatch();

  useEffect(() => {
    setPosition(gameState.rows[rowNumber].position);
    setLetters(gameState.rows[rowNumber].tiles);
  }, [gameState]);

  const leftArrowClick = () => {
    dispatch({
      type: GameTypes.GameActionType.MOVEROW,
      payload: {
        rowNumber: rowNumber,
        position: position + 1,
      },
    });
  };

  const RightArrowClick = () => {
    dispatch({
      type: GameTypes.GameActionType.MOVEROW,
      payload: {
        rowNumber: rowNumber,
        position: position - 1,
      },
    });
  };

  return (
    <div
      className={`transition ease-in-out delay-150 duration-300  col-span-5 grid grid-cols-5 gap-4 ${
        position == 0
          ? ""
          : position == -1
          ? "translate-x-20"
          : "-translate-x-20"
      }`}
    >
      {position != 1 && (letters.length == 2 ? position != 0 : true) ? (
        <LeftArrow clickHandler={leftArrowClick}></LeftArrow>
      ) : (
        <div></div>
      )}

      {letters.map((z, j) => {
        return <GameTile key={j} position={j} letter={z.letter}></GameTile>;
      })}
      {position != -1 ? (
        <RightArrow clickHandler={RightArrowClick}></RightArrow>
      ) : (
        <div></div>
      )}
    </div>
  );
}
