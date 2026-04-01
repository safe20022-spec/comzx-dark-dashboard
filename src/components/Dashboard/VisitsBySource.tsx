import React from 'react';
import type { SourceDataPoint } from '../../Types';
import { Link2, Search, Smartphone, Share2 } from 'lucide-react';

interface VisitsBySourceProps {
  data: SourceDataPoint[];
  isLoading?: boolean;
}

const VisitsBySource = ({ data, isLoading }: VisitsBySourceProps) => {
  const getIconForSource = (source: string) => {
    switch (source) {
      case 'Social Media': return <Smartphone className="text-gray-600" size={18} />;
      case 'Direct': return <Link2 className="text-gray-600" size={18} />;
      case 'Organic Search': return <Search className="text-gray-600" size={18} />;
      case 'Referral': return <Share2 className="text-gray-600" size={18} />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#111111] rounded-[32px] border border-white/5 h-[380px] flex items-center justify-center text-gray-700">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#2979FF] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold">Loading Visits Data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 w-full flex flex-col justify-between h-[380px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold text-lg mb-6">Visits By Source</h3>
        <div className="bg-[#161616] px-3 py-1 rounded-full border border-white/5 text-xs text-gray-400">
          Week
        </div>
      </div>

      <div className="h-full flex-grow flex flex-col gap-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                {getIconForSource(item.source)}
                <span className="text-gray-400 font-medium tracking-wide uppercase">{item.source}</span>
              </div>
              <span className="text-white font-extrabold text-sm">{item.percentage}%</span>
            </div>

            <div className="w-full h-3.5 bg-[#161616] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${item.percentage}%`, 
                  backgroundColor: item.color,    
                  boxShadow: `0 0 10px ${item.color}30` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(VisitsBySource);