const express = require('express');
const bodyParser = require('body-parser');
const couchbase = require('couchbase');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create a new Couchbase cluster
const cluster = new couchbase.Cluster(`couchbase://${process.env.COUCHBASE_HOST}`, {
    username: process.env.COUCHBASE_USER,
    password: process.env.COUCHBASE_PASSWORD
  });
const bucket = cluster.openBucket('your-bucket-name');
const collection = bucket.defaultCollection();

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
app.put('/products/:id', async (req, res) => {
    try {
        const result = await collection.get(req.params.id);
        res.json(result.value);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
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

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});