import Image from "next/image";
import React from "react";

export const Badges = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4  flex-wrap   mt-4  ">
      <div className="border-2 border-gray-200 w-96 h-64 rounded-lg shadow-md px-4 py-2 flex flex-col justify-between items-center">
        <Image
          src="/vip_badge-removebg-preview.png"
          alt="vip badge"
          width={200}
          height={200}
          className="h-full"
        />
        <h1>This user doesn’t have any gold badges yet.</h1>
      </div>
      <div className="border-2 border-gray-200 w-96 h-64 rounded-lg shadow-md px-4 py-2 flex flex-col justify-between items-center">
        <Image
          src="/vip_badge-removebg-preview.png"
          alt="vip badge"
          width={200}
          height={200}
          className="h-full"
        />
        <h1>3 silver badges</h1>
      </div>
      <div className="border-2 border-gray-200 w-96 h-64 rounded-lg shadow-md px-4 py-2 flex flex-col justify-between items-center">
        <Image
          src="/download__3_-removebg-preview.png"
          alt="vip badge"
          width={200}
          height={200}
          className="h-full"
        />
        <h1>This user doesn’t have any gold badges yet.</h1>
      </div>
    </div>
  );
};
