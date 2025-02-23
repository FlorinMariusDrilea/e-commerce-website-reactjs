import { getUserCollection } from "../../../../db/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Get Couchbase collection
    const collection = await getUserCollection();
    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }
    const userId = `user::${email}`;
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
    console.error("❌ Registration error:", error);
    return new Response("Server error", { status: 500 });
  }
}
