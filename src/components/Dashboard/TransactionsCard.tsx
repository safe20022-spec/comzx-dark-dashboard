// components/Dashboard/TransactionsCard.tsx
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';

const TransactionsCard = ({ totalRevenue, categories }: { totalRevenue: number, categories: any[] }) => {
  return (
    <div className="bg-[#111111] p-8 rounded-[32px] border border-white/5 h-full relative overflow-hidden">
      {/* Header المكون */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <ArrowUpRight size={18} className="text-blue-500" />
          </div>
          <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">Our Total Transactions</span>
        </div>
        <button className="text-gray-600 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* الجانب الأيسر: الرقم الكبير والمقارنة */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-white text-5xl font-black">${totalRevenue.toLocaleString()}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-xs font-bold">
              <ArrowUpRight size={14} /> +12%
            </div>
            <span className="text-gray-500 text-xs italic">vs yesterday</span>
          </div>
        </div>

        {/* الجانب الأيمن: أشرطة التقدم للفئات */}
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-tighter">{cat.name}</span>
                <span className="text-white text-xs font-bold">{Math.round(cat.percentage)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${cat.percentage}%`, 
                    backgroundColor: cat.color,
                    boxShadow: `0 0 10px ${cat.color}40` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TransactionsCard;