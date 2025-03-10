"use client";
import React, { useState } from "react";
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
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
import Editor from "@/components/Editor/Editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultValue } from "@/components/Editor/defaultvalue";
import * as mongoose from "mongoose";

const formSchema = z.object({
  tags: z.array(z.string()).nonempty("Please select at least one tag"),
  title: z.string().nonempty("Title required"),
});

async function getTags() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Tags/getAllTag`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      title: "",
    },
  });

  const { data: tag } = useQuery({
    queryKey: ["tag"],
    queryFn: getTags,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [value, setValue] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: (data: any) =>
      Api.post("/Blogs/Create-Blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      window.location.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {

    const upload = {
      title: data.title,
      tags: data.tags,
      content: value,
      image: files[0],
    };

    mutate(upload);
  };

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-white text-2xl font-bold px-8 my-8 text-center ">
      Write Blog
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="block sm:flex sm:flex-wrap sm:flex-col lg:flex-row "
        >
          <div className="lg:w-2/3 lg:px-2 sm:w-full sm:px-2">
            {/* name block */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center gap-2 ">
                  <FormLabel className="text-white"></FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your title"
                      className="h-12 rounded-lg w-full dark:bg-neutral-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* editor block */}
            <ScrollArea className="mt-4 h-96">
              <Editor initialValue={defaultValue} onChange={setValue} />
            </ScrollArea>
          </div>

          <div className=" lg:w-1/3 lg:px-2 flex flex-col items-center justify-start sm:w-full sm:px-2">
            {/* tag block */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center gap-2  w-full">
                  <FormControl>
                    <MultiSelector
                        className="!bg-transparent py-3"
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select tags" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {tag?.data?.map((item: any) => (
                            <MultiSelectorItem key={item._id} value={item?._id}>
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
              {/* file upload block */}
              <FileUploader
                value={files}
                //@ts-ignore
                onValueChange={setFiles}
                dropzoneOptions={dropZoneConfig}
                className="relative  rounded-lg p-2"
              >
                <FileInput className=" outline-gray-400 dark:bg-neutral-700">
                  <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                    <IoCloudUploadSharp size={40} className="text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
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
              className="mt-4  bg-[#4926b0] hover:bg-[#3000b6] text-white w-[96%] "
              disabled={isPending}
            >
              Create Blog
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
