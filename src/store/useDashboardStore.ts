import { create } from 'zustand';

interface SalesData {
  name: string;
  sales: number;
}

interface DashboardState {
  weeklySales: SalesData[];
  setWeeklySales: (data: SalesData[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  weeklySales: [],
  isLoading: false,
  setWeeklySales: (data) => set({ weeklySales: data }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));