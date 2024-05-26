"use client";
import React from "react";
import { signOut,useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  const { status } = useSession();
  //const { status, data: session } = useSession();
  return (
    <div className="sticky top-0 flex w-full h-[80px] justify-between items-center border-b-2 border-sky-500 bg-white z-20">
      <div className="flex justify-evenly w-1/2">
        <Image src={"/ReNTIFY.svg"} width={100} height={100} alt=""></Image>
        <div className="text-xl text-gray-500 hover:scale-[1.1] transition transform-1s hover:text-sky-500 font-semibold cursor-pointer">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="text-xl text-gray-500 hover:scale-[1.1] transition transform-1s hover:text-sky-500 font-semibold">
          <Link href={"/rentaprop"}>Rent Prop</Link>
        </div>
        <div className="text-xl text-gray-500 hover:scale-[1.1] transition transform-1s hover:text-sky-500 font-semibold cursor-pointer">
          <Link href={"/postedprop"}>Posted Prop</Link>
        </div>
        <div className="text-xl text-gray-500 hover:scale-[1.1] transition transform-1s hover:text-sky-500 font-semibold cursor-pointer">
          <Link href={"/needaprop"}>Need A Rent</Link>
        </div>
        
      </div>

      {/* <div className="text-xl border-2 border-transparent w-[120px] h-[50px] bg-sky-500 mr-10 text-center pt-2 rounded-full hover:text-sky-500 hover:bg-white hover:border-sky-300">
        login
      </div> */}
      {status == "authenticated" && (
            
            <Button  className="text-xl border-2 border-transparent w-[120px] h-[50px] bg-sky-500 mr-10 text-center pt-2 rounded-full hover:text-sky-500 hover:bg-white hover:border-sky-300" onClick={()=>signOut({ callbackUrl: '/', redirect:true })}>Sign out</Button>
            
         
        )}
        {status == "unauthenticated" && (
          <Link href="/auth/login" passHref>
            <Button  className="text-xl border-2 border-transparent w-[120px] h-[50px] bg-sky-500 mr-10 text-center pt-2 rounded-full hover:text-sky-500 hover:bg-white hover:border-sky-300">Sign in</Button>
          </Link>
        )}
    </div>
  );
};

export default Navbar;