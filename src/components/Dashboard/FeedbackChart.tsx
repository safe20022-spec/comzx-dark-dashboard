import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { FeedbackDataPoint } from '../../Types';

interface FeedbackChartProps {
  data: FeedbackDataPoint[];
  isLoading?: boolean;
}

const FeedbackChart = ({ data, isLoading }: FeedbackChartProps) => {
  if (isLoading) {
    return <div className="p-6 bg-[#111111] rounded-[32px] border border-white/5 h-[380px] flex items-center justify-center text-gray-700">Loading Feedback...</div>;
  }

  const positiveValue = data.find(d => d.name === 'Positive')?.value || 0;

  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 w-full flex flex-col justify-between h-[380px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-bold text-lg">Feedback</h3>
        <div className="bg-[#161616] px-3 py-1 rounded-full border border-white/5 text-xs text-gray-400">
          Week
        </div>
      </div>

      <div className="relative h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65} 
              outerRadius={85}
              paddingAngle={2} 
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#111111" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#0A0A0A] p-2 rounded-lg border border-white/10 text-xs">
                      <span className="text-white font-bold">{payload[0].name}: {payload[0].value}%</span>
                    </div>
                  );
                }
                return null;
              }} 
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-white">{positiveValue}%</span>
          <span className="text-xs text-gray-500 font-bold uppercase mt-1">Positive</span>
        </div>
      </div>

      <div className="flex justify-center gap-6 text-xs mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-gray-400">{item.name}</span>
            <span className="text-white font-bold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(FeedbackChart);