import { Button } from "@/components/ui/button";
import React from "react";

const BUTTON = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div>
      <Button className={` bg-[#4926b0] hover:bg-[#3000b6] text-white`}>
        {children}
      </Button>
    </div>
  );
};

export default BUTTON;
