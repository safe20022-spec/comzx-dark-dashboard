import React from 'react';

interface ProductGeneralInfoProps {
  price: string;
  setPrice: (value: string) => void;
  costPrice: string;
  setCostPrice: (value: string) => void;
  status: 'In Stock' | 'Canceled';
  setStatus: (value: 'In Stock' | 'Canceled') => void;
}

const ProductGeneralInfo = ({
  price,
  setPrice,
  costPrice,
  setCostPrice,
  status,
  setStatus,
}: ProductGeneralInfoProps) => {
  return (
    <div className="bg-[#111111] p-6 rounded-[24px] border border-white/5 space-y-5">
      <h3 className="text-white text-lg font-bold mb-1">General Info</h3>

      <div className="bg-[#161616] p-5 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Price, $
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d*\.?\d*$/.test(val)) {
                setPrice(val);
              }
            }}
            placeholder="0.00"
            className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors placeholder:text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Cost Price, $
          </label>
          <input
            type="text"
            value={costPrice}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d*\.?\d*$/.test(val)) {
                setCostPrice(val);
              }
            }}
            placeholder="0.00"
            className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors placeholder:text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'In Stock' | 'Canceled')}
              className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors cursor-pointer appearance-none"
            >
              <option value="In Stock" className="bg-[#111111]">In Stock</option>
              <option value="Canceled" className="bg-[#111111]">Canceled</option>
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

export default React.memo(ProductGeneralInfo);