import bcrypt from "bcryptjs";
import Redis from "ioredis";

// Create a Redis client using the provided Redis URL
const redisClient = new Redis(process.env.REDIS_URL);

// Function to handle the response
function handleResponse(statusCode, message) {
  return new Response(JSON.stringify({ message }), { status: statusCode });
}

export async function POST(req) {
  try {
    const { name, email, password, birthday, sex } = await req.json();
    const userId = `user:${email}`;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return handleResponse(400, "All fields (name, email, password, birthday, sex) are required");
    }

    if (!birthday || !sex) {
      birthday = "";
      sex = "";
    }

    // Check if user already exists by checking the Redis hash for the user ID
    const exists = await redisClient.exists(userId);
    if (exists) return handleResponse(409, "User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to Redis
    await redisClient.hset(userId, {
      name,
      email,
      password: hashedPassword,
      birthday,
      sex,
    });

    return handleResponse(201, "User registered successfully");
  } catch (error) {
    console.error("❌ Registration error:", error);
    return handleResponse(500, "Server error");
  }
}
