"use client";
import React from "react";
import { LoginSchema} from "@/schemas";
import { zodErrorHandler } from "@/lib/zodErrorHandler";
import { toast, Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const login = () => {
  const router = useRouter();
  const submitHandler = async (formdata: FormData) => {
    const inputdata = {
      email: formdata.get("email"),
      password: formdata.get("password"),
    };
    console.log(inputdata);
    const result = LoginSchema.safeParse(inputdata);
    console.log(result);
    if (!result.success) {
      const err = zodErrorHandler(result.error.issues);
      toast.error(err);
      return;
    }
    const res = await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });
    if (res?.error) {
      toast.error(res?.error);
    } else {
      toast.success("Welcome!");
      router.push("/");
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 bg-sky-500"></div>
      <div className="w-1/2 bg-zinc-200 flex flex-col justify-center items-center">
        <div className="w-2/3 h-[400px] bg-white flex flex-col items-center rounded-3xl gap-10">
          <h1 className="text-2xl font-semibold text-sky-500 mt-10">Login</h1>

          <form className="w-full flex flex-col gap-y-6" action={submitHandler}>
            <div className="flex justify-evenly">
              <label htmlFor="email" className="text-gray-500 pr-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className="focus-visible:outline-sky-400 ml-7 text-black bg-white"
              />
            </div>

            <div className="flex justify-evenly">
              <div className="flex items-center">
                <label htmlFor="password" className="text-gray-500 pr-2">
                  password
                </label>
              </div>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="********"
                className="focus-visible:outline-sky-400 text-black bg-white"
              />
            </div>
            <button className="w-[120px] h-[50px] bg-sky-500 text-xl text-white self-center rounded-md mt-5 hover:scale-[1.1] transition transform-1s">
              Login
            </button>
            <div className="flex justify-evenly">
              <div className="self-end mr-3 text-sky-500">
                <Link href="/auth/register">Dont have an account</Link>
              </div>
              <div className="self-end mr-3 text-sky-500">
                <Link href="./">back</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default login;
