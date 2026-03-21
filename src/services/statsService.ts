// src/services/statsService.ts
import type { StatData } from "../Types/indec";

export const fetchDashboardStats = async (): Promise<StatData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: '1', title: 'Today Revenue', value: '$2189', change: 12, isPositive: true, category: 'revenue' },
    { id: '2', title: 'Today Visitors', value: '512', change: 4, isPositive: true, category: 'visitors' },
    { id: '3', title: 'Today Transac', value: '325', change: 0.89, isPositive: false, category: 'transactions' },
    { id: '4', title: 'Total Product', value: '268', change: 2, isPositive: true, category: 'products' },
  ];
};