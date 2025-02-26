// File: app/api/product/[id]/route.js

import { NextResponse } from 'next/server';
import { getProduct } from '../../../../db/db';

// Fetch product by ID
export async function GET(req, { params }) {
  // Check if 'params' or 'id' is available
  if (!params || !params.id) {
    return NextResponse.json(
      { message: 'Product ID is required' },
      { status: 400 }
    );
  }

  const { id } = params;  // Directly use params here (No need for 'await')

  try {
    // Fetch product from your data source
    const product = await getProduct(id);

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // If product is found, return it in the response
    return NextResponse.json({ message: 'Product found', data: product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}