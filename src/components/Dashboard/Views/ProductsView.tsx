import OverviewGroupCard from '../OverviewGroupCard';
import { DollarSign, ShoppingCart, Users } from 'lucide-react';
import { useDashboardData, useDashboardProducts } from '../../../hooks/useDashboard';

import { 
  useDashboardStats, 
  useTotalStats, 
  useWeeklyProfitData, 
  useAudienceOverviewData, 
  useFeedbackData,
  useVisitsBySource 
} from '../../../hooks/useDashboard'; 

import WeeklyProfitCard from '../WeeklyProfitCard';
import AudienceOverview from '../AudienceOverview'; 
import FeedbackChart from '../FeedbackChart'; 

import VisitsBySource from '../VisitsBySource'; 

const ProductsView = () => {
  
  const { data: orders } = useDashboardData();
  const { data: products } = useDashboardProducts();


  const todayStats = useDashboardStats(orders, products);
  const totalStats = useTotalStats(orders, products);
  const weeklyProfitData = useWeeklyProfitData(orders, products);
  const todayChartsData = useAudienceOverviewData(orders, products); 
  const feedbackData = useFeedbackData(products);
  
  const visitsSourceData = useVisitsBySource(orders);


  const isLoading = !todayStats.length || !totalStats.length || !weeklyProfitData.length || !todayChartsData.length;

  if (isLoading) {
    return <div className="text-gray-500 text-center p-10">Loading Stats...</div>;
  }

  const todayItems = [
    { 
      value: todayStats.find(s => s.icon === 'profit')?.value ?? '$0', 
      label: 'Earnings', 
      icon: DollarSign, 
      gradientClass: 'bg-gradient-to-br from-emerald-400 to-teal-600' 
    },
    { 
      value: todayStats.find(s => s.icon === 'orders')?.value ?? '0', 
      label: 'Orders', 
      icon: ShoppingCart, 
      gradientClass: 'bg-gradient-to-br from-blue-500 to-indigo-600' 
    },
    { 
      value: todayStats.find(s => s.icon === 'visitors')?.value ?? '0', 
      label: 'Customers', 
      icon: Users, 
      gradientClass: 'bg-gradient-to-br from-orange-400 to-pink-600' 
    },
  ];

  const totalItems = [
    { 
      value: totalStats.find(s => s.icon === 'profit')?.value ?? '$0', 
      label: 'Earnings', 
      icon: DollarSign, 
      gradientClass: 'bg-gradient-to-br from-emerald-500 to-emerald-700' 
    },
    { 
      value: totalStats.find(s => s.icon === 'orders')?.value ?? '0', 
      label: 'Orders', 
      icon: ShoppingCart, 
      gradientClass: 'bg-gradient-to-br from-blue-600 to-blue-800' 
    },
    { 
      value: totalStats.find(s => s.icon === 'visitors')?.value ?? '0', 
      label: 'Customers', 
      icon: Users, 
      gradientClass: 'bg-gradient-to-br from-orange-500 to-orange-700' 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewGroupCard title="Today Overview" items={todayItems} />
        <OverviewGroupCard title="Total Overview" items={totalItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyProfitCard data={weeklyProfitData} isLoading={isLoading} />
        <AudienceOverview data={todayChartsData} isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FeedbackChart data={feedbackData} isLoading={isLoading} />

        <VisitsBySource data={visitsSourceData} isLoading={isLoading} />

        <div className="p-10 text-center border-2 border-dashed border-white/5 rounded-[32px] text-gray-700 flex items-center justify-center h-[380px]">
          Total Transactions Coming Soon
        </div>
      </div>

    </div>
  );
};

export default ProductsView;