"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
// import {columns } from "./Colounm";
import {DataTable} from "@/components/dashboard/dataTables/Datatable";
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
import { BlogModal } from "@/components/dashboard/modal/BlogModal";
import { useRouter } from "next/navigation";



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

  useEffect(() => {
    setRender(true);
  }, []);
  
 
  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      Api.get(`/qas/author`).then((res) => res?.data?.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  

  

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["blogPublic"],
  //   mutationFn: (questionId: any) =>
  //     Api.post(`/blogs/${blogId}/publish`, data).then((res) => res.data),
  //   onSuccess: (data: any) => {
  //     toast.success(data.message);

  //     queryClient.invalidateQueries({ queryKey: ["question"] });
  //   },
  //   onError: (error: any) => {
  //     toast.error(error?.response?.data?.message || error?.message);
  //   },
  // });



  const { mutate: deleteBlog, isPending: isDeletePending } = useMutation({
    mutationKey: ["delete_question"],
    mutationFn: (blogId: any) =>
      Api.delete(`/qas/${blogId}`, {}).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

 
  if (!Render) return;


  const columns: ColumnDef<Questions>[] = [
  
   
    {
      accessorKey: "title",
      header: () => <div className="text-center">Title</div>,
      cell: ({ row }) => {
        const title = row.getValue("title");
        //@ts-ignore
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
        const created = row.getValue("createdAt");
        //@ts-ignore
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
        const likes:any = row.getValue("likes");

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
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(question._id)}
              >
                Copy blog ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(`/Ask/${question._id}`)}>
                update question
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteBlog(question._id)}>
                delete blog
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return isLoading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <div className={`p-4 sm:ml-64`}>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data?.questions} />
        </div>
      </div>
    </>
  );
}
