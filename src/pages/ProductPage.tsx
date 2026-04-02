import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';
import ProductReviews from '../components/Products/ProductReviews';
import ProductHeaderInfo from '../components/Products/ProductHeaderInfo';
import ProductStatsCards from '../components/Products/ProductStatsCards';
import { useProducts } from '../hooks/useProducts'; // Imported useProducts

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Call the hook to access its internal methods
  const { getProductSales } = useProducts(productsData);

  // Find the specific product from our mock data based on the URL ID
  const product = productsData.find((p) => p.id === id);

  // Fallback if product is not found
  if (!product) {
    return (
      <div className="text-center text-gray-500 py-20 bg-[#0B0B0B] min-h-screen">
        Product not found or has been removed.
      </div>
    );
  }

  // Get sales data for this specific product to satisfy TypeScript
  const salesData = getProductSales(product.id);

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0B0B0B] min-h-screen">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold"
      >
        <ArrowLeft size={16} />
        BACK TO PRODUCTS
      </button>

      {/* Main Grid Layout for the Product Page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: Product Image (Spans 5 columns) */}
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

        {/* RIGHT SIDE: Product Info & Other Components (Spans 7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          <ProductHeaderInfo product={product} />
          
          {/* Passed the salesData prop here */}
          <ProductStatsCards product={product} salesData={salesData} />

          <ProductReviews product={product} />

        </div>

      </div>
    </div>
  );
};

export default ProductPage;