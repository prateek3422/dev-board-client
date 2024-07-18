'use client'

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    FacebookShareButton,
    LinkedinShareButton,
    OKShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
 
  } from "react-share";
 

import { RiShare2Line } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin, FaTelegramPlane, FaTwitter, FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";


export const ShareComponent = ({slug} :{slug:string}) => {
    const shareUrl = `http://localhost:3000/blogs/${slug}`;

  return (
    <>
      {/* <!-- share --> */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex  items-center justify-center gap-2"><RiShare2Line />share</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Share</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><FacebookShareButton url={shareUrl} className="flex gap-2 items-center justify-center"> <BsFacebook /> share on Facebook</FacebookShareButton></DropdownMenuItem>
          <DropdownMenuItem><LinkedinShareButton url={shareUrl} className="flex gap-2 items-center justify-center"><FaLinkedin/> share on Linkedin</LinkedinShareButton></DropdownMenuItem>
          <DropdownMenuItem><TelegramShareButton url={shareUrl} className="flex gap-2 items-center justify-center"><FaTelegramPlane/> share on Telegram</TelegramShareButton></DropdownMenuItem>
          <DropdownMenuItem><TwitterShareButton url={shareUrl} className="flex gap-2 items-center justify-center"><FaTwitter/> share on Twitter</TwitterShareButton></DropdownMenuItem>
          <DropdownMenuItem><WhatsappShareButton url={shareUrl} className="flex gap-2 items-center justify-center"><FaWhatsapp/> share on Whatsapp</WhatsappShareButton></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
