import { createBrowserRouter, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <div className="w-full"><Outlet /></div>, 
        children: [
          {
            index: true,
            element: <Products />, 
          },
          {
            path: 'detail/:id',
            element: <ProductPage />, 
          },
        ],
      },
    ],
  },
]);