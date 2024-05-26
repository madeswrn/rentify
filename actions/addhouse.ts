"use server";

import { connectDB } from "@/lib/connectDB";
import House from "@/models/house";
import { houseZodSchema } from "@/schemas";

export async function createHouseAction(inputData: any) {
  console.log(inputData);
  const res = houseZodSchema.safeParse(inputData);

  if (!res.success) {
    // console.log(res.error.issues);
    return {
      message: res.error.issues[0].message,
      success: false,
      issues: res.error.issues,
    };
  }

  try {
    await connectDB();

    const houseCreated = await House.create(res.data);
    if (houseCreated) {
      return {
        message: "House Posted Successfully",
        success: true,
      };
    } else {
      return {
        message: "Failed to Create House",
        success: false,
      };
    }
  } catch (error) {
    // console.log(error)
    return {
      message: "Server Error",
      success: false,
    };
  }
}