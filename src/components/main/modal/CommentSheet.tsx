"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Api, queryClient } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { FaRegComment } from "react-icons/fa";
import { GetComments } from "../GetComments";

export function CommentSheet({
  blogId,
  comment,
  auth,
}: {
  blogId: string;
  comment: any;
  auth: any;
}) {
  const [value, setValue] = useState("");

  const { mutate: addComment } = useMutation({
    mutationFn: () => Api.post(`/Comments/${blogId}`, { content: value }),
    onSuccess: (data) => {
      setValue("");
      toast.success("Comment Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["comment", blogId] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error Adding Comment");
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          variant="none"
          disabled={!auth.isAuth}
        >
          <FaRegComment />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{comment?.length}</TooltipTrigger>
              <TooltipContent>
                <p>comments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>comments</SheetTitle>
          <SheetDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="max-w-sm space-y-3">
            <textarea
              className="py-3 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm  disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus-visible:no-underline "
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Add a comment"
            ></textarea>
          </div>
        </div>
        <SheetFooter>
          <Button
            className="bg-[#4926b0] hover:bg-[#3000b6] text-white "
            type="submit"
            onClick={() => {
              addComment();
            }}
          >
            comment
          </Button>
        </SheetFooter>

        <div className="flex items-center justify-center">
          <GetComments blogId={blogId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
