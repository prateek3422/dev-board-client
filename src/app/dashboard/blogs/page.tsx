

import { blog, columns } from "./columns";
import { DataTable } from "@/components/dashboard/dataTables/data-table";

async function getBlogs(): Promise<blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
    cache: "no-store",
  });
  const data = await res?.json();
  return data?.data?.blogs;
}

export default async function Page() {
  const data = await getBlogs();


  return (
    <>
      <div className={`p-4 sm:ml-64`}>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
