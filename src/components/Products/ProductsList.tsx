import React, { useState } from 'react';
import { Search, SlidersHorizontal, Download, Plus, LayoutGrid, List, Trash2 } from 'lucide-react'; // 🛠️ Replaced MoreVertical with Trash2
import type { Product } from '../../Types';
import { useProducts } from '../../hooks/useProducts';
import ProductFilters from './ProductFilters';
import ProductGridCard from './ProductGridCard';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../services/dashboardService';

interface ProductsListProps {
  products: Product[] | undefined;
  isLoading?: boolean;
}

const ProductsList = ({ products, isLoading }: ProductsListProps) => {
  const navigate = useNavigate();
  const { 
    searchQuery, 
    setSearchQuery, 
    activeTab, 
    setActiveTab, 
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    filteredProducts, 
    counts 
  } = useProducts(products);

  const [viewMode, setViewMode] = useState<'LIST' | 'GRID'>('LIST');

  // 🛠️ Function to handle delete in list & grid view
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        // Force refresh the page to reload the LocalStorage state
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-gray-500 text-center p-10">Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <ProductFilters 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </div>

      <div className="lg:col-span-3 h-fit">
        <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search Product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-[#161616] p-3 rounded-2xl border border-white/5 text-gray-400 hover:text-white transition-colors">
                <SlidersHorizontal size={18} />
              </button>
              <button className="bg-[#161616] p-3 rounded-2xl border border-white/5 text-gray-400 hover:text-white transition-colors">
                <Download size={18} />
              </button>
              
              <button 
                onClick={() => navigate('/products/create')}
                className="bg-[#FF9100] text-black font-bold px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#FF9100]/90 transition-colors text-sm"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm border-b border-white/5 md:border-b-0 pb-2 md:pb-0">
              <button 
                onClick={() => setActiveTab('ALL')}
                className={`pb-2 px-1 transition-colors ${activeTab === 'ALL' ? 'text-white border-b-2 border-[#FF9100] font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ALL PRODUCTS <span className="text-xs bg-white/5 px-1.5 py-0.5 rounded-full ml-1">{counts.all}</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('AVAILABLE')}
                className={`pb-2 px-1 transition-colors ${activeTab === 'AVAILABLE' ? 'text-white border-b-2 border-[#FF9100] font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                AVAILABLE <span className="text-xs bg-white/5 px-1.5 py-0.5 rounded-full ml-1">{counts.available}</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('DISABLED')}
                className={`pb-2 px-1 transition-colors ${activeTab === 'DISABLED' ? 'text-white border-b-2 border-[#FF9100] font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                DISABLED <span className="text-xs bg-white/5 px-1.5 py-0.5 rounded-full ml-1">{counts.disabled}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 bg-[#161616] p-1 rounded-xl border border-white/5 self-end md:self-auto">
              <button 
                onClick={() => setViewMode('GRID')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'GRID' ? 'bg-[#FF9100] text-black' : 'text-gray-500 hover:text-white'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('LIST')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'LIST' ? 'bg-[#FF9100] text-black' : 'text-gray-500 hover:text-white'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'LIST' ? (
          <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-600 uppercase mb-4 px-4">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Total Earning</div>
              <div className="col-span-1 text-center">Action</div> {/* 🛠️ Added Action label */}
            </div>

            <div className="space-y-3">
              {filteredProducts.map((product) => {
                const estimatedSold = product.reviews ? product.reviews.length * 5 : 10;
                const totalEarning = (product.price - product.costPrice) * estimatedSold;

                return (
                  <div 
                    key={product.id} 
                    onClick={() => navigate(`/products/detail/${product.id}`)}
                    className="grid grid-cols-12 items-center bg-[#161616] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#222222] rounded-xl flex items-center justify-center overflow-hidden border border-white/5">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-600 text-xs font-bold">IMG</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-bold truncate max-w-[180px]">{product.name}</h4>
                        <span className="text-xs text-gray-500 block mt-0.5">CATEGORY: {product.category.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="col-span-2 text-right text-sm font-bold text-white">
                      ${product.price.toFixed(2)}
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <span 
                        className={`text-xs px-3 py-1 rounded-full font-bold ${
                          product.status === 'In Stock' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-rose-500/10 text-rose-500'
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>

                    <div className="col-span-2 text-right text-sm font-bold text-[#FF9100]">
                      ${totalEarning.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>

                    <div className="col-span-1 flex justify-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product.id); // 🛠️ Call delete function
                        }}
                        className="text-gray-600 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductGridCard 
                key={product.id} 
                product={product} 
                onDelete={handleDelete} // 🛠️ Pass delete down to Grid Card
              />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-600 py-10 text-sm bg-[#111111] rounded-[32px] border border-white/5">
            No products found in this section.
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductsList);