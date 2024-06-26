import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Help() {
  return (
    <Dialog>
      <DialogTrigger>?</DialogTrigger>
      <DialogContent className="w-svw">
        <DialogHeader>
          <DialogTitle className="text-center underline">
            Rules of the game:
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="flex flex-row gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <img
              src={"assets/blue-tiles.png"}
              alt={"tilez blue"}
              width={300}
              height={100}
            />
            <DialogTitle className="text-center">
              Align tiles to spell a word. Selected tiles are blue.
            </DialogTitle>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <img
              src={"assets/green.png"}
              alt={"tilez green"}
              width={300}
              height={100}
            />
            <DialogTitle className="text-center">
              Tiles where you have found a word turn green.
            </DialogTitle>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <img
              src={"assets/completed.png"}
              alt={"completed"}
              width={300}
              height={100}
            />
            <DialogTitle className="text-center">
              The game is completed when all the tiles are green.
            </DialogTitle>
          </div>
        </DialogDescription>
        <DialogTitle className="text-center">
          Hover over the word at the top and you can find the definition!
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
