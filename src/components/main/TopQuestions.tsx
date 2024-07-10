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
    <div>
      <div className="flex flex-col gap-4 p-4">
        <h3 className=" text-white text-3xl text-center font-bold">
          Top Questions
        </h3>

        <div className=" grid sm:grid-cols-2 md:grid-cols-3  mx-auto gap-4 max-w-screen-2xl md:p-4 lg:p-8 ">
          {Questions.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col  gap-2 bg-[#3B82F6] rounded-xl p-2 md:p-4"
              >
                <div className=" flex  items-center justify-between ">
                  <div className=" flex items-center justify-center gap-2">
                    <Image
                      src={item.img}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="rounded-full w-16 h-16"
                    />
                    <div className="flex flex-col">
                      <h2>{item.userName}</h2>
                      <p>{item.ask} Asks</p>
                    </div>
                  </div>
                  <div>{/* //display time */}</div>
                </div>
                <div>
                  <p>{item.question}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
