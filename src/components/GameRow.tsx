import GameTile from "./GameTile";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

export default function GameRow({ letters }: { letters: string[] }) {
  return (
    <div className="col-span-5 grid grid-cols-5 gap-4">
      <LeftArrow></LeftArrow>
      {letters.map((z, j) => {
        return <GameTile key={j} position={j} letter={z}></GameTile>;
      })}
      <RightArrow></RightArrow>
    </div>
  );
}
