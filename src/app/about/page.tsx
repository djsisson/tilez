"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
          >
          
          </div>
          <div>
            <h1>Welcome to Tilez! The game which shall meet all your vocabulary needs - and some!</h1>
            <h2 className="pt-10">Created by Darren Sisson, Colin Carter, Jaya Chedumbarum Pillay & Sarah Wiseman.</h2>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default AboutPage;