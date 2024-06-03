"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PageWithSignIn = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [documentMounted, setDocumentMounted] = useState(false);
  useEffect(() => {
    setDocumentMounted(true);
  }, []);

  const handleClose = () => {
    router.push("/");
  };

  return documentMounted
    ? createPortal(
        <div
          className="modal absolute inset-0 flex items-center justify-center backdrop-blur-sm"
          onClick={() => {
            handleClose();
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SignIn
              fallbackRedirectUrl="/"
              signUpFallbackRedirectUrl="/"
              appearance={{
                baseTheme: resolvedTheme === "dark" ? dark : undefined,
              }}
            />
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default PageWithSignIn;
