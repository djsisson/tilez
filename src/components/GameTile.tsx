export default function GameTile({
  letter,
  position,
}: {
  letter: string;
  position: number;
}) {
  return (
    <div
      className={`font-bold uppercase rounded-lg px-6 py-4 bg-primary-foreground grid-cols-subgrid col-start-${
        position + 2
      }`}
      key={position}
    >
      {letter}
    </div>
  );
}
