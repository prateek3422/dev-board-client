"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
// import {columns } from "./Colounm";
import { DataTable } from "@/components/dashboard/dataTables/Datatable";
import { Api, queryClient } from "@/lib";
import { Loader } from "@/components/Loader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export type Questions = {
  _id: string;
  isPublic: boolean;

  title: string;
  likes: number;
  createdAt: Date;
};

export default function Page() {
  const [Render, setRender] = useState(false);
  const router = useRouter();
  const auth = useAuthStore((state) => state.auth);
  useEffect(() => {
    setRender(true);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      Api.get(`/Questions/getAllQuestions?userId=${auth.user._id}`).then(
        (res) => res?.data?.data
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const { mutate: deleteQuestion, isPending: isDeletequestion } = useMutation({
    mutationKey: ["delete_question"],
    mutationFn: (questionID: any) =>
      Api.delete(`/Questions/${questionID}`).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["questionPublic"],
  //   mutationFn: (blogId: any) =>
  //     Api.post(`/blogs/${blogId}/publish`, data).then((res) => res.data),
  //   onSuccess: (data: any) => {
  //     toast.success(data.message);

  //     queryClient.invalidateQueries({ queryKey: ["blogs"] });
  //   },
  //   onError: (error: any) => {
  //     toast.error(error?.response?.data?.message || error?.message);
  //   },
  // });

  if (!Render) return;

  const columns: ColumnDef<Questions>[] = [
    // {
    //   accessorKey: "isPublic",
    //   header: () => <div className="text-center">Public</div>,
    //   cell: ({ row }) => {
    //     const publicStatus = row.getValue("isPublic");
    //     return (
    //       <div className="text-center font-medium text-wrap">
    //         <Switch
    //         checked={publicStatus as boolean}
    //         // onCheckedChange={() => handleToggle(questionId)}
    //         >
    //           <Label>Public</Label>
    //         </Switch>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "title",
      header: () => <div className="text-center">Title</div>,
      cell: ({ row }) => {
        const title = row.getValue("title") as string;

        return <div className="text-center font-medium text-wrap">{title}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              created
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const created = row.getValue("createdAt") as string;

        const formatted = created.split("T")[0];
        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "likes",
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Likes
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const likes: any = row.getValue("likes");

        const formatted = likes?.length || 0;
        return <div className="text-center font-medium">{formatted}</div>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const question = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0  dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-neutral-800">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(question._id)}
              >
                Copy question ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/Ask/${question._id}`)}
              >
                update question
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteQuestion(question._id)}>
                delete question
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return isLoading ? (
    <div>
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader />
      </div>
    </div>
  ) : (
    <>
      <div className={`flex flex-1 min-h-screen`}>
        <div className="container mx-auto py-14 ">
          <DataTable columns={columns} data={data ? data : []} />
        </div>
      </div>
    </>
  );
}
