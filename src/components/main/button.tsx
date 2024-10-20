import { Button } from "@/components/ui/button";
import React from "react";

const BUTTON = ({
  children,
  type,
  className,
  ...props
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  props?: any;
}) => {
  return (
    <div>
      <Button
        type={type}
        className={` bg-[#4926b0] hover:bg-[#3000b6] text-white  ${className}`}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export default BUTTON;
