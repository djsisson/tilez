"use client";

import GameTile from "./GameTile";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import { useState } from "react";

export default function GameRow({ letters }: { letters: string[] }) {
  const [position, setPosition] = useState(0);

  const leftArrowClick = () => {
    setPosition((x) => x - 1);
  };

  const RightArrowClick = () => {
    setPosition((x) => x + 1);
  };

  return (
    <div
      className={`transition ease-in-out delay-150 duration-300  col-span-5 grid grid-cols-5 gap-4 ${
        position == 0
          ? ""
          : position == 1
          ? "translate-x-20"
          : "-translate-x-20"
      }`}
    >
      {position != -1 && (letters.length == 2 ? position != 0 : true) ? (
        <LeftArrow clickHandler={leftArrowClick}></LeftArrow>
      ) : (
        <div></div>
      )}

      {letters.map((z, j) => {
        return <GameTile key={j} position={j} letter={z}></GameTile>;
      })}
      {position != 1 ? (
        <RightArrow clickHandler={RightArrowClick}></RightArrow>
      ) : (
        <div></div>
      )}
    </div>
  );
}
