export type Category = 'Clothing' | 'Lingerie' | 'Sportswear' | 'Accessories';


export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  costPrice: number;
  image: string;
}


export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string; 
  items: OrderItem[];
}


export interface StatCardData {
  title: string;
  value: string;
  icon: 'revenue' | 'visitors' | 'orders' | 'profit'; 
  change?: string;     
  isPositive?: boolean; 
}


export interface SalesChartData {
  date: string;
  sales: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}
