"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

function Product({ name, price, image }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <Image src={image} alt={name} width={200} height={200} />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-700">${price}</p>
    </div>
  );
}

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(body => {
        console.log('Products:', body);
        setProducts(body.data);
        console.log('Products set:', products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="m-4 md:m-8">
      <h2>Latest arrivals</h2>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {products.length > 0 ? products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Product
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.images[0]?.secure_url || '/placeholder.png'}
          />
          </Link>
        )): (
          <p className="text-gray-500">Loading products...</p>
        )}
      </div>
    </div>
  );
}