import { DatePickerWithRange } from "@/components/DatePicker";
import LeaderBoardTable from "@/components/main/LeaderBoardTable";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-[85rem] mx-auto  mt-24">
      <div className="grid grid-cols-1 md:grid-cols-[30rem_minmax(50rem,_2fr)] gap-7">
        <div className="flex flex-col gap-y-5 items-end  ">
        <div className="border-1 border-gray-400 bg-[#16171a] rounded-xl px-10 py-4  text-center flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-medium text-white">
              Top Sender Last Week{" "}
            </h1>
            <img
              src="https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034097.jpg?t=st=1718526536~exp=1718530136~hmac=4b0f8febf835db4853f050e1100c5b6966593d1ae6961034a931fd220252078c&w=740"
              alt=""
              className="rounded-full w-24 h-24"
            />
            <div className="flex flex-col items-center ">
              <h2 className="text-xl font-medium text-white ">
                DANIEL RICCIARDO
              </h2>
              <h3>Daniel Ricciardo</h3>
            </div>
          </div>
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
         
        </div>

        <div>
          <div className="border-1 bg-[#16171a] border-gray-400 w-full rounded-xl max-w-3xl px-10  p-4">
            <div className="  flex items-center justify-between gap-10">
              <h1>Dev Wave</h1>
              <DatePickerWithRange />
            </div>
          <LeaderBoardTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
