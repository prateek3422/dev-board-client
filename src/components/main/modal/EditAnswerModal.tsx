import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Api, queryClient } from "@/lib";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { ClipboardPen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function EditAnswerModal({
  slug,
  content,
  qusId,
}: {
  slug: string;
  content: any;
  qusId: string;
}) {
  const [value, setValue] = useState(content);

  const { mutate, isPending } = useMutation({
    mutationKey: ["EditAnswer", slug],
    mutationFn: (data: any) =>
      Api.patch(`/qas/answers/${slug}`, { answer: data }).then(
        (res) => res.data
      ),
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["question", qusId] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });
  const handleSubmit = () => {
    mutate(value);
    setValue("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="none">
          <ClipboardPen />
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[70vw] h-[80vh]   ">
        <DialogHeader>
          <DialogTitle>Write your answer</DialogTitle>
          <DialogDescription>
            Write your answer here. Click Button when you&lsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Editor value={value} onChange={setValue} />
        </div>
        <DialogFooter></DialogFooter>
        <DialogClose asChild>
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-[#3000b6] text-white"
            type="submit"
            mt-8
            disabled={isPending}
          >
            Post your answer
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
