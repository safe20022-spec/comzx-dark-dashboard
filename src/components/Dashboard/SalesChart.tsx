import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SalesChartData } from '../../Types';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex flex-col items-center -translate-y-10 transition-all duration-200">
        <div className="bg-[#F97316] text-white text-[12px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
          ${payload[0].value.toLocaleString()}
        </div>
        <div className="w-0 h-0 
          border-l-[6px] border-l-transparent 
          border-r-[6px] border-r-transparent 
          border-t-[6px] border-t-[#F97316]">
        </div>
      </div>
    );
  }
  return null;
};

const SalesChart = ({ data }: { data: SalesChartData[] }) => {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-[24px] border border-white/5 w-full h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold text-lg">Sales Analytics</h3>
        <select className="bg-[#2A2A2A] text-gray-400 text-[10px] px-3 py-1 rounded-lg border-none outline-none cursor-pointer">
          <option>Week</option>
        </select>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
            
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#6b7280', fontSize: 11}}
              dy={10} 
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#6b7280', fontSize: 11}}
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
            />
            
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#F97316', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#F97316" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)"
              activeDot={{ r: 6, fill: "#F97316", stroke: "#1A1A1A", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;