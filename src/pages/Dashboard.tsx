import StatsCard from '../components/Dashboard/StatsCard';
import SalesChart from '../components/Dashboard/SalesChart';
import CategoryChart from '../components/Dashboard/CategoryChart';
import ProductTable from '../components/Dashboard/ProductTable';
import { 
  useDailySales, 
  useCategorySales, 
  useTopProducts, 
  useDashboardData,
  useDashboardStats 
} from '../hooks/useDashboard';

const Dashboard = () => {
  const { data: orders, isLoading } = useDashboardData();
  
  // استخراج البيانات والبطاقات
  const stats = useDashboardStats(orders); 
  const dailySales = useDailySales(orders);
  const categorySales = useCategorySales(orders);
  const topProducts = useTopProducts(orders);
  
  const totalWeeklyRevenue = dailySales.reduce((sum, day) => sum + day.sales, 0);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/5 rounded-[24px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] bg-white/5 rounded-[24px]" />
          <div className="h-[400px] bg-white/5 rounded-[24px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard 
            key={index} 
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon as "revenue" | "profit" | "orders" | "visitors"} 
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

      <div className="w-full">
        <ProductTable products={topProducts} />
      </div>
    </div>
  );
};

export default Dashboard;