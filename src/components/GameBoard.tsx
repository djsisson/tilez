import GameRow from "./GameRow";
import CurrentWord from "./CurrentWord";
import NewGameButton from "./NewGameButton";

export default function GameBoard() {
  return (
    <div className="flex max-w-prose select-none flex-col items-center gap-4 overflow-hidden rounded-lg border border-solid border-border bg-secondary p-4 text-lg md:text-2xl lg:text-4xl">
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
