import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import blue from "@/assets/blue-tiles.png";
import green from "@/assets/green-word.png";
import definition from "@/assets/definition.png";

export default function Help() {
  return (
    <Dialog>
      <DialogTrigger>?</DialogTrigger>
      <DialogContent className="w-svw">
        <DialogHeader>
          <DialogTitle className="underline text-center">Rules of the game:</DialogTitle>
        </DialogHeader>

        <DialogDescription className="flex flex-row gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Image src={blue} alt={"tilez blue"} width={300} height={100} />
            <DialogTitle>
              Align tiles to spell a word. Selected tiles are blue.
            </DialogTitle>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Image src={green} alt={"tilez green"} width={300} height={100} />
            <DialogTitle>
              Tiles where you have found a word turn green.
            </DialogTitle>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Image
              src={definition}
              alt={"definition"}
              width={300}
              height={100}
            />
            <DialogTitle>
              When you have found a word, hover over the word at the top and you
              can find the definition!
            </DialogTitle>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
