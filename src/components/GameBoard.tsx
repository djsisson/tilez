import { words_six } from "@/data/6letter";
import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";

export default function GameBoard() {
  function getRandomWord() {
    const i = Math.floor(Math.random() * words_six.length);
    return words_six[i];
  }

  function mixWords() {
    const words = [
      Array.from(getRandomWord()),
      Array.from(getRandomWord()),
      Array.from(getRandomWord()),
    ];
    console.log(words);
    const output = [];
    for (let i = 0; i < 6; i++) {
      output[i] = new Set([words[0][i], words[1][i], words[2][i]]);
    }
    return output;
  }

  async function refresh() {
    "use server";
    revalidatePath("/");
  }

  return (
    <div className="max-w-prose rounded-lg bg-secondary p-4 gap-4 flex flex-col items-center">
      <div>Current Word</div>
      <div className="grid grid-cols-5 grid-rows-6 gap-4">
        {mixWords().map((x, i) => (
          <div className="col-span-5 grid grid-cols-5 gap-4" key={i}>
            {Array.from(x).map((z, j) => {
              return (
                <div
                  className={`font-bold text-transform: uppercase rounded-lg px-6 py-4 bg-primary-foreground grid-cols-subgrid col-start-${
                    j + 1
                  }`}
                  key={j}
                >
                  {z}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        <form action={refresh}>
          <Button>regenerate</Button>
        </form>
      </div>
    </div>
  );
}
