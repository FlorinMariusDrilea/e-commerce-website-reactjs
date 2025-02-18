// pages/api/products.js
import { connectToCouchbase } from "../../libs/utils/couchbase"; // You can create a helper to manage connections
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  const { method } = req;
  const { collection } = await connectToCouchbase();  // Connect to the Couchbase cluster

  switch (method) {
    case "POST":
      try {
        const { id, name, price, description } = req.body;
        await collection.insert(id, { name, price, description });
        res.status(200).json({ message: "Product created successfully" });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
      }
      break;
    case "GET":
      if (req.query.id) {
        try {
          const result = await collection.get(req.query.id);
          res.status(200).json(result.value);
        } catch (error) {
          res.status(404).json({ error: 'Product not found' });
        }
      } else {
        try {
          const query = `SELECT meta().id AS id, * FROM ${process.env.COUCHBASE_BUCKET}`;
          const result = await cluster.query(query);
          const products = result.rows.map(row => ({ id: row.id, ...row[process.env.COUCHBASE_BUCKET] }));
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      break;
    case "PUT":
      try {
        const { name, price, description } = req.body;
        await collection.upsert(req.query.id, { name, price, description });
        res.status(200).json({ message: 'Product updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        await collection.remove(req.query.id);
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
