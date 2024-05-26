
import House from "@/models/house";
import { HouseZodSchemaType } from "@/schemas";
import React from "react";

import { connectDB } from "@/lib/connectDB";
import Navbar from "@/components/navbar";
import EditRentForm from "@/components/editrentform";

const EditProperty = async ({params} :{params: {id :string}}) => {
    const {id} = params; 
    console.log(id);

  await connectDB();
  const userData: HouseZodSchemaType | null = await House.findOne({
    _id: id,
  });
  return <div className="bg-sky-200"><Navbar/>
  <div >
  <EditRentForm userData = {userData}/></div>;
  </div>
};

export default EditProperty;
