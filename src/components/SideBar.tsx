import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ClipboardList, BarChart3, Star, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Products', path: '/products', icon: ShoppingBag },
  { name: 'Orders', path: '/orders', icon: ClipboardList },
  { name: 'Sales', path: '/sales', icon: BarChart3 },
  { name: 'Reviews', path: '/reviews', icon: Star },
];

const Sidebar = () => {
  return (
    <aside className="w-[260px] bg-sidebarBg h-screen flex flex-col p-6 border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 bg-accent rounded-sm rotate-45"></div>
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">ComzX</span>
      </div>

      {/* Menu Label */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 px-2">Menu</p>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-gray-400 hover:bg-white/5'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon size={22} />
              <span className="font-medium">{item.name}</span>
            </div>
            {item.name === 'Dashboard' && (
               <span className="bg-orange-400/20 text-orange-400 text-[10px] px-2 py-0.5 rounded-md">2</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Items (Settings & Logout) */}
      <div className="pt-6 border-t border-white/5 space-y-2">
         <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 px-2">Other</p>
         <button className="flex items-center gap-3 px-4 py-3 text-gray-400 w-full hover:bg-white/5 rounded-xl transition-all">
            <Settings size={22} /> <span>Settings</span>
         </button>
         <button className="flex items-center gap-3 px-4 py-3 text-red-400/80 w-full hover:bg-red-400/5 rounded-xl transition-all">
            <LogOut size={22} /> <span>Logout</span>
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;