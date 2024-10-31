"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

export default function CopyButton(text: any) {
  const [copied, setCopied] = useState(false);
  const copClipboards = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };
  const handleCopy = () => {
    // Copy logic here
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Button
        onClick={copClipboards}
        className={`absolute top-4 right-2 py-2 text-gray-400 `}
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </>
  );
}
