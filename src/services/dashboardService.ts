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


export const deleteProduct = async (productId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Get current products from LocalStorage
      const stored = localStorage.getItem('products');
      const currentProducts: Product[] = stored ? JSON.parse(stored) : [];
      
      // 2. Filter out the target product
      const updatedProducts = currentProducts.filter(
        (product) => product.id !== productId
      );
      
      // 3. Save it back to LocalStorage
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      resolve(true);
    }, NETWORK_DELAY);
  });
};

/**
 * Updates an existing product in LocalStorage by its ID.
 */
export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem('products');
      const currentProducts: Product[] = stored ? JSON.parse(stored) : [];
      
      // Map through products and replace the updated one
      const updatedProducts = currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      resolve(updatedProduct);
    }, NETWORK_DELAY);
  });
};