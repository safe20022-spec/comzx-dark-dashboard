import { Search, Bell, Sun, ShoppingCart, ChevronDown, Menu } from 'lucide-react';
import { useUiStore } from '../store/useUiStore';

const Header = () => {
  
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <header className="h-20 flex items-center justify-between p-4 md:px-8 bg-[#0D0D0D] border-b border-white/5 sticky top-0 z-30">
      
      
      <div className="flex items-center gap-4">
        
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-400 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl md:text-2xl font-bold text-white hidden sm:block">Dashboard</h1>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Search & Tools - Reddish Orange Theme */}
        <div className="flex items-center gap-3 md:gap-5 text-[#F97316] border-r border-white/10 pr-4 md:pr-6">
          <button className="hover:scale-110 transition-transform duration-200">
            <Search size={20} strokeWidth={2.5} />
          </button>
          
          <div className="relative">
            <button className="hover:scale-110 transition-transform duration-200">
              <Bell size={20} strokeWidth={2.5} />
            </button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-600 border-2 border-[#0D0D0D] rounded-full"></span>
          </div>

          <button className="hidden xs:block hover:scale-110 transition-transform duration-200">
            <Sun size={20} strokeWidth={2.5} />
          </button>

          <div className="relative">
            <button className="hover:scale-110 transition-transform duration-200">
              <ShoppingCart size={20} strokeWidth={2.5} />
            </button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00CFE8] text-[10px] text-white flex items-center justify-center rounded-full font-bold">
              3
            </span>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-semibold text-white group-hover:text-[#F97316] transition-colors leading-none mb-1">
              Gladys Kanyinda
            </p>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Admin</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-orange-600/50 p-0.5 overflow-hidden transition-all group-hover:border-orange-600">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gladys" 
              className="w-full h-full rounded-full object-cover bg-white/5" 
              alt="Admin Profile" 
            />
          </div>
          <ChevronDown size={14} className="text-gray-500 group-hover:text-orange-600 transition-colors hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default Header;