export default function GameTile({
  letter,
  position,
  found,
}: {
  letter: string;
  position: number;
  found: boolean;
}) {
  return (
    <div
      className={`select-none border border-solid border-border font-semibold uppercase rounded-lg px-6 py-4 flex justify-center grid-cols-subgrid col-start-${
        position + 2
      } ${found ? "bg-green-500 text-background" : "bg-background"}`}
      key={position}
    >
      {letter}
    </div>
  );
}
