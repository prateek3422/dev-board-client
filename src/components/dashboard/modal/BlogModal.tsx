"use client";
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
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../Editor"), {
  ssr: false,
});
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/customComponents/dropImage";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MultiSelectTest from "@/components/dashboard/categorySelector";
import Image from "next/image";
import { Paperclip, Tags } from "lucide-react";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/multiselect";
import { IoCloudUploadSharp } from "react-icons/io5";

const formSchema = z.object({
  categories: z
    .array(z.string())
    .nonempty("Please select at least one category"),
  tags: z.array(z.string()).nonempty("Please select at least one tag"),
  title: z.string().nonempty("Title required"),
});



export function BlogModal({
  buttonName,
  TitleName,
  blogId,
}: {
  buttonName: string;
  TitleName: string;
  blogId: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      tags: [],
      title: "",
    },
  });

  const { data: tag } = useQuery({
    queryKey: ["tag"],
    queryFn: () => Api.get(`${process.env.NEXT_PUBLIC_API_URL}/tags?func=true`).then((res) => res.data),
  });

  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: () => Api.get(`${process.env.NEXT_PUBLIC_API_URL}/categories?func=true`).then((res) => res.data),
  });

  const [files, setFiles] = useState<File[]>();
  const [value, setValue] = React.useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: (data: any) =>
      Api.post("/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => res.data),
    onSuccess: (data: any) => {
      console.log(data);
      toast.success(data.message);
      window.location.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("categories", JSON.stringify(data.categories));
    formData.append("title", data.title);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("content", value);
    //@ts-ignore
    formData.append("image", files[0]);

    mutate(formData);
  };

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full">
        <DialogHeader>
          <DialogTitle>{TitleName}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            {/* <h1 className="text-white text-2xl font-bold px-8 my-8 text-center ">Add Blog</h1> */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-wrap sm:flex-col lg:flex-row "
              >
                <div className="lg:w-2/3 lg:px-2 sm:w-full sm:px-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                        <FormLabel className="text-white"></FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your title"
                            className="h-12 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-8 px-4 h-[40vh]  ">
                    <Editor value={value} onChange={setValue} />
                  </div>
                </div>

                <div className=" lg:w-1/3 lg:px-2 flex flex-col items-center justify-center sm:w-full sm:px-2">
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-center gap-2 px-4 w-full">
                        <FormLabel className="text-white"></FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select categories" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {category?.data?.categories.map((item: any) => (
                                  <MultiSelectorItem
                                    key={item._id}
                                    value={item._id}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <span>{item.name}</span>
                                    </div>
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-center gap-2 px-4 w-full">
                        <FormLabel className="text-white"></FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select tags" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {tag?.data?.tags?.map((item: any) => (
                                  <MultiSelectorItem
                                    key={item._id}
                                    value={item._id}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <span>{item?.name}</span>
                                    </div>
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-8 w-full">
                    <FileUploader
                      //@ts-ignore
                      value={files}
                      //@ts-ignore
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative  rounded-lg p-2"
                    >
                      <FileInput className="outline-double outline-1 outline-gray-400">
                        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                          <IoCloudUploadSharp
                            size={40}
                            className="text-gray-400"
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file: File, i: number) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </div>

                  <Button
                    type="submit"
                    className="mt-4   bg-[#3B82F6] hover:bg-blue-700 text-white w-[96%] "
                    disabled={isPending}
                  >
                    Create Blog
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            {buttonName === "Add Blog" ? "Create Blog" : "Update Blog"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
