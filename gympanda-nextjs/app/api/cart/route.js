// app/api/cart/route.js
import { withIronSession } from "next-iron-session";
import { NextResponse } from "next/server";

// GET method
export const GET = async (req) => {
  const { session } = req;

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }

  session.cart = session.cart || [];
  return NextResponse.json({ cart: session.cart });
};

// POST method
export const POST = async (req) => {
  const { session } = req;

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }

  const { id, name, price } = await req.json();

  session.cart = session.cart || [];
  session.cart.push({ id, name, price });
  await session.save();

  return NextResponse.json({ message: "Added to cart", cart: session.cart }, { status: 201 });
};

// DELETE method
export const DELETE = async (req) => {
  const { session } = req;

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }

  const { id } = await req.json();

  session.cart = session.cart || [];
  session.cart = session.cart.filter((item) => item.id !== id);
  await session.save();

  return NextResponse.json({ message: "Removed from cart", cart: session.cart });
};

// Apply iron session middleware configuration
export const handler = withIronSession(
  {
    GET,
    POST,
    DELETE,
  },
  {
    password: process.env.SESSION_SECRET,
    cookieName: "cart_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
    },
  }
);
