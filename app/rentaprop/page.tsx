
import Navbar from '@/components/navbar'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import RentForm from '@/components/rentform';
const Addhouse = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  return (
    <div className='bg-sky-200'>
      <Navbar/>
      <div className='flex felx-row justify-center py-3'>
      <RentForm/>
      </div>
    </div>
  )
}

export default Addhouse
