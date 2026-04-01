import React from 'react';
import type { LucideIcon } from 'lucide-react';


interface StatItem {
  value: string | number;
  label: string;
  icon: LucideIcon;
  gradientClass: string; 
}

interface OverviewGroupCardProps {
  title: string;
  items: StatItem[];
}

const OverviewGroupCard = ({ title, items }: OverviewGroupCardProps) => {
  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 w-full">
      <h3 className="text-white font-bold text-lg mb-5">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={index} 
              className={`relative overflow-hidden p-5 rounded-2xl flex flex-col justify-between h-32 transition-transform hover:scale-[1.02] duration-300 ${item.gradientClass}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                  {item.label}
                </span>
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <IconComponent size={16} className="text-white" />
                </div>
              </div>
              
              <h4 className="text-3xl font-extrabold text-white tracking-tight">
                {item.value}
              </h4>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(OverviewGroupCard);