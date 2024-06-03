export default function GameTile({
  letter,
  position,
  found,
  active,
}: {
  letter: string;
  position: number;
  found: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`flex select-none grid-cols-subgrid items-center justify-center rounded-lg border border-solid border-border p-4 font-semibold uppercase col-start-${
        position + 2
      } ${found ? "bg-green-500 text-background" : active ? "bg-blue-500" : "bg-background"}`}
      key={position}
    >
      {letter}
    </div>
  );
}
