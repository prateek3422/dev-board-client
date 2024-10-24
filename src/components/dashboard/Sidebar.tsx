// import Link from "next/link";
// import { IoHome } from "react-icons/io5";
// import { RiAccountPinCircleLine } from "react-icons/ri";
// import { TbActivityHeartbeat } from "react-icons/tb";
// import { IoSettings } from "react-icons/io5";
// import React from "react";
// import { FaRegQuestionCircle } from "react-icons/fa"
// import { SiAnswer } from "react-icons/si"
// import { LiaBlogSolid } from "react-icons/lia"

// export default function Sidebar() {
//   return (
//     <div>
//       <button
//         data-drawer-target="default-sidebar"
//         data-drawer-toggle="default-sidebar"
//         aria-controls="default-sidebar"
//         type="button"
//         className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>

//       <aside
//         id="default-sidebar"
//         className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//           <ul className="space-y-2 font-medium">

//           <li>
//               <Link
//                 href="/dashboard"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <RiAccountPinCircleLine />
//                 <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <IoHome />

//                 <span className="ms-3">Home</span>
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/dashboard/blogs"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <LiaBlogSolid />

//                 <span className="flex-1 ms-3 whitespace-nowrap">Blogs</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/dashboard/questions"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <FaRegQuestionCircle />

//                 <span className="flex-1 ms-3 whitespace-nowrap">Questions</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/dashboard/answers"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <SiAnswer />

//                 <span className="flex-1 ms-3 whitespace-nowrap">Anawers</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/dashboard/settings"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <IoSettings />
//                 <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </aside>
//     </div>

//   );
// }

"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/drower";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Settings,
  SquareTerminal,
  UserRoundCheck,
} from "lucide-react";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegQuestionCircle } from "react-icons/fa";
import { SiAnswer } from "react-icons/si";

export function Sidebars({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <SquareTerminal className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Blogs",
      href: "/dashboard/blogs",
      icon: (
        <LiaBlogSolid className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Questions",
      href: "/dashboard/questions",
      icon: (
        <FaRegQuestionCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Answers",
      href: "/dashboard/answers",
      icon: (
        <SiAnswer className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Profile",
    //   href: "#",
    //   icon: (
    //     <UserRoundCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Logout",
    //   href: "#",
    //   icon: (
    //     <ArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 w-full flex-1  mx-auto  overflow-hidden",
        "min-h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Davewave",
                href: "/",
                icon: (
                  <Image
                    src="/Vector.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Davewave"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}

      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
// const Dashboard = () => {
//   return (

//   );
// };
