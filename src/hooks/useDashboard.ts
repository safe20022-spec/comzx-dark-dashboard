import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllOrders, fetchAllProducts } from '../services/dashboardService';
import type { Order, SourceDataPoint, FeedbackDataPoint, AudienceDataPoint, TransactionStat, Category, Product, DailySales, WeeklyComparisonData, CategorySalesData, ProductStat, DashboardStat, VerifiedReview } from '../Types';


export const useDashboardData = () => {
  return useQuery({
    queryKey: ['orders-data'],
    queryFn: fetchAllOrders,
  });
};

export const useDashboardProducts = () => {
  return useQuery({
    queryKey: ['products-data'],
    queryFn: fetchAllProducts,
  });
};

// SalesChart Data
export const useDailySales = (
  orders: Order[] | undefined, 
  products: Product[] | undefined
): DailySales[] => {
  return useMemo((): DailySales[] => {
    if (!orders || !products) return [];

    const salesMap: { [key: string]: { sales: number; day: string } } = {};

    orders.forEach((order) => {
      if (order.status !== 'completed') return;

      const dateKey = order.date;
      if (!salesMap[dateKey]) {
        salesMap[dateKey] = { sales: 0, day: order.day };
      }
      
      const orderTotal = order.items.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);

      salesMap[dateKey].sales += orderTotal;
    });

    return Object.keys(salesMap).map((date): DailySales => ({
      date: date,
      day: salesMap[date].day,
      sales: salesMap[date].sales,
    }));

  }, [orders, products]);
};

// Category Chart Data
export const useCategorySales = (
  orders: Order[] | undefined, 
  products: Product[] | undefined
): CategorySalesData[] => { 
  
  return useMemo((): CategorySalesData[] => { 
    if (!orders || !products) return [];

    const colors: Record<Category, string> = { 
      Clothing: '#00CFE8', 
      Lingerie: '#F97316', 
      Sportswear: '#10B981',
      Accessories: '#FFB800' 
    };

    const grouped = orders.reduce((acc: Record<string, number>, order) => {
      if (order.status !== 'completed') return acc;

      order.items.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          acc[product.category] = (acc[product.category] || 0) + (product.price * item.quantity);
        }
      });
      return acc;
    }, {});

    return Object.keys(grouped).map((cat): CategorySalesData => ({ 
      name: cat, 
      value: grouped[cat], 
      color: colors[cat as Category] || '#8884d8' 
    }));
  }, [orders, products]);
};

// Stats Card Data
export const useDashboardStats = (
  orders: Order[] | undefined, 
  products: Product[] | undefined
): DashboardStat[] => {
  
  return useMemo((): DashboardStat[] => {
    if (!orders || !products) return [];

    const todayDate = "2026-03-18";
    const todayCompletedOrders = orders.filter(
      (o) => o.date === todayDate && o.status === "completed"
    );

    let todayRevenue = 0;
    let todayProfit = 0;

    todayCompletedOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (product) {
          todayRevenue += product.price * item.quantity;
          todayProfit += (product.price - product.costPrice) * item.quantity;
        }
      });
    });

    return [
      { 
        title: "Today's Revenue", 
        value: `$${todayRevenue.toLocaleString()}`, 
        icon: 'revenue' 
      },
      { 
        title: "Today's Profit", 
        value: `$${todayProfit.toLocaleString()}`, 
        icon: 'profit' 
      },
      { 
        title: "Today's Orders", 
        value: todayCompletedOrders.length.toString(), 
        icon: 'orders' 
      },
      { 
        title: "Today's Visitors", 
        value: "1,240", 
        icon: 'visitors' 
      }
    ];
  }, [orders, products]);
};

