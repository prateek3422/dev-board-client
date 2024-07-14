import Editor from "@/components/Editor";
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
import { Api } from "@/lib";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export function AnswerModal({ slug }: { slug: string }) {
  const [value, setValue] = useState("");
  const auth = useAuthStore((state) => state.auth);

  const { mutate, isPending } = useMutation({
    mutationKey: ["AskAnswer", slug],
    mutationFn: (data: any) =>
      Api.post(`qas/${slug}/answers`, { answer: data }).then((res) => res.data),
    onSuccess: (data: any) => {
      console.log(data);
      toast.success(data.message);
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
        {auth.isAuth ? (
          <Button  variant="outline">Post your answer</Button>
        ) : (
          <Button disabled variant="outline">
            Post your answer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[70vw] h-[80vh]   ">
        <DialogHeader>
          <DialogTitle>Write your answer</DialogTitle>
          <DialogDescription>
            Write your answer here. Click Button when you&lsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Editor
            className="w-full px-4 h-[20vh] sm:h-[30vh] "
            disabled={true}
            value={value}
            onChange={setValue}
          />
        </div>
        <DialogFooter></DialogFooter>
        <Button onClick={handleSubmit} type="submit" mt-8>
          Post your answer
        </Button>
      </DialogContent>
    </Dialog>
  );
}
