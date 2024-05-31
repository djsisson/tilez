"use client";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const CustomUserButton = () => {
  const { resolvedTheme } = useTheme();
  return (
    <UserButton
      userProfileMode="navigation"
      userProfileUrl="/settings/"
      showName={true}
      userProfileProps={{
        appearance: {
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        },
      }}
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default CustomUserButton;
