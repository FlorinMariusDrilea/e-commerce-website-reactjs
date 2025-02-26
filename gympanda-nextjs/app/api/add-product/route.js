import { addProduct } from "../../../db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.email !== "administrator@gmail.com") {
    return new Response(JSON.stringify({ error: "Forbidden: You are not allowed to add products." }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { name, price, description, quantity, image } = await req.json();

    if (!name || !price || !description) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await addProduct(name, price, description, quantity, image);

    return new Response(JSON.stringify({ message: "Product added successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
