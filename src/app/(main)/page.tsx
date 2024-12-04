"use client";
// import { TopQuestions &#8218;	 TrandingPost } from "@/components";
import Image from "next/image";
import { Itim, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import BUTTON from "@/components/main/button";
import { BackgroundBeams } from "@/components/ui/backgroundBeam";

const itim = Itim({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <section className="w-full min-h-[100vh] mx-auto ">
        <BackgroundBeams />
        <div className="grid grid-col-1 lg:grid-cols-2 gap-2  h-[100vh]">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center mx-12 my-2 gap-8 ">
              <Image
                src="/circle.svg"
                alt="Hero Image"
                width={100}
                height={100}
                className="w-10 h-10 "
              />
              <div className="flex flex-col items-center gap-4 w-full lg:w-[29vw] xl:w-[42vw] ">
                <h1 className=" text-3xl sm:text-6xl font-bold w-full leading-[3rem] sm:leading-[5rem]">
                  Discover &#44; Learn &#44; and Grow with Us
                </h1>
                <p className="text-sm  leading-[1.6rem]">
                  Join DevWave &#8211; your hub for developers, coders, and tech
                  enthusiasts! Access resources, tutorials, and the latest in
                  tech. Connect, learn, and innovate with a vibrant community.
                  Dive in now!
                </p>

                <div className="flex justify-start items-center w-full">
                  <BUTTON className="">Get started</BUTTON>
                </div>
              </div>
            </div>
          </div>

          <div className=" relative my-4 hidden lg:block   ">
            <div className="mt-2 grid grid-cols-2 w-max gap-6 absolute right-0 top-[5rem] xl:top-[10rem]">
              <div className="flex flex-col justify-center items-center gap-2">
                <img src="/imgsvg1.svg" alt="Hero Image" className="h-52" />

                <div className="flex gap-2 items-end">
                  <img src="/rombus.svg" alt="" className=" h-12 xl:h-20" />
                  <img src="/midleft.svg" alt="Hero Image" className="h-32 xl:h-64" />
                </div>
                <img
                  src="/Wavy Buddies Avatar (2).svg"
                  alt="Hero img"
                  className="h-52 xl:h-72"
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <img
                  src="/Wavy Buddies Out of Stock.svg"
                  alt="Hero Image"
                  className="h-32 mr-20 xl:h-64" 
                />

                <div className="flex items-center gap-6">
                  <img
                    src="/Wavy Buddies Avatar.svg"
                    alt="Hero Image"
                    className=" h-64 xl:h-96"
                  />

                  <img
                    src="Rectangle 9.svg"
                    alt="cullerd-circle"
                    className="h-6"
                  />
                </div>

                <img
                  src="/Wavy Buddies Out of Stock (1).svg"
                  alt="Hero Image"
                  className=" h-40 xl:h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
