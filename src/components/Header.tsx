import { Search, Bell, Sun, ShoppingCart, ChevronDown, LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-[#0D0D0D] border-b border-white/5">
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-6">
        {/* Search & Tools - Reddish Orange Theme */}
        <div className="flex items-center gap-5 text-[#F97316] border-r border-white/10 pr-6">
          {/* Icons with Hover effect */}
          <button className="hover:scale-110 transition-transform duration-200">
            <Search size={20} strokeWidth={2.5} />
          </button>
          
          <div className="relative">
            <button className="hover:scale-110 transition-transform duration-200">
              <Bell size={20} strokeWidth={2.5} />
            </button>
            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-600 border-2 border-[#0D0D0D] rounded-full"></span>
          </div>

          <button className="hover:scale-110 transition-transform duration-200">
            <Sun size={20} strokeWidth={2.5} />
          </button>

          <div className="relative">
            <button className="hover:scale-110 transition-transform duration-200">
              <ShoppingCart size={20} strokeWidth={2.5} />
            </button>
            {/* Cart Count */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00CFE8] text-[10px] text-white flex items-center justify-center rounded-full font-bold">
              3
            </span>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white group-hover:text-[#F97316] transition-colors">
              Gladys Kanyinda
            </p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-orange-600/50 p-0.5 overflow-hidden transition-all group-hover:border-orange-600">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gladys" 
              className="w-full h-full rounded-full object-cover" 
              alt="Admin Profile" 
            />
          </div>
          <ChevronDown size={16} className="text-gray-500 group-hover:text-orange-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;