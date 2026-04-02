import React from 'react';
import { Edit3 } from 'lucide-react';
import type { Product } from '../../Types';

interface ProductHeaderInfoProps {
  product: Product;
}

const ProductHeaderInfo = ({ product }: ProductHeaderInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      
      {/* Product Titles & ID */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">
            PRODUCT ID:
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {product.id}
          </span>
        </div>

        {/* Short Description */}
        <div className="pt-2 max-w-2xl">
          <h4 className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-1">
            Product Short Description
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Edit Button */}
      <button className="flex items-center gap-2 bg-[#161616] hover:bg-[#1C1C1C] text-emerald-500 border border-emerald-500/20 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors h-fit">
        <Edit3 size={16} />
        Edit
      </button>

    </div>
  );
};

export default React.memo(ProductHeaderInfo);