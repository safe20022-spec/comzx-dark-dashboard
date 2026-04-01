import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AudienceDataPoint } from '../../Types';

interface AudienceOverviewProps {
  data: AudienceDataPoint[];
  isLoading?: boolean;
}

const AudienceOverview = ({ data, isLoading }: AudienceOverviewProps) => {

  if (isLoading) {
    return <div className="p-6 bg-[#111111] rounded-[32px] border border-white/5 h-[416px] flex items-center justify-center text-gray-700">Loading Audience Overview...</div>;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md">
          <p className="text-white text-xs font-bold mb-3 uppercase tracking-wider">{label}day Overview</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
                <span className="text-gray-400">New Revenue</span>
              </div>
              <span className="text-white font-bold">${payload[0]?.value.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2979FF]"></div>
                <span className="text-gray-400">Orders</span>
              </div>
              <span className="text-white font-bold">{payload[1]?.value.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF9100]"></div>
                <span className="text-gray-400">Refunds / Profit</span>
              </div>
              <span className="text-white font-bold">${payload[2]?.value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 w-full">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold text-lg">Audience Overview</h3>
        
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
            <span className="text-gray-400">New Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#2979FF]"></div>
            <span className="text-gray-400">Orders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF9100]"></div>
            <span className="text-gray-400">Profit</span>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOrd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2979FF" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2979FF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF9100" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#FF9100" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#616161', fontWeight: 'bold' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#616161' }} tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value} />
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            
            <Area type="monotone" dataKey="revenue" stroke="#00E5FF" strokeWidth={2} fill="url(#colorRev)" dot={{ r: 4, fill: '#00E5FF', strokeWidth: 2, stroke: '#111' }} activeDot={{ r: 6 }} />
            
            <Area type="monotone" dataKey="orders" stroke="#2979FF" strokeWidth={2} fill="url(#colorOrd)" dot={{ r: 4, fill: '#2979FF', strokeWidth: 2, stroke: '#111' }} activeDot={{ r: 6 }} />
            
            <Area type="monotone" dataKey="profit" stroke="#FF9100" strokeWidth={2} fill="url(#colorProf)" dot={{ r: 4, fill: '#FF9100', strokeWidth: 2, stroke: '#111' }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(AudienceOverview);