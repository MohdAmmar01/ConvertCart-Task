import React, { useEffect, useState } from 'react';
import { evaluateSegment, getAllProducts, ingestProducts } from './service/api';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [segmentApplied, setSegmentApplied] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      await ingestProducts();
      const data = await getAllProducts();
      setProducts(data);
      setSegmentApplied(false);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSegmentSubmit = async (input) => {
    setIsLoading(true);
    try {
      let rules = [];

      if (typeof input === 'string') {
        rules = input
          .split('\n')
          .map(line => line.trim())
          .filter(line => line);
      } else if (Array.isArray(input)) {
        rules = input.map(line => line.trim()).filter(line => line);
      }

      const data = rules.length > 0
        ? await evaluateSegment(rules)
        : await getAllProducts();

      setProducts(data);
      setSegmentApplied(rules.length > 0);
    } catch (error) {
      console.error('Error evaluating segment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="app-container">
      <Navbar handleSegmentSubmit={handleSegmentSubmit} />

      <h1 className="app-title">
        {segmentApplied ? 'Searched Products' : 'All Products'}
      </h1>

      {isLoading ? (
        <div className="loader-container">
          <ColorRing height="80" width="80" colors={["#111827"]} ariaLabel="loading" />
        </div>
      ) : (
        <div className="product-list">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
}

export default App;
