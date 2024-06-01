import { words_six } from "@/data/6letter";
import { revalidatePath } from "next/cache";

export default function test() {
  function getRandom() {
    const i = Math.floor(Math.random() * words_six.length);
    return words_six[i];
  }

  async function refresh() {
    "use server";
    revalidatePath("/testing");
  }

  return (
    <div>
      <div>{getRandom()}</div>
      <div>{getRandom()}</div>
      <div>{getRandom()}</div>
      <form action={refresh}>
        <button>regenerate</button>
      </form>
    </div>
  );
}
