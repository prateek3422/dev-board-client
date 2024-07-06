"use client";
import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../../components/dashboard/Editor"), {
  ssr: false,
});
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MultiSelectTest from "@/components/dashboard/categorySelector";
import Image from "next/image";

import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/multiselect";

const formSchema = z.object({
  categories: z.array(z.string()).nonempty("Please select at least one category"),
  tags: z.string().nonempty("Tag required"),
  title: z.string().nonempty("Title required"),
  content: z.string().nonempty("Content required"),
  image: z.string().nonempty("Image required"),
});

const users = [
  {
    name: "ThePrimeagen",
    picture:
      "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718527511~exp=1718531111~hmac=7b5a4362463526a89c9017c96b4c728bd03b04444384b73da6e600dc5493facd&w=740",
  },
  {
    name: "Shadcn",
    picture:
      "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718527511~exp=1718531111~hmac=7b5a4362463526a89c9017c96b4c728bd03b04444384b73da6e600dc5493facd&w=740",
  },
  {
    name: "Theo",
    picture:
      "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718527511~exp=1718531111~hmac=7b5a4362463526a89c9017c96b4c728bd03b04444384b73da6e600dc5493facd&w=740",
  },
];

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [users[0].name],
      tags: "",
      title: "",
      content: "",
      image: "",
    },
  });
  const [value, setValue] = React.useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: (data: any) => Api.post("/blogs", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      //   window.location.replace("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div>
        <h1>Add Blog</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap"
          >
            <div className="w-2/3 px-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                    <FormLabel className="text-white">Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your title"
                        className=" mb-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Editor value={value} onChange={setValue} />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                    <FormLabel className="text-white">Content</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your content"
                        className=" mb-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3 px-2">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                    <FormLabel className="text-white">Categories</FormLabel>
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
                            {users.map((user) => (
                              <MultiSelectorItem
                                key={user.name}
                                value={user.name}
                              >
                                <div className="flex items-center space-x-2">
                                  <Image
                                    src={user.picture}
                                    alt={user.name}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <span>{user.name}</span>
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

     
         
            </div>

            <Button type="submit" className="mx-auto" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
