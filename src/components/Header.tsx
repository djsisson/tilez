import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import CustomUserButton from "./CustomUserButton";
import GameScore from "./GameScore";
export default function Header() {
  return (
    <div className="flex w-full items-center justify-between bg-secondary px-4 py-2">
      <div>Tilez</div>
      <SignedOut>
        <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" />
      </SignedOut>
      
      <SignedIn>
        <GameScore />
        <CustomUserButton />
      </SignedIn>
    </div>
  );
}
