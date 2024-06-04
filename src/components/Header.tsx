import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import CustomUserButton from "./CustomUserButton";

export default function Header() {
  return (
    <div className="flex w-full justify-between bg-secondary px-4 py-2">
      <div>Tilez</div>
      <SignedOut>
        <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" />
      </SignedOut>
      <SignedIn>
        <CustomUserButton />
      </SignedIn>
    </div>
  );
}
