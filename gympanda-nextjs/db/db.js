import { createClient } from "redis";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

let redisClient = null;

async function connectDB() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (err) => console.error("❌ Redis Connection Failed:", err));
    await redisClient.connect();
    console.log("✅ Connected to Redis");
  } else {
    console.log("🔗 Using cached Redis connection");
  }
  return redisClient;
}

// Add Product to Redis
async function addProduct(name, price, description, quantity, image) {
  try {
    const client = await connectDB();
    const id = uuidv4();
    const product = { name, price, description, quantity, image };
    await client.hSet(`product:${id}`, product);
    console.log("✅ Product added successfully with ID:", id);
  } catch (error) {
    console.error("❌ Failed to add product:", error);
  }
}

// Delete Product from Redis
async function deleteProduct(id) {
  try {
    const client = await connectDB();
    await client.del(`product:${id}`);
    console.log("🗑️ Product deleted!");
  } catch (error) {
    console.error("❌ Failed to delete product:", error);
  }
}

// Update Product in Redis
async function updateProduct(id, name, price, description, quantity, image) {
  try {
    const client = await connectDB();
    const updatedProduct = { name, price, description, quantity, image };
    await client.hSet(`product:${id}`, updatedProduct);
    console.log("✅ Product updated successfully with ID:", id);
  } catch (error) {
    console.error("❌ Failed to update product:", error);
  }
}

// Register User in Redis
async function registerUser(email, name, password) {
  try {
    const client = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user:${email}`;
    await client.hSet(userId, { email, name, password: hashedPassword });
    console.log("✅ User registered successfully!");
  } catch (error) {
    console.error("❌ Failed to register user:", error);
  }
}

// Authenticate User from Redis
async function authenticateUser(email, password) {
  try {
    const client = await connectDB();
    const user = await client.hGetAll(`user:${email}`);

    if (!user || Object.keys(user).length === 0) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    console.log("✅ User authenticated successfully!");
    return { email: user.email, name: user.name };
  } catch (error) {
    console.error("❌ Authentication failed:", error);
    return null;
  }
}

// Test Redis Connection
async function testConnection() {
  try {
    console.log("🔍 Testing connection to Redis...");
    await connectDB();
    console.log("✅ Successfully connected to Redis!");
  } catch (error) {
    console.error("❌ Connection test failed:", error);
  }
}

export {
  connectDB,
  addProduct,
  updateProduct,
  deleteProduct,
  registerUser,
  authenticateUser,
  testConnection,
};