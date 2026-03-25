// src/components/Dashboard/ProductReviews.tsx
import { Star, Quote } from 'lucide-react';
import { useDashboardData, useVerifiedReviews } from '../../hooks/useDashboard'; // استيراد الهوكس

const ProductReviews = () => {
  const { data: orders } = useDashboardData();
  
  // استخدام دالة الاشتقاق الجديدة التي تحسب بناءً على الطلبات المكتملة
  const allReviews = useVerifiedReviews(orders);

  return (
    <div className="bg-[#111111] p-8 rounded-[32px] border border-white/5 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white font-bold text-xl tracking-tight">Verified Reviews</h3>
          <p className="text-gray-500 text-xs mt-1">Feedback from successful transactions</p>
        </div>
        <div className="text-orange-500 text-xs font-bold bg-orange-500/10 px-3 py-1 rounded-full">
          {allReviews.length} Reviews
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allReviews.slice(0, 6).map((review) => (
          <div 
            key={review.id} 
            className="group relative bg-white/[0.02] p-6 rounded-[24px] border border-white/5 hover:border-orange-500/30 transition-all duration-300"
          >
            {/* ... نفس كود العرض الداخلي ... */}
            <Quote className="absolute top-4 right-4 text-white/[0.03] group-hover:text-orange-500/10 transition-colors" size={40} />

            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={review.productImage} 
                  alt={review.productName} 
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-[#111111]">
                    <span className="text-[10px] text-white font-bold">{review.rating}</span>
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold leading-none">{review.userName}</h4>
                <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">{review.productName}</p>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 italic mb-4">
              "{review.comment}"
            </p>

            <div className="mt-auto pt-4 border-t border-white/[0.05] flex justify-between items-center">
              <span className="text-[10px] text-gray-600 font-medium uppercase">
                {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                Verified Purchase
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {allReviews.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-gray-600 text-sm">No verified reviews found for completed orders.</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;