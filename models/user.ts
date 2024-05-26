import mongoose, { Schema, Document, Model, models } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
  firstname: string;
  lastname: string;
  phoneno: string;
  email: string;
  password: string;
}

// Create a Schema corresponding to the document interface.
const userSchema: Schema<IUser> = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Model.
const User: Model<IUser> = models.User || mongoose.model<IUser>("User", userSchema);

export default User;
