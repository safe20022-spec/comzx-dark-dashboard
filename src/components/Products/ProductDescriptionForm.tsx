import React from 'react';

interface ProductDescriptionFormProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

const ProductDescriptionForm = ({
  name,
  setName,
  description,
  setDescription,
}: ProductDescriptionFormProps) => {
  return (
    <div className="bg-[#111111] p-6 rounded-[24px] border border-white/5 space-y-5">
      <h3 className="text-white text-lg font-bold mb-1">Description</h3>

      <div className="bg-[#161616] p-5 rounded-2xl border border-white/5 space-y-5">
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
            className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors placeholder:text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product Description"
            rows={5}
            className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors placeholder:text-gray-700 resize-none"
          />
        </div>

      </div>
    </div>
  );
};

export default React.memo(ProductDescriptionForm);