import { create } from 'zustand';
import type { DashboardTab } from '../Types';



interface UiState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  
  
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: false, 
  
  toggleSidebar: () => 
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    
  closeSidebar: () => 
    set({ isSidebarOpen: false }),

  
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));