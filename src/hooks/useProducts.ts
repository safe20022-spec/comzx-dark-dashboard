import { useState, useMemo } from 'react';
import type { Product } from '../Types';

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

      // Strict match with exact array values
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesTab && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, activeTab, selectedCategories, priceRange]);

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
    counts
  };
};