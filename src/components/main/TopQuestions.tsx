import { Itim } from "next/font/google";
import Image from "next/image";
import React, { use } from "react";

const Questions = [
  {
    id: 1,
    img: "https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034097.jpg?t=st=1718526536~exp=1718530136~hmac=4b0f8febf835db4853f050e1100c5b6966593d1ae6961034a931fd220252078c&w=740",
    userName: "@eve",
    ask: 105,
    question:
      "How to get groupby a dataframe and aggregate values when columns to be aggregated are discovered dynamically?",
    tags: ["react", "javascript", "frontend"],
  },
  {
    id: 2,
    img: "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?t=st=1718526664~exp=1718530264~hmac=c4775b4057860c192f7b2262bd90c69bddb461a8bed882dc17762cd8a958d48b&w=740",
    userName: "@sarah",
    ask: 1050,
    question:
      "How to get groupby a dataframe and aggregate values when columns to be aggregated are discovered dynamically?",
    tags: ["python", "django", "javascript"],
  },
  {
    id: 3,
    img: "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718527511~exp=1718531111~hmac=7b5a4362463526a89c9017c96b4c728bd03b04444384b73da6e600dc5493facd&w=740",
    userName: "@johndoe",
    ask: 1032,
    question:
      "How to get groupby a dataframe and aggregate values when columns to be aggregated are discovered dynamically?",
    tags: ["react", "javascript", "frontend"],
  },
];

const itim = Itim({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
export function TopQuestions() {
  return (
    <div className="container mx-auto  px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col justify-center items-center text-4xl  my-6 w-full h-full ">
        <h3 className=" text-white text-3xl font-bold">Top Questions</h3>

        <div className="flex  flex-row justify-center gap-4 flex-wrap  items-center mt-16  ">
          {Questions.map((item) => {
            return (
              <div
                key={item.id}
                className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem]"
              >
                <div className="flex items-center flex-wrap  gap-4">
                  <Image
                    src={item.img}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="rounded-full w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-white text-3xl font-bold">
                      {item.userName}
                    </h2>
                    <p className="text-white text-sm mt-1">
                      {item.ask} Asks
                    </p>
                  </div>
                </div>
                <p className="text-white w-96 text-xs  px-16 mt-4">
                  {item.question}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
