import React from "react";

const Page = () => {
  return (
    <div className="max-w-[85rem] mx-auto  mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="flex flex-col gap-y-5 items-center">
          <div className="border-2 border-gray-200 bg-[#D9E0EA] rounded-xl p-4 text-center flex  gap-8">
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-medium text-black">My Rank</h2>
              <h1 className="text-3xl font-bold text-black">3rd Rank</h1>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-medium text-black">My Score</h2>
              <h1 className="text-3xl font-bold text-black">24</h1>
            </div>
          </div>
          <div className="border-2 border-gray-200 bg-blue-800 rounded-xl p-10 text-center">
            

          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Page;
