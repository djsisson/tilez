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
    if (gameState.rows.length == 0) return;
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

  if (letters.length == 0)
    return <div className="col-span-5 gap-4 px-6 py-4"></div>;

  return (
    <div
      className={`transition ease-in-out delay-150 duration-300  col-span-5 grid grid-cols-5 gap-4 ${
        position == 0
          ? ""
          : position == -1
          ? "translate-x-[79px] md:translate-x-[81px] lg:translate-x-[83px]"
          : "-translate-x-[79px] md:-translate-x-[81px] lg:-translate-x-[83px]"
      }`}
    >
      {position != 1 && (letters.length == 2 ? position != 0 : true) ? (
        <LeftArrow clickHandler={leftArrowClick}></LeftArrow>
      ) : (
        <div></div>
      )}

      {letters.map((z, j) => {
        return (
          <GameTile
            key={j}
            position={j}
            letter={z.letter}
            found={z.found}
          ></GameTile>
        );
      })}
      {position != -1 ? (
        <RightArrow clickHandler={RightArrowClick}></RightArrow>
      ) : (
        <div></div>
      )}
    </div>
  );
}
