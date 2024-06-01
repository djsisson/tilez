import { words_six } from "@/data/6letter";
import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";
import GameRow from "./GameRow";
import CurrentWord from "./CurrentWord";

export default function GameBoard() {
  function getRandomWord() {
    const i = Math.floor(Math.random() * words_six.length);
    return words_six[i];
  }

  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function mixWords() {
    let totalLength = 0;
    const output = [];
    do {
      totalLength = 0;
      const words = [
        Array.from(getRandomWord()),
        Array.from(getRandomWord()),
        Array.from(getRandomWord()),
      ];
      for (let i = 0; i < 6; i++) {
        const chars = new Set([words[0][i], words[1][i], words[2][i]]);
        output[i] = Array.from(chars);
        shuffleArray(output[i]);
        totalLength += output[i].length;
      }
    } while (totalLength < 17);
    return output;
  }

  async function refresh() {
    "use server";
    revalidatePath("/");
  }

  return (
    <div className="max-w-prose rounded-lg bg-secondary p-4 gap-4 flex flex-col items-center">
      <CurrentWord></CurrentWord>
      <div className="grid grid-cols-5 grid-rows-6 gap-4">
        {mixWords().map((x, i) => (
          <GameRow key={i} letters={Array.from(x)}></GameRow>
        ))}
      </div>
      <div className="p-4">
        <form action={refresh}>
          <Button>regenerate</Button>
        </form>
      </div>
    </div>
  );
}
