const express = require('express');
const bodyParser = require('body-parser');
const couchbase = require('couchbase');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Function to establish Couchbase connection
async function connectToCouchbase() {
    try {
        cluster = await couchbase.connect(`couchbase://${process.env.COUCHBASE_HOST}`, {
            username: process.env.COUCHBASE_USER,
            password: process.env.COUCHBASE_PASSWORD
        });

        bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
        collection = bucket.defaultCollection();

        console.log("✅ Connected to Couchbase!");
    } catch (error) {
        console.error("❌ Couchbase Connection Error:", error);
        process.exit(1);
    }
}

connectToCouchbase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.get("/", (req, res) => {
    res.send("App running....!");
});

// REST API endpoint to create a product
app.post('/products', async (req, res) => {
    try {
        const { id, name, price, description } = req.body;
        await collection.insert(id, { name, price, description });
        res.json({ message: "Product created successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// REST API endpoint to get product
app.get('/products/:id', async (req, res) => {
    try {
        const result = await collection.get(req.params.id);
        res.json(result.value);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
});

// REST API endpoint to get all products
app.get('/products', async (req, res) => {
    try {
        const query = 'SELECT meta().id AS id, * FROM ' + process.env.COUCHBASE_BUCKET;
        const result = await cluster.query(query);
         // Map over the result rows to format the response
         const products = result.rows.map((row) => ({
            id: row.id, // Document ID
            ...row[process.env.COUCHBASE_BUCKET] // Spread the product fields (name, price, etc.)
        }));
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REST API endpoint to update product
app.put('/products/:id', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        await collection.upsert(req.params.id, { name, price, description });
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REST API endpoint to delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        await collection.remove(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});