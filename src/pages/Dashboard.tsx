// src/pages/Dashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../services/statsService';
import StatsCard from '../components/Dashboard/StatsCard';

const Dashboard = () => {
  // Using React Query for data fetching (Best Practice)
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (error) return <div className="text-rose-500">Failed to load stats.</div>;

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(4).fill(0).map((_, i) => <StatsCard key={i} data={null} isLoading={true} />)
          : stats?.map((item) => (
              <StatsCard key={item.id} data={item} isLoading={false} />
            ))
        }
      </div>

      {/* Other sections (Charts, Tables) will follow... */}
    </div>
  );
};

export default Dashboard;