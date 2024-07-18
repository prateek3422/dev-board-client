"use client";
import React, { use, useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import Link from "next/link";
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";

import Avatar from "react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavUtils() {
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = useAuthStore((state) => state.auth);
  const storeSignOut = useAuthStore((state) => state.signOut);

 
  const { mutate } = useMutation({
    mutationFn: () => Api.post("/auth/signout").then((res) => res.data),
    onSuccess: (data: any) => {
      storeSignOut();
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error("error to sign out");
    },
  });
  const handleSignOut = () => {
    console.log("sign out");
    mutate();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === `q`) {
        handleSignOut();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => setMounted(true), []);



  if (!mounted) return false;

  return (
    <>
      {auth.isAuth ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-transparent hover:bg-transparent mr-8 ">
              <Avatar
                name={auth?.user?.name}
                src={auth?.user?.avatar?.url}
                size="40"
                round
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/dashboard" className="justify-between">
                  Dashboard
                </Link>
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <button onClick={handleSignOut}>Log out</button>

              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth/signin">
          <Button className=" bg-[#3B82F6] hover:bg-blue-700 text-white">
            Sign In
          </Button>
        </Link>
      )}
    </>
  );
}

export default NavUtils;
