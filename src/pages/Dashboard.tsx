import { useMemo } from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import SalesChart from '../components/Dashboard/SalesChart';
import CategoryChart from '../components/Dashboard/CategoryChart';
import ProductTable from '../components/Dashboard/ProductTable';
import SalesComparisonChart from '../components/Dashboard/SalesComparisonChart';
import BestSellingProduct from '../components/Dashboard/BestSellingProduct';
import TransactionsCard from '../components/Dashboard/TransactionsCard';
import ProductReviews from '../components/Dashboard/ProductReviews';
import OrderStatusTable from '../components/Dashboard/OrderStatusTable'; 
import { useUiStore } from '../store/useUiStore';
import { 
  useDailySales, 
  useCategorySales, 
  useTopProducts, 
  useDashboardData,
  useDashboardStats,
  deriveWeeklyComparison,
  deriveTransactionStats 
} from '../hooks/useDashboard';

const Dashboard = () => {
  const { data: orders, isLoading } = useDashboardData();
  const { activeTab, setActiveTab } = useUiStore();
  
  // 1. اشتقاق البيانات الأساسية
  const stats = useDashboardStats(orders); 
  const dailySales = useDailySales(orders ?? []); 
  const categorySales = useCategorySales(orders);
  const topProducts = useTopProducts(orders);
  
  // 2. اشتقاق بيانات المقارنة
  const weeklyComparisonData = useMemo(() => {
    return deriveWeeklyComparison(dailySales);
  }, [dailySales]);

  // 3. تجهيز بيانات المعاملات
  const transactionCategories = useMemo(() => {
    return deriveTransactionStats(categorySales);
  }, [categorySales]);

  // 4. تجهيز أفضل المنتجات
  const bestSellingProducts = useMemo(() => topProducts.slice(0, 5), [topProducts]);

  // 5. Slice لـ 7 طلبات فقط وترتيبها للأحدث
  const limitedOrders = useMemo(() => {
    if (!orders) return [];
    return [...orders]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7); 
  }, [orders]);

  const totalWeeklyRevenue = dailySales.reduce((sum, day) => sum + day.sales, 0);
  const todayRevenue = dailySales[dailySales.length - 1]?.sales ?? 0;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sales', label: 'Sales Analytics' },
    { id: 'products', label: 'Products' },
  ] as const;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse p-8">
        <div className="h-10 w-64 bg-white/5 rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/5 rounded-[24px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* العنوان وأزرار التنقل */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor your business performance</p>
        </div>

        <div className="flex bg-[#111111] p-1 rounded-2xl border border-white/5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="transition-all duration-500">
        
        {/* المنظر الأول: Overview (أضفنا هنا جدول المنتجات) */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard 
                  key={index} 
                  title={stat.title} 
                  value={stat.value} 
                  icon={stat.icon as any} 
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SalesChart data={dailySales} />
              </div>
              <div>
                <CategoryChart data={categorySales} total={totalWeeklyRevenue} />
              </div>
            </div>

            {/* تم نقل جدول المنتجات هنا يا معلم */}
            <div className="w-full">
              <ProductTable products={topProducts} />
            </div>
          </div>
        )}

        {/* المنظر الثاني: Sales Analytics */}
        {activeTab === 'sales' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatsCard 
                title="TODAY REVENUE" 
                value={`$${todayRevenue.toLocaleString()}`} 
                icon="revenue" 
              />
              <StatsCard title="TODAY VISITORS" value="512" icon="visitors" />
            </div>
            
            <div className="w-full">
              <SalesComparisonChart data={weeklyComparisonData} />
            </div>

            <div className="w-full">
              <BestSellingProduct products={bestSellingProducts} />
            </div>

            <div className="w-full">
              <OrderStatusTable orders={limitedOrders} />
            </div>

            <div className="w-full">
              <TransactionsCard 
                totalRevenue={todayRevenue} 
                categories={transactionCategories} 
              />
            </div>

            <div className="w-full">
              <ProductReviews />
            </div>
          </div>
        )}

        {/* المنظر الثالث: Products (أصبح فارغاً أو يمكن حذفه لاحقاً) */}
        {activeTab === 'products' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl text-gray-600">
                Products list moved to Overview tab.
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;