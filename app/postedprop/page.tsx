import React from 'react'
import House from '@/models/house'
import { connectDB } from '@/lib/connectDB'
import Navbar from '@/components/navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import MyHouseFilter from '@/components/myhousefilter'

const MyHouse = async() => {
    await connectDB();
    const session= await getServerSession(authOptions)
    const Data = await House.find({
        creatorEmail: session?.user?.email,
    })
  return (
    <div>
        <Navbar/>
    <div><MyHouseFilter houseData={Data}/></div>
    </div>
  )
}

export default MyHouse