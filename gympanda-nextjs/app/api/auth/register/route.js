import { connectDB } from "../../../../db/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const { collection } = await connectDB();
    const userId = `user::${email}`;

    // Check if user already exists
    try {
      await collection.get(userId);
      return new Response("User already exists", { status: 400 });
    } catch (error) {
      // User does not exist, continue registration
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to Couchbase
    await collection.insert(userId, {
      name,
      email,
      password: hashedPassword,
    });

    return new Response("User registered successfully", { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response("Server error", { status: 500 });
  }
}
