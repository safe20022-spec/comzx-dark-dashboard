import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router' // استيراد الخريطة التي أنشأناها
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* هذه هي الطريقة الحديثة والوحيدة التي تدعم الـ Loaders والأداء العالي */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)