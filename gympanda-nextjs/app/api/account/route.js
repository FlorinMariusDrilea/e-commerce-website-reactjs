import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { updateAccount } from "../../../db/db";

export async function PUT(req) {
  try {
    // Retrieve the session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const { name, birthday, sex } = await req.json();

    // Validate that at least one field is provided
    if (!name && !birthday && !sex) {
      return NextResponse.json(
        { message: "At least one field (name, birthday, sex) is required" },
        { status: 400 }
      );
    }

    // Get the user's email from the session (this assumes the session contains the user's email)
    const userEmail = session.user.email;

    // Attempt to update the account with the provided information
    const updatedUser = await updateAccount(userEmail, name, birthday, sex);

    // Handle the case where the update failed
    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update account" }, { status: 500 });
    }

    // Return a success response with the updated user data
    return NextResponse.json(
      { message: "Account updated successfully", user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    // Log the error for debugging
    console.error("❌ Update error:", error);

    // Return a response indicating an internal server error
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
