
import Link from "next/link";
import React from "react";

function page() {


  return (
    <>
      {/* <div className="text-sm breadcrumbs px-6  text-gray-500 dark:text-gray-400 sm:px-8">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/Questions">Questions</Link>
          </li>
        </ul>
      </div> */}
      <section>
        <div className="px-10 py-2 flex  flex-col  gap-2 mt-4 ">
          <h1 className="text-3xl font-bold">
            react native stuck after bundle: Done copying assets{" "}
          </h1>
          <div className="flex flex-row items-center gap-8">
            <h3>Asked by: Alex Perez</h3>
            <h3>view: 10 times</h3>
          </div>
        </div>

        <div className="border-t-2 border-[red] w-full px-8 py-2 ">
          <h2>
            My react-native run-ios --device stuck after displaying this line.
            simulator does not stuck. I tried
          </h2>

        </div>
      </section>
    </>
  );
}

export default page;
