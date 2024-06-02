import GameRow from "./GameRow";
import CurrentWord from "./CurrentWord";
import NewGameButton from "./NewGameButton";

export default function GameBoard() {
  return (
    <div className="max-w-prose rounded-lg bg-secondary p-4 gap-4 flex flex-col items-center border-border border border-solid text-sm md:text-base lg:text-lg overflow-hidden">
      <CurrentWord></CurrentWord>
      <div className="grid grid-cols-5 grid-rows-6 gap-4">
        <GameRow rowNumber={0}></GameRow>
        <GameRow rowNumber={1}></GameRow>
        <GameRow rowNumber={2}></GameRow>
        <GameRow rowNumber={3}></GameRow>
        <GameRow rowNumber={4}></GameRow>
        <GameRow rowNumber={5}></GameRow>
      </div>
      <div className="p-4">
        <NewGameButton></NewGameButton>
      </div>
    </div>
  );
}
