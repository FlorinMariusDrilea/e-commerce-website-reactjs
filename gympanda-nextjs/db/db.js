const couchbase = require("couchbase");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

async function connectDB() {
  try {
      const connectionString = `couchbase://localhost:11210`;
      console.log("🔗 Connecting to:", connectionString);

      const cluster = await couchbase.connect(connectionString, {
          username: "Administrator",
          password: "password",
      });

      console.log("✅ Connected to Couchbase");
      return cluster;
  } catch (error) {
      console.error("❌ Couchbase Connection Failed:", error);
      throw error;
  }
}

async function getProductsCollection() {
  const cluster = await connectDB();
  if (!cluster) {
    throw new Error("Cluster connection failed. Cannot access bucket or collection.");
  }
  
  const bucket = cluster.bucket("ecommerce");
  const scope = bucket.scope('_default');
  const collection = scope.collection('products');

  return collection;
}

async function getUserCollection() {
  try {
    const cluster = await connectDB();
    if (!cluster) throw new Error("Cluster connection failed. Cannot access bucket or collection.");

    const bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
    const scope = bucket.scope('_default');
    const collection = scope.collection('users');

    console.log("✅ Collection retrieved successfully!");
    return collection;
  } catch (error) {
    console.error("❌ Failed to retrieve collection:", error);
    throw error;
  }
}

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

async function deleteProduct(id) {
    try {
        const collection = await getProductsCollection();
        await collection.remove(id);
        console.log("🗑️ Product deleted!");
    } catch (error) {
        console.error("❌ Failed to delete product:", error);
    }
}

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


async function registerUser(email, name, password) {
    try {
        const collection = await getProductsCollection();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = `user::${email}`;
        await collection.insert(userId, { email, name, password: hashedPassword });
        console.log("✅ User registered successfully!");
    } catch (error) {
        console.error("❌ Failed to register user:", error);
    }
}

async function authenticateUser(email, password) {
  try {
    const cluster = await connectDB();  // Connect to the cluster
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

// addProduct("Leggings", 25, "Description for leggings", 10, "images/leggings.webp");
// addProduct("Bra", 10, "Description for bra", 0, "images/bra.webp");
// addProduct("Socks", 5, "Description for socks", 2, "images/socks.webp");

// deleteProduct("4d1a5399-d997-4c7a-a47b-31e6a4fd7cbc");
// deleteProduct("e0e25d17-6cf4-45c1-aaab-af1904696f1e");
// deleteProduct("e5b64cca-55c3-49d5-8ce8-7bedb5f2cb7d");

module.exports = { connectDB, getProductsCollection, getUserCollection, addProduct, updateProduct, deleteProduct, registerUser, authenticateUser };