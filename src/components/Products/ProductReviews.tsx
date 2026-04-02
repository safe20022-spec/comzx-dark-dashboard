import React from 'react';
import { Star } from 'lucide-react';
import type { Product } from '../../Types';
import { useProductReviews } from '../../hooks/useProducts';

interface ProductReviewsProps {
  product: Product;
}

const ProductReviews = ({ product }: ProductReviewsProps) => {
  const { averageRating, totalReviews, percentages, reviews } = useProductReviews(product);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#111111] p-6 rounded-[32px] border border-white/5">
      
      {/* LEFT SIDE: Rating Summary (Spans 5 columns) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Customer Reviews</h3>
          <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Overall Rating</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-white">{averageRating}</div>
          <div>
            <div className="flex items-center text-[#FF9100]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.round(averageRating) ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">Based on {totalReviews} reviews</p>
          </div>
        </div>

        {/* Distribution Bars */}
        <div className="space-y-3 pt-2">
          {([5, 4, 3, 2, 1] as const).map((star) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-gray-400 w-5">
                <span className="font-medium">{star}</span>
                <Star size={12} fill="currentColor" className="text-gray-600" />
              </div>
              <div className="flex-1 h-2 bg-[#161616] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FF9100] rounded-full" 
                  style={{ width: `${percentages[star]}%` }}
                />
              </div>
              <div className="text-gray-600 w-8 text-right font-medium">
                {percentages[star]}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Reviews List (Spans 7 columns) */}
<div className="lg:col-span-7 space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
  {reviews.length > 0 ? (
    // We added .slice(-3).reverse() to get the last 3 reviews and show the newest first
    reviews.slice(-3).reverse().map((review) => (
      <div key={review.id} className="bg-[#161616] p-5 rounded-2xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">{review.userName}</h4>
            <div className="flex items-center text-[#FF9100] mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
              ))}
            </div>
          </div>
          <span className="text-xs text-gray-600 font-medium">
            {review.date}
          </span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          {review.comment}
        </p>
      </div>
    ))
  ) : (
    <div className="h-full flex items-center justify-center text-gray-600 text-sm">
      No reviews yet for this product.
    </div>
  )}
</div>

    </div>
  );
};

export default React.memo(ProductReviews);