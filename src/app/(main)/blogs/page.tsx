import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  const data = [
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      date: "Aug 5, 2023",
      title: "mi tempor lorem, eget mollis lectus pede et risus. Quisque",
      description:
        "molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu",
    },
    {
      img: "https://images.unsplash.com/photo-1718824477100-8d253c125065?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 20, 2023",
      title:
        "pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu",
      description:
        "tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et,",
    },
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      date: "Jan 21, 2025",
      title:
        "ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero",
      description:
        "aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla",
    },
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      date: "Jan 3, 2025",
      title:
        "dui quis accumsan convallis, ante lectus convallis est, vitae sodales",
      description:
        "porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque",
    },
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      date: "May 30, 2025",
      title: "risus. Duis a mi fringilla mi lacinia mattis. Integer eu",
      description:
        "aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at,",
    },
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      date: "Aug 5, 2023",
      title: "mi tempor lorem, eget mollis lectus pede et risus. Quisque",
      description:
        "molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu",
    },
    {
      img: "https://images.unsplash.com/photo-1718824477100-8d253c125065?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Nov 20, 2023",
      title:
        "pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu",
      description:
        "tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et,",
    },
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      date: "Jan 21, 2025",
      title:
        "ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero",
      description:
        "aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla",
    },
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      date: "Jan 3, 2025",
      title:
        "dui quis accumsan convallis, ante lectus convallis est, vitae sodales",
      description:
        "porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque",
    },
    {
      img: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      date: "May 30, 2025",
      title: "risus. Duis a mi fringilla mi lacinia mattis. Integer eu",
      description:
        "aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at,",
    },
  ];

  return (
    <>
      <header>
        <div className="grid grid-rows-2 grid-flow-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
          <div className="row-span-3">
            <Image
              src="/mike-uderevsky--fW75WfpAfc-unsplash.jpg"
              alt="Logo"
              width={1920}
              height={1080}
              className="rounded-lg object-cover h-[63vh] w-[60vw]"
            />
          </div>
          <div className="col-span-2">
            {" "}
            <Image
              src="/jigar-panchal-Cp4dn8_6Y5I-unsplash.jpg"
              alt="Logo"
              width={1920}
              height={1080}
              className="rounded-lg object-cover h-[30vh] w-[45vw]"
            />
          </div>
          <div className="row-span-2 col-span-2 ">
            {" "}
            <Image
              src="/mike-uderevsky--fW75WfpAfc-unsplash.jpg "
              alt="Logo"
              width={1920}
              height={1080}
              className="rounded-lg object-cover h-[30vh] w-[45vw]"
            />
          </div>
        </div>
      </header>

      <div className="text-sm breadcrumbs px-6  text-gray-500 dark:text-gray-400 sm:px-8">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blogs">Blog</Link>
          </li>
        </ul>
      </div>

      <section className="flex flex-row flex-wrap w-full items-center justify-center bg-[#030712] rounded-lg shadow-lg p-4">
        {data.map((item) => (
          <Link href={"#"} className="w-[33%]  p-4 relative">
            <Image
              src={item.img}
              alt="Logo"
              width={1920}
              height={1080}
              className="rounded-lg opacity-80 object-cover h-[40vh] w-[60vw]"
            />
            <div className="absolute bottom-10 left-5 p-4 text-white text-sm ">
              <p>{item.date}</p>
              <h1 className="text-lg  font-bold text-wrap mx-2 ">
                {item.title}
              </h1>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
