
import { SearchBar } from "@/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

export default function Questions() {
  const questions = [
    {
      id: 1,
      title: "How do I make the most out of a MS in Business Analytics?",
      Questions:
        "I will be studying full-time for a 1-year MS in Business Analytics. What advise would you give to a person in this situation so that he can make the most out of his time out from work and get the ...?",
      tags: ["Next.js", "React", "Tailwind CSS"],
      author: {
        name: "Alex Perez",
        avatar:
          "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1719133774~exp=1719137374~hmac=15c7681113dd35af26490a9d905033d4964474def7748a535c48268c45d8a1b7&w=740",
      },
    },
    {
      id: 2,
      title: "What are the best practices for data visualization in Python?",
      Questions:
        "I'm working on a data science project and want to create clear and impactful visualizations. What libraries and techniques should I focus on for data visualization in Python?",
      tags: ["Python", "Data Visualization", "Pandas"],
      author: {
        name: "Sarah Lee",
        avatar:
          "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100190.jpg?t=st=1719133827~exp=1719137427~hmac=2c09f56f144bb61b2abd8bd9881b88bbb560fd79e9cafc2b1be36d3f9cc8d9d1&w=740",
      },
    },
    {
      id: 3,
      title: "Should I learn SQL or NoSQL for my first database?",
      Questions:
        "I'm new to databases and wondering which one to learn first - SQL or NoSQL?  What are the pros and cons of each, and which is better for beginners?",
      tags: ["Database", "SQL", "NoSQL"],
      author: {
        name: "David Kim",
        avatar:
          "https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034097.jpg?t=st=1719134095~exp=1719137695~hmac=5d7795acfacb34bcc24633f09cd637d274899910f3ce0c93a4c995dd288ad650&w=740",
      },
    },
    {
      id: 4,
      title: "Tips for landing your first machine learning engineer job?",
      Questions:
        "I'm about to graduate with a degree in machine learning and am looking for advice on how to get my foot in the door.  What skills and experience should I highlight on my resume, and what can I do to prepare for interviews?",
      tags: ["Machine Learning", "Career Advice", "Jobs"],
      author: {
        name: "Maria Garcia",
        avatar:
          "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100224.jpg?t=st=1719133861~exp=1719137461~hmac=4b7c4704487f96e7caeae991af442b6b1140621a199e49853313f3a974cf0f56&w=740",
      },
    },
    {
      id: 5,
      title: "How to build a strong portfolio for data science applications?",
      Questions:
        "I know a data science portfolio is important, but I'm not sure what projects to include. What kind of projects showcase the most relevant skills for data science jobs?",
      tags: ["Data Science", "Portfolio", "Projects"],
      author: {
        name: "Noah Miller",
        avatar:
          "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100229.jpg?t=st=1719133875~exp=1719137475~hmac=499813ef2bd90b56fdf5038c14cc289f65fbce6b0f4f571dbc56b19df5be7242&w=740",
      },
    },
    {
      id: 6,
      title:
        "Understanding the differences between supervised and unsupervised learning?",
      Questions:
        "I'm confused about the different types of machine learning. Can someone explain the key differences between supervised and unsupervised learning?",
      tags: [
        "Machine Learning",
        "Supervised Learning",
        "Unsupervised Learning",
      ],
      author: {
        name: "Chloe Bennet",
        avatar:
          "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?t=st=1719133935~exp=1719137535~hmac=82766281ecb518f81ae455752e265b10a6004e7ce6589752e08a9369dd3f8118&w=740",
      },
    },
    {
      id: 7,
      title: "Best resources for learning Git and Github for version control?",
      Questions:
        "I want to learn how to use Git and Github for version control in my projects.  What are some good tutorials or online courses that can help me get started?",
      tags: ["Git", "GitHub", "Version Control"],
      author: {
        name: "Omar Khan",
        avatar:
          "https://img.freepik.com/premium-photo/memoji-beautiful-girl-woman-white-background-emoji_826801-6872.jpg?w=740",
      },
    },
    {
      id: 8,
      title: "Building a basic web scraper with Python - beginner guide?",
      Questions:
        "I'm interested in learning how to web scrape data with Python.  Are there any good resources or tutorials for beginners that can walk me through the process?",
      tags: ["Python", "Web Scraping", "Tutorial"],
      author: {
        name: "Sophia Hernandez",
        avatar:
          "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1719134010~exp=1719134610~hmac=00381afc7171d9367685e14b6db7aa63e7251ed84c6d5ba54d52dee9775f99c3",
      },
    },
    {
      id: 9,
      title:
        "Choosing the right cloud platform for data science projects (AWS, GCP, Azure)?",
      Questions:
        "There are a number of cloud platforms available for data science, like AWS, GCP, and Azure.  Which one is the best choice, and what factors should I consider when making this decision?",
      tags: ["Cloud Computing", "Data Science", "AWS", "GCP", "Azure"],
      author: {
        name: "Ethan Jones",
        avatar:
          "https://img.freepik.com/free-photo/3d-render-little-boy-with-eyeglasses-blue-shirt_1142-50994.jpg?t=st=1719134040~exp=1719137640~hmac=0fcf00814df8e7b7d512b3f8436d91638fd1d642cea65d98e6d724c2f9414317&w=740",
      },
    },
  ];

  return (
    <section>
      <header className="h-[calc(60vh-4vh)] bg-[#030712]  bg-cover bg-center bg-no-repeat rounded-lg shadow-lg px-4 py-2">
        <div className="bg-[url('/alex-perez-pEgsWN0kwbQ-unsplash.jpg')] h-full bg-cover bg-center bg-no-repeat w-full  flex flex-col items-center justify-center">
          <h1 className="text-3xl  font-bold  text-white w-50vw ">
            Share & grow the world knowledge!
          </h1>

          <p className="text-center text-white max-w-3xl mt-4 font-bold ">
            Our mission is to connect developers and enthusiasts with the
            knowledge they seek, enabling a dynamic exchange of coding expertise
            and diverse perspectives. By fostering a collaborative environment,
            we aim to enhance understanding and empower everyone to share their
            programming knowledge, driving innovation and growth in the tech
            community.
          </p>
        </div>
      </header>

      <main>
        <div className="search  rounded-lg shadow-lg px-8 py-4 flex flex-row items-center justify-center">
          <SearchBar />
        </div>

        <div className="px-4 py-2 flex flex-row gap-4 mt-4 ">
          <div className="  flex flex-col justify-center items-center">
            {questions.map((data) => (
              <div
                key={data.id}
                className="flex flex-row items-center justify-center border-2 mb-4 ml-8 w-[75vw]  bg-[#847f7f21] px-4 rounded-lg "
              >
                <div className="flex flex-row   items-start justify-center">
                  <Image
                    src={data.author.avatar}
                    alt="avatar"
                    width={1920}
                    height={1080}
                    className="rounded-full w-[5vw] h-[5vw] mr-4"
                  />
                  {/* <h1 className="text-sm font-bold  text-white">{data.author.name}</h1> */}
                </div>
                <div>
                  <div className="px-4 py-2 flex flex-row items-center gap-4  justify-center">
                    <h2 className="text-2xl font-bold text-white">
                      {data.title}
                    </h2>
                  </div>

                  <p className="text-sm px-8 py-2 text-white">
                    {data.Questions}
                  </p>

                  <div className="flex flex-row items-center  px-[2rem]  py-2 gap-3">
                    {data.tags?.map((tag) => (

                      <span key={tag} className="text-sm border-1 px-4 py-1 bg-[#0f0724] bg-opacity-25 text-white rounded-full font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="border-2 border-[red] w-[20vw] ">
            <button>Add Question</button>
          </div> */}
        </div>
      </main>
    </section>
  );
}
