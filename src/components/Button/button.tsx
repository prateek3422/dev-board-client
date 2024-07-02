import React from "react";

export const Button = ({ children,className }: { children: React.ReactNode, className?: string }) => {
  return (
    <button className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300  py-2 px-5 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-700  ${className}`}>
      {children}
    </button>
  );
};