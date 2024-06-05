import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import CustomUserButton from "./CustomUserButton";
import GameScore from "./GameScore";
export default function Header() {
  return (
    <div className="flex w-full items-center justify-between gap-4 bg-secondary px-4 py-2">
      <div className="text-center font-bold">
        Tilez</div>
      <SignedOut>
        <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" />
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-4">
          <GameScore />
          <CustomUserButton />
        </div>
      </SignedIn>
    </div>
  );
}
