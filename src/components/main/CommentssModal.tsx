"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { title } from "process";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { DialogClose } from "@radix-ui/react-dialog";

export function CommentsModal({
  name,
  title,
  lable,
  id
}: {
  name: string;
  title: string;
  lable: string;
  id:string
}) {
  const [comment, setComment] = useState("");

  const { mutate: addComment } = useMutation({
    mutationFn: () => Api.post(`/blogs/${id}/comments`, { comment }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Comment Added Successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error Adding Comment");
    },
  });


  

  const handleComment = (e: any) => {
    setComment(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#3B82F6] hover:bg-blue-700 text-white"
        >
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="name" className="text-right">
              {lable}
            </Label>
            <Input
              id="name"
              value={comment}
              className="col-span-3"
              onChange={handleComment}
              placeholder="Enter your comment"
            />
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={() => addComment()}>
            comment
          </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
