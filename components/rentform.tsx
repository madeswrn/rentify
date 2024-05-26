"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { UploadButton } from "@/utils/uploadthing";
import { deleteImage } from "@/server/delete";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { createHouseAction } from "@/actions/addhouse";

interface ImageUploadResponse {
  url: string;
}

const RentForm: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [imageUploaded, setImageUploaded] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUploaded.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === imageUploaded.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    // console.log(imageUploaded);
  }, [imageUploaded]);

  const deleteImageHandler = async (imageUrl: string) => {
    const deleteRes = await deleteImage(imageUrl);
    // console.log(deleteRes);
    if (deleteRes?.success) {
      setImageUploaded((prev) => [
        ...prev.slice(0, imageUploaded.indexOf(imageUrl)),
        ...prev.slice(imageUploaded.indexOf(imageUrl) + 1),
      ]);
    }
  };

  async function handleSubmit(formData: FormData) {
    const inputData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      address: {
        doorNo: formData.get("doorNo") as string,
        street: formData.get("street") as string,
        area: formData.get("area") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        pincode: formData.get("pincode") as string,
      },
      rent: Number(formData.get("rent")),
      deposit: Number(formData.get("deposit")),
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      amenities: formData.get("amenities") as string,
      images: imageUploaded,
      creatorEmail: session?.user?.email,
    };

    // console.log(inputData);

    const response = await createHouseAction(inputData);
    if (!response?.success && response?.message) {
      toast.error(response?.message);
    } else {
      toast.success(response?.message);
      router.replace("/postedprop");
    }
  }

  return (
    <Card className="w-[1000px] mx-auto p-14 my-6 bg-zinc-100 text-sky-500 shadow-lg border-sky-500 border-2">
      <h1 className="text-2xl font-bold mb-4 ">Create a New Prop</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget as HTMLFormElement);
          handleSubmit(formData);
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {/* Title */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title of the property"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a detailed description of the property"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          ></textarea>
        </div>

        {/* Type */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Enter the type of property (e.g., Apartment, House)"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-md my-4 font-medium">Address:</label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-md font-medium">Door No</label>
              <input
                type="text"
                id="doorNo"
                name="doorNo"
                placeholder="Enter the door number"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
              />
            </div>
            <div>
              <label className="block text-md font-medium">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Enter the street name"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
              />
            </div>
            <div>
              <label className="block text-md font-medium">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                placeholder="Enter the area"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
              />
            </div>
            <div>
              <label className="block text-md font-medium">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter the city"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
              />
            </div>
            <div>
              <label className="block text-md font-medium">State</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter the state"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
              />
            </div>
            <div>
              <label className="block text-md font-medium">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Enter the pincode"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Rent and Deposit */}
        <div>
          <label className="block text-md font-medium">Rent</label>
          <input
            type="number"
            id="rent"
            name="rent"
            placeholder="Enter the rent amount"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          />
        </div>
        <div>
          <label className="block text-md font-medium">Deposit</label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            placeholder="Enter the deposit amount"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          />
        </div>

        {/* Bedrooms and Bathrooms */}
        <div>
          <label className="block text-md font-medium">Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            placeholder="Enter the number of bedrooms"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          />
        </div>
        <div>
          <label className="block text-md font-medium">Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            placeholder="Enter the number of bathrooms"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Amenities</label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            placeholder="Enter the amenities"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-blue-50 border-blue-300"
          />
        </div>

        {/* Images */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Images</label>
          <div className="flex items-center space-x-4">
            {imageUploaded.length > 0 && (
              <div
                style={{
                  backgroundImage: `url(${imageUploaded[currentIndex]})`,
                }}
                className="w-full h-32 mb-4 rounded-md bg-center bg-cover cursor-pointer border border-blue-300"
                onClick={() => deleteImageHandler(imageUploaded[currentIndex])}
              ></div>
            )}
            <button
              type="button"
              className="p-1 bg-blue-300 rounded-full hover:bg-blue-400"
              onClick={prevSlide}
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className="p-1 bg-blue-300 rounded-full hover:bg-blue-400"
              onClick={nextSlide}
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
          <UploadButton
            endpoint="multiFileUploader"
            onClientUploadComplete={(res: ImageUploadResponse[]) => {
              setImageUploaded((prevImages) => [
                ...prevImages,
                ...res.map((file) => file.url),
              ]);
              // console.log("Upload Completed");
            }}
            appearance={{
              button: "bg-blue-500 text-white py-2 px-4 rounded mt-4",
              container: "w-full flex justify-center",
              allowedContent: "text-blue-500 text-sm",
            }}
            onUploadError={(error: Error) => {
              // console.log(`ERROR! ${error.message}`);
            }}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RentForm;
