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
import { useAuthStore } from "@/store";



export type blog = {
  _id: string;
  isPublic: boolean;
  image: string;
  title: string;
  likes: number;
  createdAt: Date;
};


export default function Page() {
  const [Render, setRender] = useState(false);




  useEffect(() => {
    setRender(true);
  }, []);
  
 
  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      // /:questionId/answers/author
      Api.get(`/qas/6687676fd47113db6320144f/answers`).then((res) => res?.data?.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  

  const { mutate, isPending } = useMutation({
    mutationKey: ["blogPublic"],
    mutationFn: (blogId: any) =>
      Api.post(`/blogs/${blogId}/publish`, data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["Auth"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });
  const { mutate: deleteBlog, isPending: isDeletePending } = useMutation({
    mutationKey: ["delete_blog"],
    mutationFn: (blogId: any) =>
      Api.delete(`/blogs/${blogId}`, {}).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const handleToggle = (blogId: string) => {
    mutate(blogId);
  };
  if (!Render) return;


  const columns: ColumnDef<blog>[] = [
    {
      accessorKey: "isPublic",
      header: () => <div className="text-center">Public</div>,
      cell: ({ row }) => {
        const publicStatus = row.getValue("isPublic");
        const blog = row.original;

        return (
          <div className=" text-center">
            <Switch
              //  @ts-ignore

              checked={publicStatus}
              onCheckedChange={() => handleToggle(blog._id)}
            >
              <Label>Public</Label>
            </Switch>
          </div>
        );
      },
    },
   
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
        const blog = row.original;

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
                onClick={() => navigator.clipboard.writeText(blog._id)}
              >
                Copy blog ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                update question
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteBlog(blog._id)}>
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
