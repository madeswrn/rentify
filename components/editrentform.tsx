"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card } from "./ui/card";
import { HouseZodSchemaType } from "@/schemas";
import { editHouseAction } from "@/actions/edithouse";
import { useSession } from "next-auth/react";
import { UploadButton } from "@/utils/uploadthing";
import { deleteImage } from "@/server/delete";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ImageUploadResponse {
  url: string;
}

const EditRentForm = ({
  userData,
}: {
  userData: HouseZodSchemaType | null;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [imageUploaded, setImageUploaded] = useState<string[]>(userData?.images || []);
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
    console.log(imageUploaded);
  }, [imageUploaded]);

  const deleteImageHandler = async (imageUrl: string) => {
    const deleteRes = await deleteImage(imageUrl);
    console.log(deleteRes);
    if (deleteRes?.success) {
      setImageUploaded((prev) => [
        ...prev.slice(0, imageUploaded.indexOf(imageUrl)),
        ...prev.slice(imageUploaded.indexOf(imageUrl) + 1),
      ]);
    }
  };

  async function handleSubmit(formData: FormData) {
    const inputData = {
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      address: {
        doorNo: formData.get("doorNo"),
        street: formData.get("street"),
        area: formData.get("area"),
        city: formData.get("city"),
        state: formData.get("state"),
        pincode: formData.get("pincode"),
      },
      rent: Number(formData.get("rent")),
      deposit: Number(formData.get("deposit")),
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      amenities: formData.get("amenities"),
      creatorEmail: userData?.creatorEmail,
      images: imageUploaded,
      _id: userData?._id,
    };
    console.log(inputData);
    const response = await editHouseAction(inputData);
    if (!response?.success && response?.message) {
      toast.error(response?.message);
    } else {
      toast.success(response?.message);
      router.replace("/postedprop");
    }
  }

  return (
    <Card className="w-[1000px] mx-auto p-14 my-6 bg-zinc-100 text-sky-500 shadow-lg border-sky-500 border-2">
      <h1 className="text-2xl font-bold mb-4">Edit House Details</h1>
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
            defaultValue={userData?.title || ""}
            placeholder="Enter the title of the property"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={userData?.description || ""}
            placeholder="Enter a detailed description of the property"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          ></textarea>
        </div>

        {/* Type */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            defaultValue={userData?.type || ""}
            placeholder="Enter the type of property (e.g., Apartment, House)"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
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
                defaultValue={userData?.address.doorNo || ""}
                placeholder="Enter the door number"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-md font-medium">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                defaultValue={userData?.address.street || ""}
                placeholder="Enter the street name"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-md font-medium">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                defaultValue={userData?.address.area || ""}
                placeholder="Enter the area"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-md font-medium">City</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={userData?.address.city || ""}
                placeholder="Enter the city"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-md font-medium">State</label>
              <input
                type="text"
                id="state"
                name="state"
                defaultValue={userData?.address.state || ""}
                placeholder="Enter the state"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-md font-medium">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                defaultValue={userData?.address.pincode || ""}
                placeholder="Enter the pincode"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
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
            defaultValue={userData?.rent || ""}
            placeholder="Enter the rent amount"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-md font-medium">Deposit</label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            defaultValue={userData?.deposit || ""}
            placeholder="Enter the deposit amount"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* Bedrooms and Bathrooms */}
        <div>
          <label className="block text-md font-medium">Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            defaultValue={userData?.bedrooms || ""}
            placeholder="Enter the number of bedrooms"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-md font-medium">Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            defaultValue={userData?.bathrooms || ""}
            placeholder="Enter the number of bathrooms"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-md font-medium">Amenities</label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            defaultValue={userData?.amenities || ""}
            placeholder="Enter the amenities"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
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
                className="w-full h-32 mb-4 rounded-md bg-center bg-cover"
                onClick={() => deleteImageHandler(imageUploaded[currentIndex])}
              ></div>
            )}
            <button
              type="button"
              className="p-1 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
              onClick={prevSlide}
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className="p-1 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
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
              allowedContent: "text-white text-sm",
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
            className="px-4 py-2 bg-sky-500 text-white rounded-md shadow-sm hover:bg-blue-200"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditRentForm;
