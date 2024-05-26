import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HouseZodSchemaType } from "@/schemas";

const HouseCard = ({ houseData }: { houseData: HouseZodSchemaType }) => {
  console.log(houseData);
  const { title, images, address, rent, bedrooms, deposit, _id, amenities } =houseData;
  const fullAddress = `No. ${address.doorNo}, ${address.street}, ${address.area}, ${address.city}-${address.pincode}, ${address.state}`;
  const amenitiesList = amenities.split(",").map((item) => item.trim());
  const tags: string[] = [...amenitiesList, `${bedrooms}BHK`];

  return (
    <div className="flex justify-center mb-6 px-4 sm:px-0">
      <Link href={`/needaprop/${_id}/viewhouse`}>
        <Card className="w-full sm:w-80 shadow-md overflow-hidden rounded-xl border border-blue-500 my-card transition-all duration-300 transform hover:scale-105 bg-sky-500 text-white">
          <div className="relative w-full h-48 border-b border-blue-500">
            <Image
              src={images[0] || "/logo.jpg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div>
                <div className="text-lg font-semibold">Rent</div>
                <div className="text-md">₹{rent}</div>
              </div>
              <div>
                <div className="text-lg font-semibold">Deposit</div>
                <div className="text-md">₹{deposit}</div>
              </div>
            </div>
            <div className="font-bold text-lg truncate">{title}</div>
            <p className="text-sm truncate">{fullAddress}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} className="bg-white text-blue-500 hover:text-white">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default HouseCard;
