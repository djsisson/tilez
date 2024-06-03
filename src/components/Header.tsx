import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import CustomUserButton from "./CustomUserButton";

export default function Header() {
  return (
    <div className="flex w-full justify-between bg-secondary p-4">
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
