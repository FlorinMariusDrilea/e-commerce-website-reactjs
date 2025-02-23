const couchbase = require("couchbase");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const bcrypt = require("bcrypt");

async function connectDB() {
  try {
      const connectionString = `couchbase://${process.env.COUCHBASE_HOST}:11210`;
      console.log("🔗 Connecting to:", connectionString);

      const cluster = await couchbase.connect(connectionString, {
          username: process.env.COUCHBASE_USER,
          password: process.env.COUCHBASE_PASSWORD,
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
  
  const bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
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

async function addProduct(id, name, price, description) {
    try {
        const collection = await getProductsCollection();
        await collection.insert(id, { name, price, description });
        console.log("✅ Product added successfully!");
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

module.exports = { connectDB, getProductsCollection, getUserCollection, addProduct, deleteProduct, registerUser, authenticateUser };