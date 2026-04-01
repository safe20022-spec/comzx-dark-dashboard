import { Star } from 'lucide-react';
import { useVerifiedReviews } from '../../hooks/useDashboard';
import type { Order, Product } from '../../Types';

interface Props {
  orders: Order[] | undefined;
  products: Product[] | undefined;
}

const ProductReviews = ({ orders, products }: Props) => {
  
  const allReviews = useVerifiedReviews(orders, products);

  return (
    <div className="bg-[#111111] p-8 rounded-[32px] border border-white/5 space-y-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white font-bold text-xl tracking-tight">Product Reviews</h3>
          <p className="text-gray-500 text-xs mt-1">Feedback from verified purchases</p>
        </div>
        <div className="text-orange-500 text-xs font-bold bg-orange-500/10 px-3 py-1 rounded-full">
          {allReviews.length} Reviews
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {allReviews.slice(0, 4).map((review, index) => (
          <div 
            key={index} 
            className="group bg-white/[0.02] p-6 rounded-[24px] border border-white/5 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              
              <div className="relative flex-shrink-0">
                <img 
                  src={review.productImage} 
                  alt={review.productName} 
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-[#111111]">
                    <span className="text-[10px] text-white font-bold">{review.rating}</span>
                </div>
              </div>

              <div className="flex-grow space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white text-sm font-bold">{review.userName}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < review.rating ? "text-orange-500 fill-orange-500" : "text-gray-700"} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed italic line-clamp-2">
                  "{review.comment}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allReviews.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600 text-sm">No reviews available yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;