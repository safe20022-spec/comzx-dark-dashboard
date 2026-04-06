import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // 🛠️ Added hooks
import { ArrowLeft, Edit } from 'lucide-react'; // 🛠️ Added Edit icon
import ProductReviews from '../components/Products/ProductReviews';
import ProductHeaderInfo from '../components/Products/ProductHeaderInfo';
import ProductStatsCards from '../components/Products/ProductStatsCards';
import { useProducts } from '../hooks/useProducts'; 
import { fetchAllProducts } from '../services/dashboardService';
import type { Product } from '../Types';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🛠️ Fetch products dynamically from LocalStorage
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const { getProductSales } = useProducts(products);

  // Find the specific product from dynamically loaded state
  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-20 bg-[#0B0B0B] min-h-screen">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500 py-20 bg-[#0B0B0B] min-h-screen">
        Product not found or has been removed.
      </div>
    );
  }

  const salesData = getProductSales(product.id);

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0B0B0B] min-h-screen">
      
      {/* Header Container with Back and Edit Buttons */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} />
          BACK TO PRODUCTS
        </button>

        {/* 🛠️ ADDED: Edit Product Button */}
        <button 
          onClick={() => navigate(`/products/edit/${product.id}`)}
          className="bg-[#FF9100]/10 text-[#FF9100] font-bold px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#FF9100]/20 transition-colors text-sm"
        >
          <Edit size={16} />
          Edit Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-5 bg-[#111111] p-6 rounded-[32px] border border-white/5 h-fit">
          <div className="relative aspect-square bg-[#161616] rounded-2xl overflow-hidden flex items-center justify-center border border-white/5">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-700 font-bold text-xl">NO IMAGE</span>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ProductHeaderInfo product={product} />
          <ProductStatsCards product={product} salesData={salesData} />
          <ProductReviews product={product} />
        </div>

      </div>
    </div>
  );
};

export default ProductPage;