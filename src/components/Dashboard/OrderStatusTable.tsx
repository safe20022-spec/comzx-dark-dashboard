import { MoreHorizontal, Circle } from 'lucide-react';

const statusConfig: Record<string, { color: string, bg: string, border: string }> = {
  new: { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  inprogress: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  completed: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  cancelled: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

const OrderStatusTable = ({ orders }: { orders: any[] }) => {
  return (
    <div className="bg-[#111111] rounded-[32px] border border-white/5 overflow-hidden w-full">
      <div className="p-8 border-b border-white/5 flex justify-between items-center">
        <div>
          <h3 className="text-white font-bold text-xl tracking-tight">Order Status</h3>
          <p className="text-gray-500 text-xs mt-1">Overview of recent customer transactions</p>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-[10px] uppercase tracking-[2px] border-b border-white/5 bg-white/[0.01]">
              <th className="px-8 py-5 font-black">Order ID</th>
              <th className="px-8 py-5 font-black">Date</th>
              <th className="px-8 py-5 font-black">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {orders.slice(0, 3).map((order) => {
              const status = order.status?.toLowerCase() || 'new';
              const config = statusConfig[status] || statusConfig.new;

              return (
                <tr key={order.id} className="group hover:bg-white/[0.02] transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-[10px]">
                        #
                      </div>
                      <span className="text-white font-mono text-sm font-bold group-hover:text-orange-500 transition-colors">
                        {order.id}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-xs font-medium">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-gray-600 text-[10px] uppercase">{order.day}</span>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${config.bg} ${config.color} ${config.border} text-[10px] font-black uppercase tracking-wider shadow-sm`}>
                      <Circle size={6} fill="currentColor" />
                      {status === 'inprogress' ? 'In Progress' : status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-white/[0.01] text-center border-t border-white/5">
        <button className="text-orange-500 hover:text-orange-400 text-xs font-bold transition-colors uppercase tracking-widest">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default OrderStatusTable;