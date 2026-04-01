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
  source?: "Social Media" | "Direct" | "Organic Search" | "Referral"; 
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

export interface DailySales {
  day: string;
  date: string;
  sales: number;
}
export interface CategorySalesData {
  name: string;
  value: number;
  color: string;
}


export interface ProductStat {
  productId: string;
  name: string;
  category: string;
  image: string;
  price: number;
  totalQty: number;    
  totalRevenue: number;
}

export interface DashboardStat {
  title: string;
  value: string;
  icon: 'revenue' | 'profit' | 'orders' | 'visitors';
}

export interface VerifiedReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  productImage: string;
}

export interface WeeklyComparisonData {
  name: string; 
  current: number;
  previous: number;
}

export interface TransactionStat extends CategorySalesData {
  percentage: number;
}

export interface AudienceDataPoint {
  day: string;    
  revenue: number; 
  orders: number;  
  profit: number;  
}

export interface FeedbackDataPoint {
  name: string;
  value: number;
  color: string;
}
export interface SourceDataPoint {
  source: string;
  percentage: number;
  color: string;
}
