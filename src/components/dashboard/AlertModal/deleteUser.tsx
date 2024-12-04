import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Api } from "@/lib";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function DeleteUser() {
const storeSignOut = useAuthStore((state) => state.signOut);

  const { mutate: deleteAccount } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: () => {
      return Api.delete("/users/delete-user").then((res) => res.data);
    },
    onSuccess: (data: any) => {
      storeSignOut();
      toast.success(data.message);
      window.location.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild >
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-neutral-600 hover:bg-neutral-700">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteAccount()} className="bg-red-600 hover:bg-red-700">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
