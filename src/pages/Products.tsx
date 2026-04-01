import React from 'react';
import ProductsList from '../components/Products/ProductsList';
import { productsData } from '../data/mockData';

const Products = () => {
  // In real projects, you would fetch this data using useDashboardProducts()
  const products = productsData;

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Main Content Grid (Handled inside ProductsList) 
        The header title should be managed globally in the layout Header component
      */}
      <ProductsList products={products} />

    </div>
  );
};

export default Products;