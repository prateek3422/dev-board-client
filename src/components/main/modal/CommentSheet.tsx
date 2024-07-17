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
import { Api } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { FaRegComment } from "react-icons/fa";
import { GetComments } from "../GetComments";

export function CommentSheet({
  blogId,
  comment,
}: {
  blogId: string;
  comment: any;
}) {
  const [value, setValue] = useState("");

  const { mutate: addComment } = useMutation({
    mutationFn: () => Api.post(`/blogs/${blogId}/comments`, { comment: value }),
    onSuccess: (data) => {
      toast.success("Comment Added Successfully");
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
          variant="ghost"
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
              className="py-3 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-blue-500 focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="This is a textarea placeholder"
            ></textarea>
          </div>
        </div>
        <SheetFooter>
          <Button
            type="submit"
            onClick={() => {
              addComment();
              setValue("");
            }}
          >
            comment
          </Button>
        </SheetFooter>

        <div className="flex flex-col">
          <GetComments blogId={blogId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
