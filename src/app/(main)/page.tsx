import { TopQuestions, TrandingPost } from "@/components";
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
const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <div className="w-full min-h-[100vh] relative   bg-circle">
        <div className=" absolute bg-dot inset-0 opacity-80"></div>

        <div className="w-full  flex flex-col items-center justify-start absolute top-1/2   -translate-y-1/2">
          <h1 className="scroll-m-20 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight lg:text-5xl   text-white  lg:mt-16 text-center">
            Were WordsFlow. See our <br /> thoughts, stories & ideas.
          </h1>

          <p className="leading-7 [&:not(:first-child)]:mt-6 text-white sm:w-[80vw] md:w-[60vw] w-[90vw] text-justify  text-[0.8rem]">
            Browse our HTML5 responsive Blog templates below. You can easily
            customize any of our Blog website templates with Webflow&apos;s
            code-free design tools, then connect your new Blog website to our
            powerful CMS, and launch it today new Blog website to our powerful
            CMS, and launch it today new Blog website to
          </p>

          <Link href="/blogs">
            <Button className="mt-10 bg-[#3B82F6] hover:bg-blue-700 text-white">
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

      <div className="relative w-full h-full mt-16  ">
        <TrandingPost />
      </div>
      <TopQuestions />
    </>
  );
}
