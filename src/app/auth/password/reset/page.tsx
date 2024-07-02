"use client";
import Link from "next/link";
import { useState } from "react";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Page() {
  const [isPassword, setIsPassword] = useState(true);

  const passwordToggle = () => {
    setIsPassword(!isPassword);
  };
  return (
    <>
      <section className="flex justify-center items-center h-screen mx-2">
        <form className="flex gap-8 flex-col bg-gray-800 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1">
          <h1 className="text-center font-semibold text-xl">Reset Password</h1>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <MdOutlinePhoneAndroid size={20} />
              <input type="text" className="grow" placeholder="OTP" />
            </label>
            <p className="text-red-500 font-medium"></p>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <TbPasswordFingerprint size={20} />
              <input type="text" className="grow" placeholder="Password" />
              {isPassword ? (
                <FaEye size={22} onClick={passwordToggle} />
              ) : (
                <FaEyeSlash size={22} onClick={passwordToggle} />
              )}
            </label>
            <p className="text-red-500 font-medium"></p>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <TbPasswordFingerprint size={20} />
              <input
                type="text"
                className="grow"
                placeholder="Confirm Password"
              />
              {isPassword ? (
                <FaEye size={22} onClick={passwordToggle} />
              ) : (
                <FaEyeSlash size={22} onClick={passwordToggle} />
              )}
            </label>
            <p className="text-red-500 font-medium"></p>
          </div>

          <div>
            <button type="submit" className="btn btn-sm btn-primary w-full">
              Reset Password
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
