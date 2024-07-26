"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/customComponents/dropImage";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Paperclip } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "@/lib";
import toast from "react-hot-toast";
import Avatar from "react-avatar";

const Page = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [value, setValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["Auth"],
    queryFn: () => Api.get(`/auth/profile`).then((res) => res?.data?.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: (data) =>
      Api.post("/users/avatar", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      // window.location.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { mutate: updateName } = useMutation({
    mutationKey: ["updateName"],
    mutationFn: (data) => {
      return Api.patch("/users/profile", { name: data }).then(
        (res) => res.data
      );
    },

    onSuccess: (data: any) => {
      toast.success(data.message);
      // window.location.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { mutate: updatePassword } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: (data) => {
      console.log(data);
      return Api.patch("/auth/change-password", { password: data }).then(
        (res) => res.data
      );
    },

    onSuccess: (data: any) => {
      toast.success(data.message);
      // window.location.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const handleUpdateName = () => {
    //@ts-ignore
    updateName(value);
  };

  const handleUpdatePassword = () => {
    //@ts-ignore
    updatePassword(password);
  };

  useEffect(() => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("avatar", files[0]);
      //@ts-ignore
      mutate(formData);
    }
  }, [files]);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto ">
        {/* <!-- Card --> */}
        <div className=" rounded-xl shadow p-4 sm:p-7 bg-[#847f7f21]">
          <div className="mb-8">
            <h2 className="text-xl text-white font-bold  ">Profile</h2>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Manage your name, password and account settings.
            </p>
          </div>

          <form>
            {/* <!-- Grid --> */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200" />
                Profile photo
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-9">
                <FileUploader
                  //@ts-ignore
                  value={files}
                  //@ts-ignore
                  onValueChange={setFiles}
                  dropzoneOptions={dropZoneConfig}
                  reSelect={true}
                >
                  <div className="flex items-center gap-5">
                    <Avatar
                      name={profile?.user?.name}
                      src={profile?.user?.avatar?.url}
                      size="60"
                      round
                    />

                    <div className="flex gap-x-2">
                      <div>
                        <FileInput
                          className={cn(
                            buttonVariants({
                              size: "icon",
                            }),
                            "size-8"
                          )}
                        >
                          <Paperclip className="size-4" />
                          <span className=" absolute  ml-[10rem] text-white">
                            Select your photo
                          </span>
                        </FileInput>
                      </div>
                    </div>
                  </div>
                </FileUploader>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Full name
                </label>
                <div className="hs-tooltip inline-block">
                  <svg
                    className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                    role="tooltip"
                  >
                    Displayed on public forums, such as Preline
                  </span>
                </div>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-9">
                <div className="sm:flex gap-x-2 ">
                  <Input
                    id="af-account-full-name"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder={profile?.user?.name}
                  />
                  <Button
                    className=" bg-[#4926b0] hover:bg-[#3000b6] text-white"
                    onClick={handleUpdateName}
                  >
                    change name
                  </Button>
                </div>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Email
                </label>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  type="email"
                  value={profile?.user?.email}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Password
                </label>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-9">
                <div className="sm:flex gap-x-2">
                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Enter new password"
                  />

                  <Button
                    className=" bg-[#4926b0] hover:bg-[#3000b6] text-white "
                    onClick={handleUpdatePassword}
                  >
                    change password
                  </Button>
                </div>
              </div>
              {/* <!-- End Col --> */}

              {/* <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Phone
                  </label>
                  <span className="text-sm text-gray-400 dark:text-neutral-600">
                    (Optional)
                  </span>
                </div>
              </div> */}
              {/* <!-- End Col --> */}

              {/* <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-phone"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="+(xx) xxxxxxxxxx"
                  />
                </div>
              </div> */}
            </div>
            {/* <!-- End Grid --> */}

            {/* <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
