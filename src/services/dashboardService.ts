import { ordersData } from '../data/mockData';
import { productsData } from '../data/mockData';
import type { Order, Product } from '../Types/index.ts';

const NETWORK_DELAY = 700;


export const fetchAllOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ordersData), NETWORK_DELAY);
  });
};


export const fetchAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productsData), NETWORK_DELAY);
  });
};

