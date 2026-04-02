import { useState, useMemo } from 'react';
import type { Product } from '../Types';
import { ordersData } from '../data/mockData';

// Defining the return type for sales data
export interface ProductSalesData {
  totalOrders: number;
  totalQuantitySold: number;
  totalEarnings: number;
}

export const useProducts = (products: Product[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'AVAILABLE' | 'DISABLED'>('ALL');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 500]);

  const counts = useMemo(() => {
    if (!products) return { all: 0, available: 0, disabled: 0 };
    return {
      all: products.length,
      available: products.filter(p => p.status === 'In Stock').length,
      disabled: products.filter(p => p.status === 'Canceled').length
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesTab = true;
      if (activeTab === 'AVAILABLE') matchesTab = product.status === 'In Stock';
      if (activeTab === 'DISABLED') matchesTab = product.status === 'Canceled';

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesTab && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, activeTab, selectedCategories, priceRange]);

  // New function added to calculate sales for a specific product dynamically
  const getProductSales = (productId: string): ProductSalesData => {
    const completedOrders = ordersData.filter(order => order.status === 'completed');
    
    let totalOrders = 0;
    let totalQuantitySold = 0;

    completedOrders.forEach(order => {
      const item = order.items.find(item => item.productId === productId);
      if (item) {
        totalOrders += 1;
        totalQuantitySold += item.quantity;
      }
    });

    const product = products?.find(p => p.id === productId);
    const totalEarnings = product ? totalQuantitySold * product.price : 0;

    return {
      totalOrders,
      totalQuantitySold,
      totalEarnings
    };
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    filteredProducts,
    counts,
    getProductSales // Exporting the new function
  };
};


export const useProductReviews = (product: Product | undefined) => {
  return useMemo(() => {
    if (!product || !product.reviews || product.reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        percentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        reviews: []
      };
    }

    const reviews = product.reviews;
    const totalReviews = reviews.length;
    
    // Calculate sum for average
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = parseFloat((sum / totalReviews).toFixed(1));

    // Calculate distribution (how many people gave 5, 4, etc.)
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      const r = review.rating as 1 | 2 | 3 | 4 | 5;
      if (distribution[r] !== undefined) {
        distribution[r] += 1;
      }
    });

    // Calculate percentages for the visual bars
    const percentages = {
      5: Math.round((distribution[5] / totalReviews) * 100),
      4: Math.round((distribution[4] / totalReviews) * 100),
      3: Math.round((distribution[3] / totalReviews) * 100),
      2: Math.round((distribution[2] / totalReviews) * 100),
      1: Math.round((distribution[1] / totalReviews) * 100),
    };

    return {
      averageRating,
      totalReviews,
      distribution,
      percentages,
      reviews
    };
  }, [product]);
};