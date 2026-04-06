import React from 'react';

export type CategoryType = 'Clothing' | 'Lingerie' | 'Sportswear' | 'Accessories' | '';

interface ProductCategoryFormProps {
  category: CategoryType;
  setCategory: (value: CategoryType) => void;
}

const ProductCategoryForm = ({
  category,
  setCategory,
}: ProductCategoryFormProps) => {
  return (
    <div className="bg-[#111111] p-6 rounded-[24px] border border-white/5 space-y-5">
      <h3 className="text-white text-lg font-bold mb-1">Product Categories</h3>

      <div className="bg-[#161616] p-5 rounded-2xl border border-white/5">
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Product Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors cursor-pointer appearance-none"
            >
              <option value="" className="bg-[#111111] text-gray-600">Select Category</option>
              
              <option value="Clothing" className="bg-[#111111]">Clothing</option>
              <option value="Lingerie" className="bg-[#111111]">Lingerie</option>
              <option value="Sportswear" className="bg-[#111111]">Sportswear</option>
              <option value="Accessories" className="bg-[#111111]">Accessories</option>
            </select>
            
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(ProductCategoryForm);