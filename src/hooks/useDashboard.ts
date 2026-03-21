import { useQuery } from '@tanstack/react-query';
import { fetchAllOrders } from '../services/dashboardService';
import { productsData } from '../data/mockData'; 
import type { Order, Category } from '../Types';


export const useDashboardData = () => {
  return useQuery({
    queryKey: ['orders-data'],
    queryFn: fetchAllOrders,
  });
};

// SalesChart Data
export const useDailySales = (orders: Order[] | undefined) => {
  if (!orders) return [];

  const grouped = orders.reduce((acc: Record<string, number>, order) => {
    const orderTotal = order.items.reduce((sum, item) => {
      const product = productsData.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    acc[order.date] = (acc[order.date] || 0) + orderTotal;
    return acc;
  }, {});

  return Object.keys(grouped).map(date => ({ 
    date, 
    sales: grouped[date] 
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// CategoryChart Data
export const useCategorySales = (orders: Order[] | undefined) => {
  if (!orders) return [];

  const colors: Record<Category, string> = { 
    Clothing: '#00CFE8', 
    Lingerie: '#F97316', 
    Sportswear: '#10B981',
    Accessories: '#FFB800' 
  };

  const grouped = orders.reduce((acc: Record<string, number>, order) => {
    order.items.forEach(item => {
      const product = productsData.find(p => p.id === item.productId);
      if (product) {
        acc[product.category] = (acc[product.category] || 0) + (product.price * item.quantity);
      }
    });
    return acc;
  }, {});

  return Object.keys(grouped).map(cat => ({ 
    name: cat, 
    value: grouped[cat], 
    color: colors[cat as Category] || '#8884d8' 
  }));
};

// Stat Cards Data
export const useDashboardStats = (orders: Order[] | undefined) => {
  if (!orders) return [];

  const todayDate = "2026-03-18";
  const todayOrders = orders.filter(o => o.date === todayDate);

  let todayRevenue = 0;
  let todayProfit = 0;

  todayOrders.forEach(order => {
    order.items.forEach(item => {
      const product = productsData.find(p => p.id === item.productId);
      if (product) {
        todayRevenue += product.price * item.quantity;
        todayProfit += (product.price - product.costPrice) * item.quantity;
      }
    });
  });

  return [
    { title: "Today's Revenue", value: `$${todayRevenue.toLocaleString()}`, icon: 'revenue' },
    { title: "Today's Profit", value: `$${todayProfit.toLocaleString()}`, icon: 'profit' },
    { title: "Today's Orders", value: todayOrders.length.toString(), icon: 'orders' },
    { title: "Today's Visitors", value: "1,240", icon: 'visitors' }
  ];
};


export interface ProductStat {
  productId: string;
  name: string;
  category: string;
  image: string;
  price: number;
  totalQty: number;    
  totalRevenue: number;
}
// Product Table Data
export const useTopProducts = (orders: Order[] | undefined): ProductStat[] => {
  if (!orders) return [];

  const productMap = orders.reduce((acc: Record<string, ProductStat>, order) => {
    order.items.forEach(item => {
      if (!acc[item.productId]) {
        const product = productsData.find(p => p.id === item.productId);
        if (product) {
          acc[item.productId] = { 
            ...product, 
            productId: item.productId,
            totalQty: 0, 
            totalRevenue: 0 
          };
        }
      }
      if (acc[item.productId]) {
        acc[item.productId].totalQty += item.quantity;
        acc[item.productId].totalRevenue += acc[item.productId].price * item.quantity;
      }
    });
    return acc;
  }, {});

  return Object.values(productMap).sort((a, b) => b.totalQty - a.totalQty);
};