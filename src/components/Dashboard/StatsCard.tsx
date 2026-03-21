import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Box } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


interface StatsCardProps {
  title: string;
  value: string;
  icon: 'revenue' | 'profit' | 'orders' | 'visitors';
  change?: string;
  isPositive?: boolean;
  isLoading?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  revenue: DollarSign,
  profit: TrendingUp,
  orders: Box,
  visitors: Users,
};

const StatsCard = React.memo(({ 
  title, 
  value, 
  icon, 
  change = "12", 
  isPositive = true, 
  isLoading 
}: StatsCardProps) => {
  
  if (isLoading) {
    return <div className="h-32 bg-white/5 animate-pulse rounded-[24px] border border-white/5" />;
  }

  const Icon = iconMap[icon] || Box;

  return (
    <div className="bg-[#1A1A1A] border border-white/5 p-5 rounded-[24px] hover:border-orange-500/30 transition-all duration-300 group shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
             <div className="p-2 bg-white/5 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                <Icon size={18} className="group-hover:text-orange-500 transition-colors" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
               {title}
             </span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {value}
          </h3>
        </div>
        
        {/* Sparkline Visual */}
        <div className={`h-10 w-16 opacity-40 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          <svg viewBox="0 0 100 40" className="w-full h-full stroke-current fill-none">
            <path 
              d={isPositive ? "M0 35 Q 25 5, 50 25 T 100 10" : "M0 10 Q 25 35, 50 15 T 100 30"} 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className={`flex items-center gap-0.5 text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isPositive ? '+' : '-'}{change}%
        </div>
        <span className="text-[10px] text-gray-600 font-medium">vs yesterday</span>
      </div>
    </div>
  );
});

export default StatsCard;