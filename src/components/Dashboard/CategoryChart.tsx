import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryData } from '../../Types';

interface CategoryChartProps {
  data: CategoryData[];
  total: number;
}

const CategoryChart = ({ data, total }: CategoryChartProps) => {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-[24px] border border-white/5 w-full h-[400px] flex flex-col">
      <h3 className="text-white font-semibold text-lg mb-4">Sales by Category</h3>
      
      <div className="flex flex-1 items-center justify-between min-h-0">
        <div className="relative w-3/5 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius="70%"   
                outerRadius="90%"   
                paddingAngle={5}    
                dataKey="value"
                stroke="none"       
              >

                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider">Total</p>
            <p className="text-white text-xl font-bold">
              ${total.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="w-2/5 flex flex-col gap-4 pl-4">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-white text-[13px] font-medium">{item.name}</span>
              </div>
              <span className="text-gray-500 text-[11px] pl-4">
                {total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;