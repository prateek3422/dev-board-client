import React, { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

const copyButton = ({ text, className }: { text: any; className: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copClipboards = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };
  return (
    <>
      <Button
        onClick={copClipboards}
        className={`absolute top-4 right-2 py-2 text-gray-400 ${className}`}
      >
        {isCopied ? <Check /> : <Copy />}
      </Button>
    </>
  );
};

export default copyButton;
