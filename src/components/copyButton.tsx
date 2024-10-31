"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Copy logic here
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleCopy}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
