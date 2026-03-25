export type Category = 'Clothing' | 'Lingerie' | 'Sportswear' | 'Accessories';
export type DashboardTab = 'overview' | 'sales' | 'products';


export interface Product {
  id: string;
  name: string;
  price: number;
  costPrice: number;
  image: string;
  category: string;
  reviews: Review[]; 
}

export interface Review {
  id: string;
  userName: string;
  userImage?: string; 
  rating: number;    
  comment: string;
  date: string;      
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string; 
  day: string;
  items: OrderItem[];
  status: "completed" | "inprogress" | "new" | "cancelled";
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
