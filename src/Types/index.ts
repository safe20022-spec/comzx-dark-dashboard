export type Category = 'Clothing' | 'Lingerie' | 'Sportswear' | 'Accessories';


export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  costPrice: number;
  image: string;
}

// الصورة  التي ارسلتها لك صورة التصميم لقد انتهينا من بناءها وناء مكوناتها واشتقاق البيانات لكل مكون ولكن صفحة dashboard عي في الواقع عبارة عن 3 مناظر يتم التبديل بينها بواسطة ازرار 
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
