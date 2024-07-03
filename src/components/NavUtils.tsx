"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { THemeSwitch } from "./THemeSwitch";

function NavUtils() {
  const [mounted, setMounted] = useState(false);
  const auth = useAuthStore((state) => state.auth);
  const storeSignOut = useAuthStore((state) => state.signOut);

  const { mutate } = useMutation({
    mutationFn: () => Api.post("/users/signout").then((res) => res.data),
    onSuccess: (data: any) => {
      storeSignOut();
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error("error to sign out");
    },
  });

  useEffect(() => setMounted(true), []);

  const handleSignOut = () => {
    mutate();
  };

  if (!mounted) return false;

  return (
    <>
      {auth.isAuth ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src={auth.user.avatar.url}
                width={24}
                height={24}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
        
            
            <li>
              <Link href="/dashboard" className="justify-between">
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Logout</button>
            </li>
          </ul>
        </div>
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
