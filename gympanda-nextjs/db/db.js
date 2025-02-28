import { createClient } from "redis";
import bcrypt from "bcryptjs";
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

async function getProduct(id) {
  try {
    const client = await connectDB();
    const product = await client.hGetAll(`product:${id}`);

    if (!product || Object.keys(product).length === 0) {
      throw new Error("Product not found");
    }

    console.log("✅ Product retrieved successfully:", product);
    return product;
  } catch (error) {
    console.error("❌ Failed to retrieve product:", error);
    return null;
  }
}

async function getAllProducts() {
  try {
    const client = await connectDB();
    const keys = await client.keys('product:*');

    if (!keys || keys.length === 0) {
      throw new Error("No products found");
    }

    // Fetch all product data
    const products = await Promise.all(
      keys.map(async (key) => {
        const product = await client.hGetAll(key);
        return product;
      })
    );

    console.log("✅ Products retrieved successfully:", products);
    return products;
  } catch (error) {
    console.error("❌ Failed to retrieve products:", error);
    return null;
  }
}

async function getProductIdFromJson(productJson) {
  try {
    const client = await connectDB();
    const keys = await client.keys('product:*'); // Get all product keys

    // Loop through each product key to find a match based on the JSON data
    for (const key of keys) {
      const product = await client.hGetAll(key);
      
      if (
        product.name === productJson.name &&
        product.description === productJson.description &&
        product.price === productJson.price
      ) {
        const id = key.split(':')[1];
        return id;
      }
    }

    // If no matching product is found
    console.log("❌ Product not found");
    return null;
  } catch (error) {
    console.error("❌ Error retrieving product ID:", error);
    return null;
  }
}

// Add Product to Redis
async function addProduct(name, price, description, quantity, image) {
  try {
    const client = await connectDB();
    const id = uuidv4();
    const product = { id, name, price, description, quantity, image };
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
async function registerUser(email, name, password, birthday, sex) {
  try {
    const client = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user:${email}`; // Unique identifier for each user

    // Create a user object similar to the product structure
    const user = {
      email,
      name,
      password: hashedPassword,
      birthday,
      sex
    };

    // Store user details in a Redis hash with the userId
    await client.hSet(userId, user);
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
    return { 
      email: user.email, 
      name: user.name,
      birthday: user.birthday,
      sex: user.sex
    };
  } catch (error) {
    console.error("❌ Authentication failed:", error);
    return null;
  }
}

// Update Account Details
async function updateAccount(email, newName, newBirthday, newSex) {
  try {
    const client = await connectDB();
    const userKey = `user:${email}`;

    // Check if the user exists
    const user = await client.hGetAll(userKey);
    if (!user || Object.keys(user).length === 0) {
      throw new Error("User not found");
    }

    // Check if the new fields are different from the existing fields
    const isNameChanged = newName !== undefined && newName !== user.name;
    const isBirthdayChanged = newBirthday !== undefined && newBirthday !== user.birthday;
    const isSexChanged = newSex !== undefined && newSex !== user.sex;

    // If no fields are changed, return the existing user data
    if (!isNameChanged && !isBirthdayChanged && !isSexChanged) {
      console.log("✅ No changes detected. User details remain unchanged.");
      return { email, name: user.name, birthday: user.birthday, sex: user.sex };
    }

    // Prepare the fields to update
    const fieldsToUpdate = {};
    if (isNameChanged) fieldsToUpdate.name = newName;
    if (isBirthdayChanged) fieldsToUpdate.birthday = newBirthday;
    if (isSexChanged) fieldsToUpdate.sex = newSex;

    // Update user fields in Redis
    await client.hSet(userKey, fieldsToUpdate);

    console.log("✅ User details updated successfully!");
    return { email, name: newName || user.name, birthday: newBirthday || user.birthday, sex: newSex || user.sex };
  } catch (error) {
    console.error("❌ Failed to update user:", error.message || error);
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
  getProduct,
  getAllProducts,
  getProductIdFromJson,
  updateProduct,
  deleteProduct,
  registerUser,
  updateAccount,
  authenticateUser,
  testConnection,
};