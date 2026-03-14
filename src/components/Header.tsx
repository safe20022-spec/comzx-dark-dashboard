import { Search, Bell, Sun, ShoppingCart, ChevronDown, LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-darkBg border-b border-white/5">
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <div className="lg:hidden p-2 text-gray-400"><LayoutDashboard /></div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-6">
        {/* Search & Tools */}
        <div className="flex items-center gap-4 text-gray-400 border-r border-white/10 pr-6">
          <button className="hover:text-accent transition-colors"><Search size={20} /></button>
          <div className="relative">
            <button className="hover:text-accent transition-colors"><Bell size={20} /></button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-[10px] text-white flex items-center justify-center rounded-full border-2 border-darkBg">1</span>
          </div>
          <button className="hover:text-accent transition-colors"><Sun size={20} /></button>
          <button className="hover:text-accent transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-darkBg">3</span>
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">Gladys Kanyinda</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-orange-300 p-0.5">
            <img 
              src="https://ui-avatars.com/api/?name=Gladys+K&background=random" 
              className="w-full h-full rounded-full border-2 border-darkBg" 
              alt="profile" 
            />
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;