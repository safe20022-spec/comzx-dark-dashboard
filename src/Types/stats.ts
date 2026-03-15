
export interface StatData {
  id: string;
  title: string;
  value: string;
  change: number; // e.g., 12 or -0.89
  isPositive: boolean;
  category: 'revenue' | 'visitors' | 'transactions' | 'products';
}