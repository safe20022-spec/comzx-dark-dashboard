import { ordersData } from '../data/mockData';
import { productsData } from '../data/mockData';
import type { Order, Product } from '../Types/index.ts';

const NETWORK_DELAY = 700;

/**
 * Helper function to retrieve products from LocalStorage.
 * If no products exist in LocalStorage, it populates it with the default mockData.
 */
const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem('products');
  
  // If nothing is stored, or the stored array is empty, load mockData
  if (!stored || JSON.parse(stored).length === 0) {
    localStorage.setItem('products', JSON.stringify(productsData));
    return productsData;
  }
  
  return JSON.parse(stored);
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ordersData), NETWORK_DELAY);
  });
};

/**
 * Fetches all products from LocalStorage instead of the static mockData file.
 */
export const fetchAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredProducts());
    }, NETWORK_DELAY);
  });
};

/**
 * Adds a new product to LocalStorage and returns the created product.
 */
export const createNewProduct = async (newProduct: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentProducts = getStoredProducts();
      const updatedProducts = [...currentProducts, newProduct];
      
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      resolve(newProduct);
    }, NETWORK_DELAY);
  });
};