"use client";
import Image from "next/image";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaQuoteLeft } from "react-icons/fa6";
const Data = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "This Is A Standard Format Post.",
    title: "Introduction to JSON",
    content:
      "JSON (JavaScript Object Notation) is a lightweight data-interchange format...",
    tags: ["JSON", "data", "format"],
    isPublic: true,
    author: "John Doe",
    date: "20-06-2024",
    cmments: [
      {
        id: 1,
        content:
          "Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.",
        author: "John Doe",
        avatar:
          "https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034097.jpg?t=st=1718526536~exp=1718530136~hmac=4b0f8febf835db4853f050e1100c5b6966593d1ae6961034a931fd220252078c&w=740",
        date: "2024-06-20",
      },
      {
        id: 2,
        content:
          "Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.",
        author: "John Doe",
        avatar:
          "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?t=st=1718526664~exp=1718530264~hmac=c4775b4057860c192f7b2262bd90c69bddb461a8bed882dc17762cd8a958d48b&w=740",
        date: "2024-06-20",
      },
      {
        id: 3,
        content:
          "Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.",
        author: "John Doe",
        avatar:
          "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718527511~exp=1718531111~hmac=7b5a4362463526a89c9017c96b4c728bd03b04444384b73da6e600dc5493facd&w=740",
        date: "2024-06-20",
      },
    ],
  },
];

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <section>
        {Data.map((item) => (
          <div key={item.id}>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-6xl font-bold mt-8">{item.name}</h1>
              <div className=" mt-4  flex flex-row justify-center items-center gap-8">
                <h3 className="text-2xl font-bold">{item.author}</h3>
                <h3 className="text-2xl font-bold">{item.date}</h3>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1920}
                  height={1080}
                  className="rounded-lg shadow-lg object-cover h-[60vh] w-[90vw]"
                />

                <p className="max-w-7xl text-2xl font-semibold leading-normal text-gray-900 dark:text-white mt-8">
                  Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat
                  nostrud cupidatat dolor sunt sint sit nisi est eu exercitation
                  incididunt adipisicing veniam velit id fugiat enim mollit amet
                  anim veniam dolor dolor irure velit commodo cillum sit nulla
                  ullamco magna amet magna cupidatat qui labore cillum sit in
                  tempor veniam consequat non laborum adipisicing aliqua ea nisi
                  sint.
                </p>

                <p className="max-w-7xl text-lg  leading-normal text-gray-900 dark:text-white mt-8">
                  Hey everyone! It's almost 2022 and we still don't know if
                  there is aliens living among us, or do we? Maybe the person
                  writing this is an alien. You will never know.By default,
                  Tailwind removes all of the default browser styling from
                  paragraphs, headings, lists and more. This ends up being
                  really useful for building application UIs because you spend
                  less time undoing user-agent styles, but when you really are
                  just trying to style some content that came from a rich-text
                  editor in a CMS or a markdown file, it can be surprising and
                  unintuitive.
                </p>

                <Image
                  src="https://images.unsplash.com/photo-1642516303080-431f6681f864?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={1920}
                  height={1080}
                  alt="A beautiful sunset"
                  className="rounded-lg shadow-lg object-cover h-[60vh] w-[90vw] mt-16"
                />
                <div className="mt-16">
                  <h1>Large heading</h1>

                  <p className="max-w-7xl text-lg  leading-normal text-gray-900 dark:text-white mt-8 flex gap-1">
                    <FaQuoteLeft />
                    Harum quidem rerum facilis est et expedita distinctio. Nam
                    libero tempore, cum soluta nobis est eligendi optio cumque
                    nihil impedit quo minus omnis voluptas assumenda est id quod
                    maxime placeat facere possimus, omnis dolor repellendus.
                    Temporibus autem quibusdam et aut officiis debitis aut rerum
                    necessitatibus saepe eveniet ut et.
                  </p>
                  <p className="max-w-7xl text-lg  leading-normal text-gray-900 dark:text-white mt-8 flex gap-1">
                    Odio dignissimos ducimus qui blanditiis praesentium
                    voluptatum deleniti atque corrupti dolores et quas molestias
                    excepturi sint occaecati cupiditate non provident, similique
                    sunt in culpa. Aenean eu leo quam. Pellentesque ornare sem
                    lacinia quam venenatis vestibulum. Nulla vitae elit libero,
                    a pharetra augue laboris in sit minim cupidatat ut dolor
                    voluptate enim veniam consequat occaecat fugiat in
                    adipisicing in amet Ut nulla nisi non ut enim aliqua laborum
                    mollit quis nostrud sed sed.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row  px-[7rem] items-center mt-8 gap-3">
              <h2 className="text-2xl font-bold ">Tags</h2>
              <TfiLayoutLineSolid />
              {item.tags?.map((tag) => (
                <span className="text-sm border-1 px-4 py-1 bg-[#847F7F] bg-opacity-25 text-white rounded-full font-bold">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col  px-[7rem]  gap-8">
              <h2 className="text-3xl font-bold mt-8">
                {item.cmments?.length} Comments
              </h2>
              {item.cmments?.map((cmment) => (
                <div className="flex flex-col items-start">
                  <div className="flex flex-row items-center gap-4 justify-center">
                    <div className="flex flex-row items-center  justify-center">
                      <Image
                        src={cmment.avatar}
                        alt={cmment.avatar}
                        width={100}
                        height={100}
                        className="rounded-full shadow-lg object-cover h-[10vh] w-[5vw]"
                      />
                    </div>
                    <div className="flex flex-col  items-start gap-1 justify-center ">
                      <p className="text-xl font-bold">{cmment.author}</p>
                      <p className="text-sm">{cmment.date}</p>
                      <p className="text-sm max-w-[40vw] mt-2 text-gray-900 dark:text-white">
                        {cmment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
