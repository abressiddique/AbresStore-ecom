import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Check user authentication
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ensure the database is connected
    await connectToDB();

    // Find the user by Clerk ID
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Parse the request body for productId
    const { productId } = await req.json();

    if (!productId) {
      return new NextResponse("Product Id required", { status: 400 });
    }

    // Check if the product is already in the user's wishlist
    const isLiked = user.wishlist.includes(productId);

    if (isLiked) {
      // If already liked, remove from wishlist (dislike)
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      // Otherwise, add to wishlist (like)
      user.wishlist.push(productId);
    }

    // Save the user document
    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log("[wishlist_POST]", err);
    
    // Differentiate between MongoDB auth errors and other internal errors
    if (err.code === 8000) {
      return new NextResponse("Database Authentication Failed", { status: 500 });
    }
    
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
