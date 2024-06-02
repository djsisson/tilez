export default function GameTile({
  letter,
  position,
}: {
  letter: string;
  position: number;
}) {
  return (
    <div
      className={`select-none border border-solid border-border font-semibold uppercase rounded-lg px-6 py-4 bg-background flex justify-center grid-cols-subgrid col-start-${
        position + 2
      }`}
      key={position}
    >
      {letter}
    </div>
  );
}
