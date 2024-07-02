"use client";
import Link from "next/link";

function Page() {
  return (
    <>
      <section className="flex justify-center items-center h-screen mx-2">
        <form className="flex gap-8 flex-col bg-gray-800 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1">
          <h1 className="text-center font-semibold text-xl">Forget Password</h1>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="email" />
            </label>

            <p className="text-red-500 font-medium"></p>
          </div>

          <div>
            <button type="submit" className="btn btn-sm btn-primary w-full">
              Forget Password
            </button>
          </div>

          <div className="font-medium">
            <p>
              Don t have an account?{" "}
              <Link href="/auth/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default Page;
