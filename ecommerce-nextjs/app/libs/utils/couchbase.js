import couchbase from 'couchbase';

let cluster;
let bucket;
let collection;

export async function connectToCouchbase() {
  if (cluster) return { collection };

  try {
    cluster = await couchbase.connect(`couchbase://${process.env.COUCHBASE_HOST}`, {
      username: process.env.COUCHBASE_USER,
      password: process.env.COUCHBASE_PASSWORD,
    });

    bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
    collection = bucket.defaultCollection();
    console.log("✅ Connected to Couchbase!");

    return { collection };
  } catch (error) {
    console.error("❌ Couchbase Connection Error:", error);
    throw new Error("Failed to connect to Couchbase");
  }
}