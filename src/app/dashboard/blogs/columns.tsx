"use client";

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
import { DataTable } from "@/components/dashboard/dataTables/data-table";


export type blog = {
  _id: string;
  isPublic: boolean;
  image: string;
  title: string;
  likes: number;
  createdAt: Date;
};

const handleToggle = async(isPublic: string) => {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${isPublic}/publish`, {
    cache: "no-store",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
 
  });
  const data = await res;
  return data
};

export const columns: ColumnDef<blog>[] = [
  {
    accessorKey: "isPublic",
    header: () => <div className="text-center">Public</div>,
    cell: ({ row }) => {
      const publicStatus = row.getValue("isPublic")
      const blog = row.original;
      return (
        
        <div className=" text-center">
          {/*@ts-ignore */}
          <Switch checked={publicStatus} onCheckedChange={() => handleToggle(blog._id)}>
            <Label>Public</Label>
          </Switch>
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("image");
      //@ts-ignore
      const formatted = image?.url;
      return (
        <div className=" flex justify-center items-center">
          {" "}
          <img
            src={formatted}
            alt="image"
            className="w-14 h-14 rounded-full  object-cover object-center "
          />{" "}
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Likes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const likes = row.getValue("likes");
      //@ts-ignore
      const formatted = likes?.length;
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
            <DropdownMenuItem><BlogModal buttonName="Update Blog" TitleName="Update Blog" blogId={blog._id} /></DropdownMenuItem>
            <DropdownMenuItem >delete blog</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
