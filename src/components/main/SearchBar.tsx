"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Api, queryClient } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [Search, setSearch] = useState<string>("");

  const { data, isSuccess } = useQuery({
    queryKey: ["blog"],
    queryFn: () =>
      Api.get(`${process.env.NEXT_PUBLIC_API_URL}/Blogs/getAllBlog`).then(
        (res) => res?.data?.data
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  isSuccess && queryClient.invalidateQueries({ queryKey: ["blog"] });
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="w-full sm:w-[70vw] md:w-[40vw] px-4">
        {/* <!-- SearchBox --> */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <svg
              className="flex-shrink-0 size-4 text-gray-400 dark:text-white/60"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <input
            onClick={() => setOpen(true)}
            className="relative py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-slate-700 dark:text-neutral-400 dark:placeholder-neutral-500 "
            type="text"
            placeholder="Type a command or search..."
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            data-hs-combo-box-input=""
          />
          <CommandShortcut className="absolute top-4 right-2  ">
            ⌘k
          </CommandShortcut>
        </div>

        {/* <!-- End SearchBox --> */}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput className="" placeholder=" search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="" heading="Suggestions">
            {data?.blogs?.map((item: any) => (
              <Link key={item._id} href={`/blogs/${item.slug}`}>
                <CommandItem
                  onSelect={() => {
                    setSearch(item.title);
                  }}
                >
                  {item.title}
                </CommandItem>
              </Link>
            ))}
            {/* <CommandItem>Calculator</CommandItem> */}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
