import { connectDB } from "@/lib/connectDB";
import House from "@/models/house";
import { revalidatePath } from "next/cache";

export async function deleteHouseAction(id:string) {
    try {
      await connectDB();
      const propertyDeleted = await House.findOneAndDelete({
        _id: id,
      });
      if (!propertyDeleted) {
        return {
          message: "House not found",
          success: false,
        };
      } else {
        revalidatePath(`/myhouse`);
        return {
          message: "House deleted successfully",
          success: true,
        };
      }
    } catch (e) {
      return { message: "Failed to delete", success: false };
    }
  }
  