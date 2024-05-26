import { houseZodSchema } from "@/schemas";
import mongoose, { Schema, models, model } from "mongoose";

// Define the TypeScript type for the house data
interface HouseZodSchemaType {
  title: string;
  description: string;
  type: string;
  address: {
    doorNo: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };
  rent: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string;
  images: string[];
  creatorEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema using the TypeScript type
const houseSchema = new Schema<HouseZodSchemaType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      doorNo: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    rent: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define the Mongoose model using the schema and the TypeScript type
const House = models.House ||mongoose.model<HouseZodSchemaType>("House", houseSchema);
export default House;