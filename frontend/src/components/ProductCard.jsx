import React from 'react';
import '../styles/ProductCard.css'; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h4>{product.title}</h4>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Stock Status:</strong> {product.stock_status}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Tags:</strong> {product.tags?.join(', ') || 'N/A'}</p>
      <p><strong>On Sale:</strong> {product.on_sale ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ProductCard;
