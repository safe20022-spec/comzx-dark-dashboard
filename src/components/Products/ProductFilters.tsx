import React from 'react';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const categories = ["Clothing", "Lingerie", "Accessories", "Sportswear", "Body Fit"] as const;

const ProductFilters = ({ 
  selectedCategories, 
  setSelectedCategories, 
  priceRange, 
  setPriceRange 
}: ProductFiltersProps) => {

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setPriceRange([10, 500]);
  };

  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 h-full flex flex-col justify-between space-y-6">
      
      <div className="space-y-6">
        {/* Active Tags & Clear All */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">Filters</h3>
            {(selectedCategories.length > 0 || priceRange[0] !== 10 || priceRange[1] !== 500) && (
              <button 
                onClick={clearAll}
                className="text-xs text-[#FF9100] hover:text-[#FF9100]/80 font-bold"
              >
                CLEAR ALL
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(cat => (
              <div key={cat} className="flex items-center gap-1.5 bg-[#161616] border border-white/5 rounded-full px-3 py-1 text-xs text-white">
                {cat}
                <X size={12} className="cursor-pointer text-gray-500 hover:text-white" onClick={() => handleCategoryChange(cat)} />
              </div>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm">Category</h4>
          <div className="space-y-3">
            {categories.map(category => (
              <label 
                key={category} 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => handleCategoryChange(category)} // Added click handler here
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    selectedCategories.includes(category) 
                      ? 'bg-[#FF9100] border-[#FF9100]' 
                      : 'border-white/10 bg-[#161616] group-hover:border-white/20'
                  }`}>
                    {selectedCategories.includes(category) && (
                      <div className="w-2 h-2 bg-black rounded-sm" />
                    )}
                  </div>
                  <span className={`text-sm transition-colors ${selectedCategories.includes(category) ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {category}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Section placed at the bottom */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-bold text-sm">Price</h4>
        </div>
        
        <div className="space-y-2">
          <input 
            type="range" 
            min="10" 
            max="500" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-[#FF9100] bg-[#161616] h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#161616] border border-white/5 rounded-xl px-4 py-2 text-white text-sm w-full text-center">
            ${priceRange[0]}
          </div>
          <span className="text-gray-700">-</span>
          <div className="bg-[#161616] border border-white/5 rounded-xl px-4 py-2 text-white text-sm w-full text-center">
            ${priceRange[1]}
          </div>
        </div>
      </div>

    </div>
  );
};

export default React.memo(ProductFilters);