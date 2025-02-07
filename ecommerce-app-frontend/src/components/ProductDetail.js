import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = React.useState(null);

    useEffect(() => {
        axios.get('https://localhost:8080/api/products/${id}')
        .then((response) => 
            setProduct(response.data))
        .catch((error) =>
            console.error('Error fetching data: ', error));
        }, [id]);
    
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto border rounded-lg p-4 shadow-lg">
        <img src={product.imageUrl} alt={product.name} className="h-64 w-full object-cover rounded-lg" />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p>{product.description}</p>
        <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
    </div>
    );
};

export default ProductDetail;