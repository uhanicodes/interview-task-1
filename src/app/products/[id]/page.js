"use client";

import { useState } from "react";
import React from "react";
import { useEffect } from "react";

export default function ProductDetails({ params }) {

  const { id } = React.use(params);

  console.log('Product ID:', typeof id);

  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // Fetch product details based on the ID
    fetch(`https://glore-bd-backend-node-mongo.vercel.app/api/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(body => {
        console.log('Product Details:', body);
        let details = body.data.find(product => product._id == id);
        console.log('Filtering for ID:', details);
        setProductDetails(details);
        console.log('Product Details set:', productDetails);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  return (
    <div className="m-4 md:m-8">
      <h1 className="text-xl md:text-2xl font-bold md:font-normal mb-2">
        {productDetails != null ? productDetails.name : 'Loading...'}
      </h1>
      {productDetails != null ? 
        <img
            src={productDetails?.images[0]?.secure_url || '/placeholder.png'}
            alt={productDetails?.name || 'Product Image'}
            width={400}
            height={400}></img> : <div>Loading...</div>}
    </div>
  );
}