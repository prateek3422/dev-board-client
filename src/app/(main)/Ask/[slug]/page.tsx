"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Editor from "@/components/Editor/Editor";
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/multiselect";
import { defaultValue } from "@/components/Editor/defaultvalue";

const formSchema = z.object({
  tags: z.array(z.string()).nonempty("Please select at least one tag"),
  title: z.string().nonempty("Title required"),
});

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
    queryFn: () => Api.get(`/tags?func=true`).then((res) => res?.data),
  });

  const [value, setValue] = React.useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["AskQuestion"],
    mutationFn: (data: any) => {
      return Api.post("/qas", data).then((res) => res.data);
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      window.location.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // mutate(data);
  };

  return (
    <div className="mt-24 px-4">
      <div>
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
              <div className="mt-8 px-4   ">
                <Editor initialValue={defaultValue} onChange={setValue} />
              </div>
            </div>

            <div className=" lg:w-1/3 lg:px-2 flex flex-col items-center justify-center sm:w-full sm:px-2">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center gap-2 px-4 w-full">
                    <FormLabel className="text-white"></FormLabel>
                    <FormControl>
                      <MultiSelector
                          className="bg-transparent"
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

              <Button
                type="submit"
                className="mt-4   bg-[#3B82F6] hover:bg-blue-700 text-white w-[96%] "
                disabled={isPending}
              >
                update Question
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
