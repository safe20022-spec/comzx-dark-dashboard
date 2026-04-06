import React, { useState, useEffect } from 'react';
import ProductsList from '../components/Products/ProductsList';
import { fetchAllProducts } from '../services/dashboardService';
import type { Product } from '../Types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetches data directly from LocalStorage via the API function
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // Runs once when the page is mounted

  if (loading) {
    return (
      <div className="p-6 text-white text-center font-bold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Renders the list with the dynamically fetched products state */}
      <ProductsList products={products} />
    </div>
  );
};

export default Products;