// src/components/Dashboard/StatsCard.tsx
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Box } from 'lucide-react';

interface StatsCardProps {
  data: any; // Use the interface defined earlier
  isLoading?: boolean;
}

const iconMap = {
  revenue: DollarSign,
  visitors: Users,
  transactions: CreditCard,
  products: Box,
};

const StatsCard = React.memo(({ data, isLoading }: StatsCardProps) => {
  if (isLoading) {
    return <div className="h-32 bg-white/5 animate-pulse rounded-[24px]" />; // Skeleton screen
  }

  const Icon = iconMap[data.category as keyof typeof iconMap];

  return (
    <div className="bg-[#1A1A1A] border border-white/5 p-5 rounded-[24px] hover:border-orange-500/30 transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
             <div className="p-2 bg-white/5 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                <Icon size={18} className="group-hover:text-orange-500" />
             </div>
             <span className="text-xs font-medium uppercase tracking-wider">{data.title}</span>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight">{data.value}</h3>
        </div>
        
        {/* Sparkline placeholder - in a real app, use a mini Recharts line */}
        <div className={`h-10 w-16 opacity-50 ${data.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          <svg viewBox="0 0 100 40" className="w-full h-full stroke-current fill-none">
            <path d="M0 35 Q 25 5, 50 25 T 100 10" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className={`flex items-center gap-0.5 text-xs font-bold ${data.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {data.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {data.isPositive ? '+' : '-'}{data.change}%
        </div>
        <span className="text-[10px] text-gray-500 font-medium">vs yesterday</span>
      </div>
    </div>
  );
});

export default StatsCard;