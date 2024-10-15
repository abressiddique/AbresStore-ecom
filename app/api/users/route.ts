import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    // Log the retrieved userId for debugging
    console.log("User ID:", userId);

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await connectToDB();

    let user = await User.findOne({ clerkId: userId });

    // Log the retrieved user for debugging
    console.log("Existing User:", user);

    // When the user signs in for the first time, immediately create a new user for them
    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
      console.log("New User Created:", user); // Log the new user creation
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
