"use client";
import React from "react";
import { RegisterSchema } from "@/schemas";
import { zodErrorHandler } from "@/lib/zodErrorHandler";
import { toast } from "react-hot-toast";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Signup = () => {
  const router = useRouter();
  const submitHandler = async (formdata: FormData) => {
    const inputdata = {
      firstname: formdata.get("firstname"),
      lastname: formdata.get("Lastname"),
      email: formdata.get("email"),
      phoneno: formdata.get("phonenumber"),
      password: formdata.get("password"),
    };

    const res = RegisterSchema.safeParse(inputdata);

    if (!res.success) {
      const err = zodErrorHandler(res.error.issues);
      toast.error(err);
      return;
    }
    const response = await register(inputdata);
    if (!response?.success && response?.message) {
      toast.error(response?.message);
    } else {
      toast.success(response?.message);
      // formSubmitRef.current?.reset();
      router.replace("/auth/login");
    }
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 bg-sky-500"></div>
      <div className="w-1/2 bg-zinc-200 flex flex-col justify-center items-center">
        <div className="w-2/3 h-[500px] bg-white flex flex-col items-center rounded-3xl gap-10">
          <h1 className="text-2xl font-semibold text-sky-500 mt-10">Signup</h1>

          <form className="w-full flex flex-col gap-y-6" action={submitHandler}>
            <div className="flex justify-evenly">
              <label htmlFor="firstname" className="text-gray-500">
                Firstname
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="firstname"
                className="focus-visible:outline-sky-400 text-black bg-white"
              />
            </div>
            <div className="flex justify-evenly">
              <label htmlFor="Lastname" className="text-gray-500">
                Lastname
              </label>
              <input
                id="Lastname"
                name="Lastname"
                type="text"
                placeholder="Lastname"
                className="focus-visible:outline-sky-400 text-black bg-white"
              />
            </div>
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
                <label htmlFor="phonenumber" className="text-gray-500 pr-2">
                  phone no
                </label>
              </div>
              <input
                name="phonenumber"
                id="phonenumber"
                type="text"
                placeholder="phonenumber"
                className="focus-visible:outline-sky-400 text-black bg-white"
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
              Register
            </button>
            <div className="flex justify-evenly">
              <div className="self-end mr-3 text-sky-500">
                <Link href="/auth/login">already have an account</Link>
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

export default Signup;
