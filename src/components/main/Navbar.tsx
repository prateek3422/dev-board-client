import React from "react";
import Link from "next/link";
import ThemeSwitch from "../THemeSwitch";
import NavUtils from "../NavUtils";

export function Navbar() {
  return (
    <div className="navbar bg-[#323233]  px-8 sticky top-0 z-50">
      <Link
        href="/"
        className="flex-1 text-2xl font-semibold navbar-start ltim"
      >
        <span className="text-white mx-1">Dev</span>
        <span className="text-[#C61B1C]">Board</span>
      </Link>

      <nav className="navbar-center inter text-white font-medium ">
        <div className="hidden lg:flex gap-8 pl-8">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/questions">Questions </Link>
          <Link href="/services">Services</Link>
        </div>
      </nav>

      <div className="navbar-end">
        <div className="flex gap-2 items-center">
          <NavUtils />
        </div>
      </div>
    </div>
  );
}
