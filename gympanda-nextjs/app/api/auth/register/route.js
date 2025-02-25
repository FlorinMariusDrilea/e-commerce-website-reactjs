import bcrypt from "bcrypt";
import Redis from "ioredis";

// Create a Redis client using the provided Redis URL
const redisClient = new Redis("redis://default:zH4SCG9iIIasY6riA5H55a2mgRJ1xCeq@redis-18983.c2.eu-west-1-3.ec2.redns.redis-cloud.com:18983");

// Function to handle the response
function handleResponse(statusCode, message) {
  return new Response(JSON.stringify({ message }), { status: statusCode });
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const userId = `user:${email}`;

    // Check if user already exists by checking the Redis hash for the user ID
    const exists = await redisClient.exists(userId);
    if (exists) return handleResponse(409, "User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to Redis by setting the user data in a Redis hash
    await redisClient.hset(userId, "name", name, "email", email, "password", hashedPassword);

    return handleResponse(201, "User registered successfully");
  } catch (error) {
    console.error("❌ Registration error:", error);
    return handleResponse(500, "Server error");
  }
}
