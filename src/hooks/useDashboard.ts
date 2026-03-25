import { useMemo } from 'react';
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

export const useDailySales = (orders: Order[]): DailySales[] => {
  const salesMap: { [key: string]: { sales: number; day: string } } = {};

  orders.forEach((order) => {
    // التعديل: تجاهل أي طلب حالته ليست مكتملة
    if (order.status !== 'completed') return;

    // نستخدم التاريخ كمفتاح فريد (Key)
    const dateKey = order.date; // "2026-03-12"

    if (!salesMap[dateKey]) {
      salesMap[dateKey] = { 
        sales: 0, 
        day: order.day 
      };
    }
    
    // حساب إجمالي الطلب المكتمل فقط
    const orderTotal = order.items.reduce((sum, item) => {
      const product = productsData.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    salesMap[dateKey].sales += orderTotal;
  });

  return Object.keys(salesMap).map((date) => ({
    date: date,
    day: salesMap[date].day,
    sales: salesMap[date].sales,
  }));
};

// CategoryChart Data
export const useCategorySales = (orders: Order[] | undefined) => {
  return useMemo(() => {
    if (!orders) return [];

    const colors: Record<Category, string> = { 
      Clothing: '#00CFE8', 
      Lingerie: '#F97316', 
      Sportswear: '#10B981',
      Accessories: '#FFB800' 
    };

    const grouped = orders.reduce((acc: Record<string, number>, order) => {
      // التعديل: تخطي الطلب إذا لم تكن حالته مكتملة
      if (order.status !== 'completed') return acc;

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
  }, [orders]);
};

// Stat Cards Data
export const useDashboardStats = (orders: Order[] | undefined) => {
  return useMemo(() => {
    if (!orders) return [];

    const todayDate = "2026-03-18";

    // التعديل هنا: فلترة الطلبات التي تاريخها اليوم "وَ" حالتها مكتملة فقط
    const todayCompletedOrders = orders.filter(
      (o) => o.date === todayDate && o.status === "completed"
    );

    let todayRevenue = 0;
    let todayProfit = 0;

    todayCompletedOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = productsData.find((p) => p.id === item.productId);
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
        // عدد الطلبات المكتملة فقط
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
  }, [orders]);
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

// Product Table Data - Updated to count only completed orders
export const useTopProducts = (orders: Order[] | undefined): ProductStat[] => {
  return useMemo(() => {
    if (!orders) return [];

    const productMap = orders.reduce((acc: Record<string, ProductStat>, order) => {
      // التعديل الجوهري: تجاهل الطلب تماماً إذا لم تكن حالته مكتملة
      if (order.status !== 'completed') return acc;

      order.items.forEach(item => {
        // إذا لم يكن المنتج موجوداً في الخريطة بعد، نقوم بإنشائه من بيانات المنتجات الأصلية
        if (!acc[item.productId]) {
          const product = productsData.find(p => p.id === item.productId);
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
        
        // إضافة الكمية والإيرادات فقط للطلبات المكتملة
        if (acc[item.productId]) {
          acc[item.productId].totalQty += item.quantity;
          acc[item.productId].totalRevenue += acc[item.productId].price * item.quantity;
        }
      });
      return acc;
    }, {});

    // ترتيب المنتجات من الأكثر مبيعاً (كمية) إلى الأقل
    return Object.values(productMap).sort((a, b) => b.totalQty - a.totalQty);
  }, [orders]);
};


interface DailySales {
  day: string;
  date: string;
  sales: number;
}

export const deriveWeeklyComparison = (dailySales: DailySales[]) => {
  return dailySales.map((item) => ({
    name: item.day, 
    current: item.sales,
    previous: item.sales * 0.85, 
  }));
};



// src/hooks/useDashboard.ts

export const deriveTransactionStats = (categorySales: any[]) => {
  // 1. تحديد الفئات المستهدفة
  const targetCategories = ['Clothing', 'Lingerie'];
  
  let targetStats = categorySales.filter(cat => targetCategories.includes(cat.name));
  const otherStats = categorySales.filter(cat => !targetCategories.includes(cat.name));

  // 2. حساب مجموع الـ Other
  const otherTotal = otherStats.reduce((sum, cat) => sum + cat.value, 0);

  // 3. تجهيز المصفوفة النهائية للعرض
  const finalCategories = [
    ...targetStats.map(cat => ({ name: cat.name, value: cat.value, color: cat.name === 'Clothing' ? '#00CFE8' : '#F97316' })),
    { name: 'Other', value: otherTotal, color: '#6B7280' }
  ];

  // 4. حساب النسب المئوية للـ Progress Bars
  const totalAll = finalCategories.reduce((sum, cat) => sum + cat.value, 0);
  
  return finalCategories.map(cat => ({
    ...cat,
    percentage: totalAll > 0 ? (cat.value / totalAll) * 100 : 0
  }));
};

// hooks/useDashboard.ts (أو في ملف الهوكس الخاص بك)

export const useVerifiedReviews = (orders: Order[] | undefined) => {
  return useMemo(() => {
    if (!orders) return [];

    // 1. استخراج معرفات المنتجات التي تم شراؤها واكتملت حالاتها فقط
    // نستخدم Set للحصول على سرعة بحث عالية ومعرفات فريدة
    const completedProductIds = new Set();
    orders.forEach(order => {
      if (order.status === 'completed') {
        order.items.forEach(item => completedProductIds.add(item.productId));
      }
    });

    // 2. تجميع التقييمات فقط للمنتجات التي اشتراها العميل فعلاً (Verified)
    const verifiedReviews = productsData.flatMap(product => {
      // إذا لم يتم شراء المنتج في طلب مكتمل، نتجاهل تقييماته (أو نفترضه تقييم غير موثق)
      if (!completedProductIds.has(product.id)) return [];

      return (product.reviews || []).map(review => ({
        ...review,
        productName: product.name,
        productImage: product.image
      }));
    });

    // 3. ترتيب التقييمات من الأحدث للأقدم
    return verifiedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders]);
};