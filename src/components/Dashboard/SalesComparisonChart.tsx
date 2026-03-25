// src/components/Dashboard/SalesComparisonChart.tsx
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface ComparisonData {
  name: string;
  current: number;
  previous: number;
}

// src/components/Dashboard/SalesComparisonChart.tsx

const SalesComparisonChart = ({ data }: { data: any[] }) => {
  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 h-[450px] w-full shadow-2xl">
      {/* ... الجزء العلوي من العنوان والـ Legend كما هو ... */}

      <ResponsiveContainer width="100%" height="90%">
        {/* زدنا الـ barGap لجعل الأعمدة المزدوجة قريبة من بعضها */}
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }} 
          barGap={4} 
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 600 }} 
            dy={15}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            // جعلنا الـ domain 'auto' ليمتد العمود لأقصى ارتفاع ممكن نسبياً
            domain={[0, 'auto']}
            tick={{ fill: '#4B5563', fontSize: 11 }}
            tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
          />
          
          <Tooltip 
            cursor={{ fill: '#ffffff', opacity: 0.03 }}
            contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '12px' }}
          />
          
          {/* تكبير barSize من 10 إلى 18 لجعل العمود عريضاً وواضحاً */}
          <Bar 
            dataKey="previous" 
            fill="#00CFE8" 
            radius={[6, 6, 0, 0]} 
            barSize={18} 
          />
          
          <Bar 
            dataKey="current" 
            fill="#F97316" 
            radius={[6, 6, 0, 0]} 
            barSize={18} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SalesComparisonChart;