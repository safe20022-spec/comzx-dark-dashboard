import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { DailySales } from '../../Types';

interface WeeklyProfitCardProps {
  data: DailySales[];
  isLoading?: boolean;
}

const WeeklyProfitCard = ({ data, isLoading }: WeeklyProfitCardProps) => {
  const totalWeeklyProfit = React.useMemo(() => {
    return data.reduce((acc, day) => acc + day.sales, 0);
  }, [data]);

  const changePercentage = 12.5; 
  const isPositiveChange = true;

  if (isLoading) {
    return <div className="p-6 bg-[#111111] rounded-[32px] border border-white/5 h-80 flex items-center justify-center text-gray-700">Loading Profit Chart...</div>;
  }

  if (data.length === 0) {
    return <div className="p-6 bg-[#111111] rounded-[32px] border border-white/5 h-80 flex items-center justify-center text-gray-700">No profit data for this week.</div>;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 shadow-xl backdrop-blur-sm">
          <p className="text-gray-400 text-xs font-bold mb-1">{label}ay Profit</p>
          <p className="text-xl font-extrabold text-white tracking-tight">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">Weekly Profit</h3>
          <p className="text-3xl font-extrabold text-white mt-1.5 tracking-tight">
            ${totalWeeklyProfit.toLocaleString()}
          </p>
        </div>
        
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${isPositiveChange ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositiveChange ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{isPositiveChange ? '+' : ''}{changePercentage}%</span>
          <span className="text-white/50 font-medium">vs last week</span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            barCategoryGap="25%" 
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} horizontal={false} />
            
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#616161', fontWeight: 'bold' }} 
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#616161' }} 
              tickFormatter={(value) => `$${value/1000}k`} 
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)', }} />
            
            <Bar 
              dataKey="sales" 
              fill="#00B0FF" 
              radius={[10, 10, 0, 0]} 
              barSize={18} 
            >
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(WeeklyProfitCard);