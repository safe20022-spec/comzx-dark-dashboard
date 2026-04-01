import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Sun, ShoppingCart } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  // Dynamic title based on the current URL path
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/products':
        return 'Products List';
      case '/dashboard':
      case '/':
        return 'Dashboard Overview';
      case '/orders':
        return 'Orders Management';
      case '/sales':
        return 'Sales Report';
      case '/reviews':
        return 'Customer Reviews';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <header className="flex items-center justify-between p-6 bg-[#0B0B0B] border-b border-white/5">
      
      {/* 1. Dynamic Title based on page */}
      <div>
        <h1 className="text-2xl font-bold text-white transition-all duration-300">
          {getHeaderTitle()}
        </h1>
      </div>

      {/* 2. Actions & User Profile (Keep your existing design here) */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <button className="text-gray-500 hover:text-white transition-colors">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="text-gray-500 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-[#FF9100] text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
            1
          </span>
        </div>

        {/* Theme Toggle */}
        <button className="text-gray-500 hover:text-white transition-colors">
          <Sun size={20} />
        </button>

        {/* Cart */}
        <div className="relative">
          <button className="text-gray-500 hover:text-white transition-colors">
            <ShoppingCart size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-[#FF9100] text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 border-l border-white/5 pl-6">
          <div className="text-right hidden md:block">
            <h4 className="text-white text-sm font-bold">Gladys Kanyinda</h4>
            <span className="text-xs text-gray-600 block">Admin</span>
          </div>
          <div className="w-10 h-10 bg-[#FF9100] rounded-full flex items-center justify-center text-black font-bold text-sm">
            GK
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);