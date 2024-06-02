import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import CustomUserButton from "./CustomUserButton";

export default function Header() {
  return (
    <div className="w-full flex justify-between p-4 bg-secondary">
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
