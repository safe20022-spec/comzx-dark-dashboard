import { useMemo } from 'react';
import StatsCard from '../StatsCard';
import SalesComparisonChart from '../SalesComparisonChart';
import BestSellingProduct from '../BestSellingProduct';
import OrderStatusTable from '../OrderStatusTable';
import TransactionsCard from '../TransactionsCard';
import ProductReviews from '../ProductReviews';
import { 
  useDailySales, 
  useCategorySales, 
  useTopProducts, 
  useWeeklyComparison, 
  useTransactionStats,
  useDashboardProducts,
  useDashboardData 
} from '../../../hooks/useDashboard';



const SalesView = () => {
  
  const { data: orders, isLoading: oLoading } = useDashboardData();
  const { data: products, isLoading: pLoading } = useDashboardProducts();

  
  const dailySales = useDailySales(orders, products);
  const categorySales = useCategorySales(orders, products);
  const topProducts = useTopProducts(orders, products);

  
  const weeklyComparisonData = useWeeklyComparison(dailySales);
  const transactionCategories = useTransactionStats(categorySales);

  
  const bestSellingProducts = useMemo(() => 
    topProducts.slice(0, 5), 
  [topProducts]);
  
  const limitedOrders = useMemo(() => {
    if (!orders) return [];
    return [...orders]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4); 
  }, [orders]);

  const todayRevenue = dailySales[dailySales.length - 1]?.sales ?? 0;

  if (oLoading || pLoading) {
    return <div className="p-8 text-white">Loading Sales Data...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">
           <StatsCard title="TODAY REVENUE" value={`$${todayRevenue.toLocaleString()}`} icon="revenue" />
           <StatsCard title="TODAY VISITORS" value="512" icon="visitors" />
        </div>
        <div className="lg:col-span-2">
          <BestSellingProduct products={bestSellingProducts} />
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesComparisonChart data={weeklyComparisonData} />
        </div>
        <div className="lg:col-span-1">
          <TransactionsCard totalRevenue={todayRevenue} categories={transactionCategories} />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="w-full h-full">
           <ProductReviews orders={orders} products={products} />
        </div>
        <div className="w-full h-full">
           <OrderStatusTable orders={limitedOrders} />
        </div>
        <div className="w-full h-full bg-[#111111] p-6 rounded-[32px] border border-white/5">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-lg">Visits by Time</h3>
              <select className="bg-transparent text-gray-500 text-xs outline-none">
                <option>Week</option>
              </select>
           </div>
           <div className="grid grid-cols-7 gap-2">
              {[...Array(49)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-sm ${i % 3 === 0 ? 'bg-emerald-500/40' : 'bg-emerald-900/20'}`} />
              ))}
           </div>
           <p className="text-[10px] text-gray-500 mt-4 italic text-center">Peak traffic usually occurs at 6 PM</p>
        </div>
      </div>
    </div>
  );
};

export default SalesView;