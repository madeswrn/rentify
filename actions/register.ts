"use server";
import { connectDB } from "@/lib/connectDB";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { zodErrorHandler } from "@/lib/zodErrorHandler";
export const register = async (values: any) => {
    const result = RegisterSchema.safeParse(values);
    if (!result.success) {
      const errorMessage = zodErrorHandler(result.error.issues);
      return {
        message: errorMessage,
      };
    }
  
    try {
      const { email, password, firstname, lastname, phoneno } = result.data;
      await connectDB();
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return {
          message: "This email already exists, please sign in",
          success: false,
        };
      } else {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password!, salt);
        const userData = {
          email: email,
          firstname: firstname,
          lastname: lastname,
          phoneno: phoneno,
          password: hashedPassword,
        };
        const userCreated = await User.create(userData);
        if (userCreated) {
          return {
            message: "User created successfully",
            success: true,
          };
        } else {
          return {
            message: "This email already exists, please sign in",
            success: false,
          };
        }
      }
    } catch (e) {
      return { message: "Failed to create", success: false };
    }
  }