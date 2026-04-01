import { useMemo } from 'react';
import StatsCard from '../StatsCard';
import SalesChart from '../SalesChart';
import CategoryChart from '../CategoryChart';
import ProductTable from '../ProductTable';
import { 
  useDashboardStats, 
  useDailySales, 
  useCategorySales, 
  useTopProducts,
  useDashboardProducts,
  useDashboardData 
} from '../../../hooks/useDashboard';


const OverviewView = () => {
  const { data: orders, isLoading: oLoading } = useDashboardData();
  const { data: products, isLoading: pLoading } = useDashboardProducts();

  const stats = useDashboardStats(orders, products);
  const dailySales = useDailySales(orders, products);
  const categorySales = useCategorySales(orders, products);
  const topProducts = useTopProducts(orders, products);

  const totalWeeklyRevenue = useMemo(() => 
    dailySales.reduce((sum, day) => sum + day.sales, 0), 
  [dailySales]);

  if (oLoading || pLoading) {
    return <div className="text-white p-8">Loading Dashboard Data...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} icon={stat.icon as any} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={dailySales} />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart data={categorySales} total={totalWeeklyRevenue} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductTable products={topProducts} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-[#EAE6D1] p-8 rounded-[32px] h-full flex flex-col justify-between text-[#111111]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl uppercase tracking-tighter">Trending Now</h3>
                <span className="text-emerald-600 font-bold text-xs">+12% vs yesterday</span>
              </div>
              <div className="aspect-square bg-white/20 rounded-2xl mb-6 flex items-center justify-center">
                 <span className="text-4xl">🔥</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg">Single Breasted Blazer</h4>
              <p className="text-2xl font-black mt-2">$1499.99</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewView;