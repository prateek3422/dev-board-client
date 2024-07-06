"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";
import NavUtils from "../NavUtils";
import { Button } from "../ui/button";
import { THemeSwitch } from "../THemeSwitch";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-5 py-6 bg-transparent backdrop-blur-md text-white sticky top-0 z-50 w-full">
      <div className="flex items-center poppins gap-2 font-semibold">
        <RiMenu2Fill
          size={24}
          cursor={"pointer"}
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link href="/" className="cursor-pointer mx-3 ">
          <span className=" rounded-md p-0 text-blue-600 text-2xl font-bold ltim">
            Dev
          </span>
          <span className="font-semibold text-2xl ltim">Board</span>
        </Link>
      </div>
      <nav className="hidden md:flex md:space-x-5 font-roboto font-medium">
        <Link href="/" className="hover-animate-wiggle ">
        <Button variant="ghost" className="hover:bg-white hover:text-black" >Home</Button>
        </Link>
        <Link className="hover-animate-wiggle" href="/blogs">
        <Button variant="ghost" className="hover:bg-white hover:text-black" >Blog</Button>
        </Link>
        <Link className="hover-animate-wiggle" href="/questions">
        <Button variant="ghost" className="hover:bg-white hover:text-black" >Questions</Button>
        </Link>
        <Link className="hover-animate-wiggle" href="/services">
        <Button variant="ghost" className="hover:bg-white hover:text-black">Leaderbord</Button>
        </Link>
      </nav>

      {/* mobile nav view */}
      <nav
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "block" : "hidden"
        }  md:hidden z-50 absolute top-[60px] right-0  w-full bg-gray-950 text-white px-5 min-h-52 duration-100 ease-in-out`}
      >
        <div className="flex flex-col py-4 items-center font-roboto font-medium gap-6">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/questions">Questions</Link>
          <Link href="/services">Services</Link>
        </div>
      </nav>

      <div className="flex items-center animate-bounce_two gap-2">
        {/* <THemeSwitch /> */}
        <NavUtils />
      </div>
    </header>
  );
}