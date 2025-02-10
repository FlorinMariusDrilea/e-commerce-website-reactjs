import React, { useEffect } from 'react';
import axios from"axios";
import { Link } from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        axios.get("http://localhost:3333/products")
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <div key={product.id} className='border rounded-lg p-4'>
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    <h2 className="text-xl font-bold mt-4">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className='font-bold text-xl mt-4'>${product.price.toFixed(2)}</p>
                    <Link to={`/product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 inline-block mt-4">View Product Details</Link>
                </div>
            ))}
        </div>
    );
};

export default ProductList;