// Product Table Data
export const useTopProducts = (orders: Order[] | undefined, products: Product[] | undefined): ProductStat[] => {
  return useMemo(():ProductStat[]  => {
    if (!orders || !products) return [];

    const productMap = orders.reduce((acc: Record<string, ProductStat>, order) => {
      if (order.status !== 'completed') return acc;

      order.items.forEach(item => {
        if (!acc[item.productId]) {
          const product = products.find(p => p.id === item.productId);
          if (product) {
            acc[item.productId] = { 
              productId: item.productId,
              name: product.name,
              category: product.category,
              image: product.image,
              price: product.price,
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
  }, [orders, products]);
};
// Reviews Table Data
export const useVerifiedReviews = (
  orders: Order[] | undefined, 
  products: Product[] | undefined
): VerifiedReview[] => {
  
  return useMemo((): VerifiedReview[] => {
    if (!orders || !products) return [];

    const completedProductIds = new Set();
    orders.forEach(order => {
      if (order.status === 'completed') {
        order.items.forEach(item => completedProductIds.add(item.productId));
      }
    });

    const verifiedReviews = products.flatMap((product): VerifiedReview[] => {
      if (!completedProductIds.has(product.id)) return [];

      return (product.reviews || []).map((review): VerifiedReview => ({
        ...review,
        productName: product.name,
        productImage: product.image
      }));
    });

    return verifiedReviews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [orders, products]);
};


// SalesComparisonChart Data
export const useWeeklyComparison = (dailySales: DailySales[] | undefined): WeeklyComparisonData[] => {
  return useMemo((): WeeklyComparisonData[] => {
    
    if (!dailySales) return []; 

    return dailySales.map((item): WeeklyComparisonData => ({
      name: item.day,
      current: item.sales,
      previous: item.sales * 0.85, 
    }));
  }, [dailySales]);
};

// TransactionsCard Data
export const useTransactionStats = (categorySales: CategorySalesData[]): TransactionStat[] => {
  return useMemo((): TransactionStat[] => {
    const targetCategories = ['Clothing', 'Lingerie'];

    const targetStats = categorySales.filter(cat => targetCategories.includes(cat.name));
    const otherStats = categorySales.filter(cat => !targetCategories.includes(cat.name));
    
    
    const otherTotal = otherStats.reduce((sum, cat) => sum + cat.value, 0);

    
    const finalCategories = [
      ...targetStats.map(cat => ({ 
        name: cat.name, 
        value: cat.value, 
        color: cat.name === 'Clothing' ? '#00CFE8' : '#F97316' 
      })),
      { name: 'Other', value: otherTotal, color: '#6B7280' }
    ];

    
    const totalAll = finalCategories.reduce((sum, cat) => sum + cat.value, 0);

    
    return finalCategories.map((cat): TransactionStat => ({
      ...cat,
      percentage: totalAll > 0 ? (cat.value / totalAll) * 100 : 0
    }));
  }, [categorySales]); 
};



export const useTotalStats = (
  orders: Order[] | undefined, 
  products: Product[] | undefined
): DashboardStat[] => {
  
  return useMemo((): DashboardStat[] => {
    if (!orders || !products) return [];

    const completedOrders = orders.filter((o) => o.status === "completed");

    let totalRevenue = 0;
    let totalProfit = 0;

    completedOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (product) {
          totalRevenue += product.price * item.quantity;
          totalProfit += (product.price - product.costPrice) * item.quantity;
        }
      });
    });

    return [
      { 
        title: "Total Revenue", 
        value: `$${totalRevenue.toLocaleString()}`, 
        icon: 'revenue' 
      },
      { 
        title: "Total Profit", 
        value: `$${totalProfit.toLocaleString()}`, 
        icon: 'profit' 
      },
      { 
        title: "Total Orders", 
        value: completedOrders.length.toLocaleString(), 
        icon: 'orders' 
      },
      { 
        title: "Total Visitors", 
        value: "45,240", 
        icon: 'visitors' 
      }
    ];
  }, [orders, products]); 
};



export const useWeeklyProfitData = (
  orders: Order[] | undefined, 
  products: Product[] | undefined
): DailySales[] => {
  
  return useMemo((): DailySales[] => {
    if (!orders || !products) return [];

    const completedOrders = orders.filter((o) => o.status === "completed");

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    const weeklyProfit: DailySales[] = daysOfWeek.map(day => ({
      day: day,
      date: "", 
      sales: 0 
    }));

    completedOrders.forEach((order) => {
      const orderDay = order.day;
      
      const dayIndex = weeklyProfit.findIndex(d => d.day === orderDay);
      
      if (dayIndex !== -1) {
        let orderProfit = 0;
        
        order.items.forEach((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (product) {
            orderProfit += (product.price - product.costPrice) * item.quantity;
          }
        });
        
        weeklyProfit[dayIndex].sales += orderProfit;
      }
    });

    return weeklyProfit;
  }, [orders, products]); 
};




export const useAudienceOverviewData = (
  orders: Order[] | undefined, 
  products: Product[] | undefined
): AudienceDataPoint[] => {
  
  return useMemo((): AudienceDataPoint[] => {
    if (!orders || !products) return [];

    const completedOrders = orders.filter((o) => o.status === "completed");

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    const weeklyData: AudienceDataPoint[] = daysOfWeek.map(day => ({
      day,
      revenue: 0,
      orders: 0,
      profit: 0
    }));

    completedOrders.forEach((order) => {
      const orderDay = order.day; 
      const dayIndex = weeklyData.findIndex(d => d.day === orderDay);
      
      if (dayIndex !== -1) {
        let orderRevenue = 0;
        let orderProfit = 0;
        
        order.items.forEach((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (product) {
            orderRevenue += product.price * item.quantity;
            orderProfit += (product.price - product.costPrice) * item.quantity;
          }
        });
        
        weeklyData[dayIndex].revenue += orderRevenue;
        weeklyData[dayIndex].profit += orderProfit;
        weeklyData[dayIndex].orders += 1; 
      }
    });

    return weeklyData;
  }, [orders, products]);
};




export const useFeedbackData = (products: Product[] | undefined): FeedbackDataPoint[] => {
  return useMemo((): FeedbackDataPoint[] => {
    if (!products) return [];

    let positive = 0;
    let neutral = 0;
    let negative = 0;

    products.forEach((product) => {
      if (product.reviews && Array.isArray(product.reviews)) {
        product.reviews.forEach((review) => {
          if (review.rating >= 4) {
            positive++;
          } else if (review.rating === 3) {
            neutral++;
          } else if (review.rating <= 2) {
            negative++;
          }
        });
      }
    });

    const total = positive + neutral + negative;

    if (total === 0) {
      return [
        { name: 'Positive', value: 0, color: '#00E5FF' },
        { name: 'Neutral', value: 0, color: '#FFB300' },
        { name: 'Negative', value: 0, color: '#FF3D00' },
      ];
    }

    return [
      { name: 'Positive', value: Math.round((positive / total) * 100), color: '#00E5FF' },
      { name: 'Neutral', value: Math.round((neutral / total) * 100), color: '#FFB300' },
      { name: 'Negative', value: Math.round((negative / total) * 100), color: '#FF3D00' },
    ];
  }, [products]);
};

export const useVisitsBySource = (orders: Order[] | undefined): SourceDataPoint[] => {
  return useMemo((): SourceDataPoint[] => {
    if (!orders) return [];

    const totalOrders = orders.length;
    
    if (totalOrders === 0) return [];

    const counts = {
      "Social Media": 0,
      "Direct": 0,
      "Organic Search": 0,
      "Referral": 0
    };

    orders.forEach(order => {
      if (order.source && counts.hasOwnProperty(order.source)) {
        counts[order.source]++;
      }
    });

    const result: SourceDataPoint[] = [
      { source: "Social Media", percentage: Math.round((counts["Social Media"] / totalOrders) * 100), color: "#00E5FF" },
      { source: "Direct", percentage: Math.round((counts["Direct"] / totalOrders) * 100), color: "#2979FF" },
      { source: "Organic Search", percentage: Math.round((counts["Organic Search"] / totalOrders) * 100), color: "#FF9100" },
      { source: "Referral", percentage: Math.round((counts["Referral"] / totalOrders) * 100), color: "#f43f5e" }
    ];

    return result.sort((a, b) => b.percentage - a.percentage);

  }, [orders]);
};