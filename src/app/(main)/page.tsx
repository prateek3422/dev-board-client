// import { TopQuestions &#8218;	 TrandingPost } from "@/components";
import Image from "next/image";
import { Itim, Poppins } from "next/font/google";
import { RxDoubleArrowDown } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiSingleQuotesR } from "react-icons/ri";

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
  return (
    <>
      <div className="w-full min-h-[100vh] relative   bg-circle">
        <div className=" absolute bg-dot inset-0 opacity-80"></div>

        <div className="w-full  flex flex-col items-center justify-start absolute top-1/2   -translate-y-1/2">
          <h1 className="scroll-m-20 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight lg:text-5xl   text-white  lg:mt-16 text-center">
            Discover &#8218; Learn &#8218; and Grow with Us
          </h1>

          <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify text-white  sm:w-[80vw] md:w-[60vw] max-w-[90vw]   text-sm">
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
            <Button className="mt-10 bg-[#4926b0] hover:bg-[#3000b6] text-white">
              Get Started
            </Button>
          </Link>
          {/* 
            <Button className="mt-16 animate-bounce text-3xl ">
              {" "}
              <RxDoubleArrowDown />
            </Button> */}
        </div>
      </div>

      {/* <div className="relative w-full h-full mt-16  "> */}
      {/* <TrandingPost /> */}
      {/* </div> */}
      {/* <TopQuestions /> */}
    </>
  );
}
