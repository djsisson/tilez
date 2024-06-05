"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const router = useRouter();
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
          ></div>
          <div className="modal absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
              <div className="flex flex-col gap-4 rounded-lg bg-secondary p-4">
                <div className="p-10">
                  <h1>
                    Welcome to Tilez! The game which shall meet all your
                    vocabulary needs - and some!
                  </h1>
                  <h2 className="py-10">
                    Created by Colin Carter, Darren Sisson, Jaya Chedumbarum
                    Pillay & Sarah Wiseman.
                  </h2>
                  <div className="flex w-full justify-end">
                    <Button onClick={handleClose}>Close</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default AboutPage;
