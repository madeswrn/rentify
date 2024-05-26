import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import House from "@/models/house";
import User from "@/models/user";
import { connectDB } from "@/lib/connectDB";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { deleteHouseAction } from "@/actions/delete";
import { Pencil, Trash2 } from "lucide-react";

export default async function HouseDisplayScreen({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  await connectDB();
  const propertyData = await House.findById({
    _id: id,
  });
  if (!propertyData) {
    redirect("/myhouse");
  }
  const {
    title,
    images,
    rent,
    bedrooms,
    deposit,
    address,
    bathrooms,
    type,
    creatoremail,
    amenities,
    _id,
  } = propertyData;
  const userData = await User.find({
    email: creatoremail,
  });
  const customerData = await User.find({
    // email: session.user.email,
  });
  const amenitiesList = amenities.split(",").map((item: string) => item.trim());
  const user = JSON.stringify(userData);
  const customer = JSON.stringify(customerData);
  const FullAddress =
    "No." +
    address.doorNo +
    ", " +
    address.street +
    ", " +
    address.area +
    ", " +
    address.city +
    "-" +
    address.pincode +
    ", " +
    address.state;

  const handleDelete = async () => {
    "use server";
    try {
      var res = await deleteHouseAction(id);
      toast.success("Deleted Successfully");
      redirect("/postedprop");
      
    } catch (error) {
      toast.error("Error deleting property");
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
    <img src={propertyData.images[0]} className="w-full h-[400px] object-contain bg-sky-200" />
    <div className="flex flex-col w-full h-full bg-white">
      <div className="bg-sky-200 text-black rounded-lg shadow-lg p-7 text-center mt-6 w-2/3 self-center my-6">
        <h2 className="text-2xl font-bold mb-4 text-sky-500">Description</h2>
        <p>{propertyData.description}</p>
      </div>
      <div className=" w-full flex justify-evenly self-center mt-4 p-7">
        <div className="bg-sky-200 text-black rounded-lg shadow-lg p-7 text-center flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-sky-500">
            Property Description
          </h2>
          <div className="text-xl font-semibold">Location</div>
          <p>{propertyData.address.city}</p>
          <p>{propertyData.address.area}</p>
          <p>Doorno {propertyData.address.street}</p>
          <p>Street {propertyData.address.pincode}</p>
          <p>State {propertyData.address.state}</p>
          <div className="text-xl font-semibold">Things to Know</div>
          <p>no of Bedroom{propertyData.address.bedrooms}</p>
          <p>no of Bathroom {propertyData.bathrooms}</p>
          
        </div>
        <div className="bg-sky-200 text-black rounded-lg shadow-lg p-7 text-center w-[280px]">
          <h2 className="text-xl font-bold mb-4 text-sky-500">
            Rental Details
          </h2>
          <p> type{propertyData.type}</p>
          <p>rentamount {propertyData.rent}</p>
          <p>Advance{propertyData.deposit}</p>
          <Button className="border-none w-[140px] h-[50px] bg-sky-500 text-lg text-white hover:bg-sky-300 p-1 rounded-full self-center my-5">
              <Link href={`/postedprop/${id}/editmyhouse`}>
                Edit
              </Link>
            </Button>
            <form action={handleDelete}>
              <Button
                type="submit"
                className="border-none w-[140px] h-[50px] bg-sky-500 text-lg text-white hover:bg-sky-300 p-1 rounded-full self-center my-5"
              >
                Delete
              </Button>
            </form>
        </div>
      </div>
    </div>
  </>

  );
}
