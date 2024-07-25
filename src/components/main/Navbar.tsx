"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";
import NavUtils from "../NavUtils";
import { Button } from "../ui/button";
import { THemeSwitch } from "../THemeSwitch";
import { useAuthStore } from "@/store";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuthStore((state) => state.auth);

  console.log(auth);
  return (
    <header className="flex items-center justify-between px-5 py-6 bg-transparent backdrop-blur-md text-white fixed top-0 z-50 w-full">
      <div className="flex items-center poppins gap-2 font-semibold">
        <RiMenu2Fill
          size={24}
          cursor={"pointer"}
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link href="/" className="cursor-pointer mx-3 ">
          <img src="/logo1.svg" alt="logo" className="w-48" />
        </Link>
      </div>
      <nav className="hidden md:flex md:space-x-5 font-roboto font-medium">
        <Link href="/" className="hover-animate-wiggle ">
          <Button variant="ghost" className="hover:bg-white hover:text-black">
            Home
          </Button>
        </Link>
        <Link className="hover-animate-wiggle" href="/blogs">
          <Button variant="ghost" className="hover:bg-white hover:text-black">
            Blog
          </Button>
        </Link>
        <Link className="hover-animate-wiggle" href="/questions">
          <Button variant="ghost" className="hover:bg-white hover:text-black">
            Questions
          </Button>
        </Link>
        {auth?.isAuth ? (
          <Link className="hover-animate-wiggle" href="/leaderboard">
            <Button variant="ghost" className="hover:bg-white hover:text-black">
              Leaderbord
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            className="hover:bg-white hover:text-black"
            disabled
          ></Button>
        )}
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
          {auth?.isAuth ? (
            <Link href="/leaderboard">Leaderboard</Link>
          ) : (
            <button disabled={true}>Login</button>
          )}
        </div>
      </nav>

      <div className="flex items-center animate-bounce_two gap-2">
        {/* <THemeSwitch /> */}
        <NavUtils />
      </div>
    </header>
  );
}
