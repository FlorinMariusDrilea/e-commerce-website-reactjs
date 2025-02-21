const couchbase = require("couchbase");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

async function connectDB() {
  try {
    const cluster = await couchbase.connect(`couchbase://${process.env.COUCHBASE_HOST}`, {
      username: process.env.COUCHBASE_USER,
      password: process.env.COUCHBASE_PASSWORD,
    });

    const bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
    const collection = bucket.defaultCollection();

    console.log("✅ Connected to Couchbase");
    return { cluster, bucket, collection };
  } catch (error) {
    console.error("❌ Couchbase Connection Failed:", error);
  }
}

async function addProduct(id, name, price, description) {
    const { collection } = await connectDB();
    await collection.insert(id, { name, price, description });
    console.log("✅ Product added successfully!");
}

async function deleteProduct(id) {
    const { collection } = await connectDB();
    await collection.remove(id);
    console.log("🗑️ Product deleted!");
}

async function registerUser(email, name, password) {
    const { collection } = await connectDB();

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = `user::${email}`;
    await collection.insert(userId, { email, name, password: hashedPassword });
    console.log("✅ User registered successfully!");
}

async function authenticateUser(email, password) {
  try {
    const { collection } = await connectDB();
    
    const query = 'SELECT meta().id AS id, email, name, password FROM users WHERE email = $1 LIMIT 1;';
    const result = await collection.query(query, [email]);

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
    const cluster = await couchbase.connect("couchbase://localhost", {
      username: "Administrator",
      password: "password",
    });

    console.log("✅ Connected to Couchbase!");
  } catch (err) {
    console.error("❌ Couchbase connection failed:", err);
  }
}

testConnection();
  
// addProduct("p1", "Laptop", 999, "A high-performance laptop");
// deleteProduct("p1");

module.exports = { connectDB, addProduct, deleteProduct, registerUser, authenticateUser };