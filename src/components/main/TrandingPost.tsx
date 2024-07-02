import { Itim } from "next/font/google";
import Image from "next/image";
import React from "react";

const itim = Itim({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const card = [
  {
    id: 1,
    src: "/abstract-8737436_1920.png",
    alt: "post",
    width: 1920,
    height: 1080,
    className: "rounded-lg absolute inset-0 h-full w-full object-cover",
  },
  {
    id: 2,
    src: "/alex-perez-pEgsWN0kwbQ-unsplash.jpg",
    alt: "post",
    width: 1920,
    height: 1080,
    className: "rounded-lg absolute inset-0 h-full w-full object-cover",
  },
  {
    id: 3,
    src: "/ash-edmonds-0aWZdK8nK2I-unsplash.jpg",
    alt: "post",
    width: 1920,
    height: 1080,
    className: "rounded-lg absolute inset-0 h-full w-full object-cover",
  },
  {
    id: 4,
    src: "/fractal-pattern-6952912_1920.jpg",
    alt: "post",
    width: 1920,
    height: 1080,
    className: "rounded-lg absolute inset-0 h-full w-full object-cover",
  },
  {
    id: 5,
    src: "/jigar-panchal-Cp4dn8_6Y5I-unsplash.jpg",
    alt: "post",
    width: 1920,
    height: 1080,
    className: "rounded-lg absolute inset-0 h-full w-full object-cover",
  },
  {
    id: 6,
    src: "/pawel-czerwinski-ZkzobNDayXo-unsplash.jpg",
    alt: "post",
    width: 1920,
    height: 1080,
    className: "rounded-lg absolute inset-0 h-full w-full object-cover ",
  },
];

export function TrandingPost() {
  return (
    <div className="container mx-auto  px-4 sm:px-6 lg:px-8 ">
      <div
        className={`bg-grey-200  flex flex-col justify-center items-center text-4xl font-sans  my-6 w-full h-full ${itim.className}`}
      >
        <h1>Tending Post</h1>

        <div className="w-full h-full  rounded-lg p-4 mt-4">
            <div className="flex flex-row flex-wrap  justify-center items-center">
                {card.map((item) => (
                <div
                    key={item.id}
                    className="relative isolate flex flex-col mx-4  gap-4 justify-end overflow-hidden  rounded-2xl p-4 mt-4 object-cover h-52 w-96 "
                     >
                    <Image
                     src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className={item.className}
                     />
                    <div className="absolute inset-0 rounded-2xl bg-black/65 w-1/2"></div>
                    <div className="z-10">

                        <h3 className="  text-xs font-bold text-white">january 18, 2024</h3>
                        <p className="w-1/2 text-2xl my-4">What’s next for the drones in film making</p>
                    {/* <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">City of love</div> */}
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
