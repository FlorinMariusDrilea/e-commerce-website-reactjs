const couchbase = require("couchbase");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

// Store the Couchbase cluster and collections as cached variables
let cachedCluster = null;
let cachedProductsCollection = null;
let cachedUserCollection = null;

// Connect to Couchbase using environment variables
async function connectDB() {
  if (cachedCluster) {
    console.log("🔗 Using cached Couchbase connection");
    return cachedCluster;
  }

  try {
    const connectionString = process.env.COUCHBASE_HOST;
    const username = process.env.COUCHBASE_USER;
    const password = process.env.COUCHBASE_PASSWORD;

    console.log("🔗 Connecting to Couchbase using:", connectionString);

    cachedCluster = await couchbase.connect(connectionString, {
      username: username,
      password: password,
      configProfile: "wanDevelopment",
    });

    console.log("✅ Connected to Couchbase");
    return cachedCluster;
  } catch (error) {
    console.error("❌ Couchbase Connection Failed:", error);
    throw error;
  }
}

// Get Products Collection from Couchbase using environment variables
async function getProductsCollection() {
  if (cachedProductsCollection) {
    console.log("🔗 Using cached Products collection");
    return cachedProductsCollection;
  }

  const cluster = await connectDB();
  const bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
  const scope = bucket.scope(process.env.COUCHBASE_SCOPE);
  cachedProductsCollection = scope.collection(process.env.COUCHBASE_COLLECTION_PRODUCTS);

  return cachedProductsCollection;
}

// Get User Collection from Couchbase using environment variables
async function getUserCollection() {
  if (cachedUserCollection) {
    console.log("🔗 Using cached User collection");
    return cachedUserCollection;
  }

  const cluster = await connectDB();
  const bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
  const scope = bucket.scope(process.env.COUCHBASE_SCOPE);
  cachedUserCollection = scope.collection(process.env.COUCHBASE_COLLECTION_USERS);

  return cachedUserCollection;
}

// Add Product to the database
async function addProduct(name, price, description, quantity, image) {
  try {
    const collection = await getProductsCollection();

    // Generate a unique ID for the new product
    const id = uuidv4();

    // Insert product with the generated ID
    await collection.insert(id, { name, price, description, quantity, image });
    console.log("✅ Product added successfully with ID:", id);
  } catch (error) {
    console.error("❌ Failed to add product:", error);
  }
}

// Delete Product from the database
async function deleteProduct(id) {
  try {
    const collection = await getProductsCollection();
    await collection.remove(id);
    console.log("🗑️ Product deleted!");
  } catch (error) {
    console.error("❌ Failed to delete product:", error);
  }
}

// Update Product in the database
async function updateProduct(id, name, price, description, quantity, image) {
  try {
    const collection = await getProductsCollection();

    const updatedProduct = { name, price, description, quantity, image };

    await collection.upsert(id, updatedProduct);
    console.log("✅ Product updated successfully with ID:", id);
  } catch (error) {
    console.error("❌ Failed to update product:", error);
  }
}

// Register User function
async function registerUser(email, name, password) {
  try {
    const collection = await getUserCollection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user::${email}`;
    await collection.insert(userId, { email, name, password: hashedPassword });
    console.log("✅ User registered successfully!");
  } catch (error) {
    console.error("❌ Failed to register user:", error);
  }
}

// Authenticate User function
async function authenticateUser(email, password) {
  try {
    const cluster = await connectDB(); // Connect to the cluster
    const query = 'SELECT meta().id AS id, email, name, `password` FROM `ecommerce`.`_default`.`users` WHERE email = $1 LIMIT 1;';

    // Execute the N1QL query on the cluster
    const result = await cluster.query(query, { parameters: [email] });

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    console.log("✅ User authenticated successfully!");
    return { id: user.id, email: user.email, name: user.name };
  } catch (error) {
    console.error("❌ Authentication failed:", error);
    return null;
  }
}

async function testConnection() {
  try {
    console.log("🔍 Testing connection to Couchbase...");

    const cluster = await connectDB();

    if (cluster) {
      console.log("✅ Successfully connected to Couchbase!");
    } else {
      console.error("❌ Failed to connect to Couchbase. No cluster object returned.");
    }
  } catch (error) {
    console.error("❌ Connection test failed:", error);
  }
}

module.exports = {
  connectDB,
  getProductsCollection,
  getUserCollection,
  addProduct,
  updateProduct,
  deleteProduct,
  registerUser,
  authenticateUser,
};
