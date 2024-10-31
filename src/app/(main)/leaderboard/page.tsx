"use client";
// import { DatePickerWithRange } from "@/components/DatePicker";
import LeaderBoardTable from "@/components/main/LeaderBoardTable";
import { Button } from "@/components/ui/button";
import { Api } from "@/lib";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import Avatar from "react-avatar";

const Page = () => {
  const auth = useAuthStore((state) => state.auth);
  const { data } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () =>
      Api.get(`${process.env.NEXT_PUBLIC_API_URL}/LeaderBoards/top`).then(
        (res) => res?.data?.data
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return auth?.isAuth ? (
    <div className="max-w-[85rem] mx-auto  mt-24">
      <div className="grid grid-cols-1 md:grid-cols-[30rem_minmax(50rem,_2fr)] gap-7">
        <div className="flex flex-col gap-y-5 items-end  ">
          <div className="border-1 border-gray-400 bg-neutral-700 rounded-xl px-8 py-4  text-center flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-medium text-white">
              Top Sender Last Month
            </h1>
            <Avatar
              name={data?.[0]?.Fullname}
              src={data?.[0]?.avatar}
              size="100"
              round={true}
            />
            <div className="flex flex-col items-center ">
              <h2 className="text-xl font-medium text-white ">
                {data?.[0]?.Fullname}
              </h2>
              <h3>score {data?.[0]?.credit}</h3>
            </div>
          </div>
          {data?.map(
            (item: any, index: number) =>
              auth?.user?._id === item?._id && (
                <div
                  className="border-2 border-gray-200 bg-[#D9E0EA] rounded-xl p-8 text-center flex  gap-8"
                  key={index}
                >
                  <div className="flex flex-col items-start">
                    <h2 className="text-xl font-medium text-black">My Rank</h2>
                    <h1 className="text-3xl font-bold text-black">
                      {index + 1} Rank
                    </h1>
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl font-medium text-black">My Score</h2>
                    <h1 className="text-3xl font-bold text-black">
                      {item.credit}
                    </h1>
                  </div>
                </div>
              )
          )}
        </div>

        <div>
          <div className="border-1 bg-neutral-700 border-gray-400 w-full rounded-xl max-w-3xl px-10  p-4">
            <div className="  flex items-center justify-between gap-10 mb-4">
              <h1>Dev Wave</h1>
              <Button
                variant="default"
                className="bg-[#4926b0] hover:bg-[#3000b6] text-white"
              >
                {" "}
                All Time
              </Button>
              {/* <DatePickerWithRange /> */}
            </div>
            <LeaderBoardTable data={data} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="max-w-[50rem] flex flex-col mx-auto mt-56">
        {/* <!-- ========== MAIN CONTENT ========== --> */}
        <main id="content">
          <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="block text-2xl font-bold text-white sm:text-4xl">
              LeaderBoard Page
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              To access the leaderboard and see your rankings &sbquo; please log
              in to your account. Stay updated on your progress and compare your
              performance with other developers. If you don &#8217; t have an
              account yet &sbquo; sign up now to join the community and start
              competing
            </p>
            <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
              <Link
                className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                href="/auth/signin"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Login Page
              </Link>
            </div>
          </div>
        </main>
        {/* <!-- ========== END MAIN CONTENT ========== --> */}
      </div>
    </>
  );
};

export default Page;
