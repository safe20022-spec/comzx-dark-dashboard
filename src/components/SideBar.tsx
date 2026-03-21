import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ClipboardList, BarChart3, Star, Settings, LogOut, X } from 'lucide-react';
import { useUiStore } from '../store/useUiStore';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Products', path: '/products', icon: ShoppingBag },
  { name: 'Orders', path: '/orders', icon: ClipboardList },
  { name: 'Sales', path: '/sales', icon: BarChart3 },
  { name: 'Reviews', path: '/reviews', icon: Star },
];

const Sidebar = () => {
  // Get isSidebarOpen && closeSidebar From Zustand
  const { isSidebarOpen, closeSidebar } = useUiStore();

  return (
    <>
      {/* Overlay Only In Phonse */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-[#111111] h-screen flex flex-col p-6 border-r border-white/5
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0 lg:flex // في الشاشات الكبيرة يكون ثابتاً وظاهراً
      `}>
        
        {/* Logo & Close Button (Mobile) */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-orange-500 rounded-sm rotate-45"></div>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">ComzX</span>
          </div>
          
          {/* Close Button Only In Phones */}
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 px-2">Menu</p>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon size={22} />
                <span className="font-medium">{item.name}</span>
              </div>
              {item.name === 'Dashboard' && (
                 <span className="bg-orange-400/20 text-orange-400 text-[10px] px-2 py-0.5 rounded-md font-bold">2</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Items */}
        <div className="pt-6 border-t border-white/5 space-y-2">
           <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 px-2">Other</p>
           <button className="flex items-center gap-3 px-4 py-3 text-gray-400 w-full hover:bg-white/5 rounded-xl transition-all group">
              <Settings size={22} className="group-hover:rotate-45 transition-transform" /> 
              <span>Settings</span>
           </button>
           <button className="flex items-center gap-3 px-4 py-3 text-red-400/80 w-full hover:bg-red-400/5 rounded-xl transition-all">
              <LogOut size={22} /> <span>Logout</span>
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;