import { useState, useEffect } from 'react'; 
import { useUiStore } from '../store/useUiStore';
import OverviewView from '../components/Dashboard/Views/OverviewView';
import SalesView from '../components/Dashboard/Views/SalesView';
import ProductsView from '../components/Dashboard/Views/ProductsView'; 

const Dashboard = () => {
  const { activeTab, setActiveTab } = useUiStore();
  const [visitedTabs, setVisitedTabs] = useState<string[]>(['overview']);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sales', label: 'Sales Analytics' },
    { id: 'products', label: 'products' }, 
  ] as const;

  useEffect(() => {
    if (!visitedTabs.includes(activeTab)) {
      setVisitedTabs((prev) => [...prev, activeTab]);
    }
  }, [activeTab]);

  return (
    <div className="space-y-8 p-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div/>
        
        <div className="flex bg-[#111111] p-1 rounded-2xl border border-white/5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="transition-all duration-500">
        
        <div className={activeTab === 'overview' ? 'block' : 'hidden'}>
          <OverviewView />
        </div>

        {visitedTabs.includes('sales') && (
          <div className={activeTab === 'sales' ? 'block' : 'hidden'}>
            <SalesView />
          </div>
        )}

        {visitedTabs.includes('products') && (
          <div className={activeTab === 'products' ? 'block' : 'hidden'}>
             <ProductsView />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;