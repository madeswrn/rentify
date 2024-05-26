import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI!;
  try {
    await mongoose
      .connect(uri)
      .then(() => {
        console.log(`MongoDB Connected`);
      })
      .catch((err: any) => {
        console.error("Error connecting to mongo", err);
      });
  } catch (error: any) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose
      .disconnect()
      .then(() => console.log("DB disconnected Successfully"))
      .catch((err: { message: any; }) => console.log(err.message));
  } catch (error: any) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err: string) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
    process.exit(1);
  }
}
export { connectDB, disconnectDB };
