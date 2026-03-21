import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
  
  <Sidebar /> 

  <div className="flex-1 flex flex-col overflow-y-auto">
   
    <Header />
    
    <main className="p-6">
       
       <Outlet /> 
    </main>
  </div>
</div>
  );
};

export default MainLayout;