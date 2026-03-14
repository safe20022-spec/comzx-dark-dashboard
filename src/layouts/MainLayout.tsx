import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 text-white">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default MainLayout;