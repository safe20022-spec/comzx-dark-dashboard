import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../Types';

interface ProductGridCardProps {
  product: Product;
}

const ProductGridCard = ({ product }: ProductGridCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/detail/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-[#111111] border border-white/5 rounded-[24px] overflow-hidden hover:border-white/10 transition-colors cursor-pointer group"
    >
      
      {/* Image and Status Badge */}
      <div className="relative aspect-square bg-[#161616] p-4 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#222222] rounded-xl flex items-center justify-center text-gray-700 font-bold">
            IMG
          </div>
        )}

        <span 
          className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-bold ${
            product.status === 'In Stock' 
              ? 'bg-emerald-500/10 text-emerald-500' 
              : 'bg-rose-500/10 text-rose-500'
          }`}
        >
          {product.status}
        </span>
        
        <input 
          type="checkbox" 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 accent-[#FF9100] w-4 h-4 cursor-pointer"
        />
      </div>

      {/* Product Details */}
      <div className="p-5 space-y-3">
        <div>
          <span className="text-xs text-gray-600 font-medium uppercase tracking-wider">
            CATEGORY: {product.category}
          </span>
          <h4 className="text-white text-sm font-bold truncate mt-1">
            {product.name}
          </h4>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-600">
            20.03.2023
          </span>
          <span className="text-[#FF9100] text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductGridCard);