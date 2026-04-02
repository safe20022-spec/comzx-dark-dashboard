import React from 'react';
import { DollarSign, ShoppingBag, Box, BarChart3 } from 'lucide-react';
import type { Product } from '../../Types';
import type { ProductSalesData } from '../../hooks/useProducts';

interface ProductStatsCardsProps {
  product: Product;
  salesData: ProductSalesData; // Type received directly from the hook
}

const ProductStatsCards = ({ product, salesData }: ProductStatsCardsProps) => {
  const inStock = 45; // Fixed static stock number

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Current Price */}
      <div className="bg-[#111111] p-5 rounded-[24px] border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">
            Price
          </span>
          <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <DollarSign size={16} />
          </div>
        </div>
        <div className="text-2xl font-bold text-white">
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* 2. Total Orders */}
      <div className="bg-[#111111] p-5 rounded-[24px] border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">
            Total Orders
          </span>
          <div className="w-8 h-8 bg-[#FF9100]/10 rounded-xl flex items-center justify-center text-[#FF9100]">
            <ShoppingBag size={16} />
          </div>
        </div>
        <div className="text-2xl font-bold text-white">
          {salesData.totalOrders}
        </div>
      </div>

      {/* 3. Stock Available */}
      <div className="bg-[#111111] p-5 rounded-[24px] border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">
            In Stock
          </span>
          <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
            <Box size={16} />
          </div>
        </div>
        <div className="text-2xl font-bold text-white">
          {product.status === 'In Stock' ? inStock : 0}
        </div>
      </div>

      {/* 4. Total Earnings */}
      <div className="bg-[#111111] p-5 rounded-[24px] border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">
            Total Earnings
          </span>
          <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
            <BarChart3 size={16} />
          </div>
        </div>
        <div className="text-2xl font-bold text-white">
          ${salesData.totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

    </div>
  );
};

export default React.memo(ProductStatsCards);