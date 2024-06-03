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
      className={`flex select-none grid-cols-subgrid justify-center rounded-lg border border-solid border-border px-6 py-4 font-semibold uppercase col-start-${
        position + 2
      } ${found ? "bg-green-500 text-background" : "bg-background"}`}
      key={position}
    >
      {letter}
    </div>
  );
}
