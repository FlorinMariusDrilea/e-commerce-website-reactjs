const couchbase = require("couchbase");
const dotenv = require("dotenv");

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
  
// addProduct("p1", "Laptop", 999, "A high-performance laptop");
// deleteProduct("p1");

module.exports = connectDB;