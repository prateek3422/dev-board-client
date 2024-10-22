"use client";
// import { TopQuestions &#8218;	 TrandingPost } from "@/components";

import Image from "next/image";
import { Itim, Poppins } from "next/font/google";
import { RxDoubleArrowDown } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiSingleQuotesR } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Particles } from "@/components/ui/glowing-stars";
import BUTTON from "@/components/main/button";
import { BackgroundBeams } from "@/components/ui/backgroundBeam";

const itim = Itim({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// const PoppinsFont = Poppins({
//   subsets: ["latin"],
//   weight: ["400",	"700", "900"],
//   display: "swap",
// });

export default function Home() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  // useEffect(() => {
  //   setColor(theme === "dark" ? "#ffffff" : "#000000");
  // }, [theme]);
  return (
    <>
      {/* <div className="w-full min-h-[100vh] relative    overflow-y">
        <div className=" absolute bg-dot inset-0 opacity-80"></div>

        <Particles
          className="absolute inset-0 z-50"
          quantity={150}
          ease={80}
          // color={color}
          refresh
        />

        <div className="w-full  flex flex-col items-center justify-start absolute top-1/2   -translate-y-1/2">
          <h1 className="scroll-m-20 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight lg:text-5xl   text-white  lg:mt-16 text-center">
            Discover &#8218; Learn &#8218; and Grow with Us
          </h1>

          <p className="leading-4 md:leading-6 [&:not(:first-child)]:mt-6 text-center text-white  sm:w-[80vw] md:w-[60vw]  max-w-[80vw] text-[0.5rem]   md:text-sm">
            Welcome to DevWave &#8218; the ultimate destination for developers
            &#8218; coders &#8218; and tech enthusiasts! At DevWave &#8218; we
            believe in the power of community and collaboration. Whether you
            &#8217;re a seasoned professional or just starting your coding
            journey &#8218; you&#8217; ll find a wealth of resources &#8218;
            insightful articles &#8218; and the latest industry news right here.
            Our platform is designed to foster innovation &#8218; share
            knowledge &#8218; and connect you with like-minded individuals who
            share your passion for technology. Dive into our tutorials &#8218;
            join engaging discussions &#8218; and stay ahead of the curve with
            our expert insights. DevWave is more than just a blog—it &#8217; s
            your go-to hub for all things tech. Join us and be part of a
            thriving community that &#8217;s shaping the future of development.
          </p>

          <Link href="/blogs">
            <BUTTON className="">Get Started</BUTTON>
          </Link>
 
        </div>
      </div> */}
      <section className="w-full min-h-[100vh]">
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
              <div className="flex flex-col items-center gap-4 w-full lg:w-[29vw] ">
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

          <div className=" relative my-4 hidden lg:block  ">
            <div className="mt-2 grid grid-cols-2 w-max gap-6 absolute right-0 top-[5rem]">
              <div className="flex flex-col justify-center items-center gap-2">
                <img src="/imgsvg1.svg" alt="Hero Image" className="h-52" />

                <div className="flex gap-2 items-end">
                  <img src="/rombus.svg" alt="" className=" h-12" />
                  <img src="/midleft.svg" alt="Hero Image" className="h-32 " />
                </div>
                <img
                  src="/Wavy Buddies Avatar (2).svg"
                  alt="Hero img"
                  className="h-52"
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <img
                  src="/Wavy Buddies Out of Stock.svg"
                  alt="Hero Image"
                  className="h-32 mr-20"
                />

                <div className="flex items-center gap-6">
                  <img
                    src="/Wavy Buddies Avatar.svg"
                    alt="Hero Image"
                    className=" h-64"
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
                  className=" h-40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
