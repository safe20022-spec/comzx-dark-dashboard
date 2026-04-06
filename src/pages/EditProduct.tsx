import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { fetchAllProducts, updateProduct } from '../services/dashboardService';
import type { Product } from '../Types';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // State for form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [status, setStatus] = useState<'In Stock' | 'Canceled'>('In Stock');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState('');
  
  // To keep existing reviews without losing them
  const [existingReviews, setExistingReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        const products = await fetchAllProducts();
        const currentProduct = products.find((p) => p.id === id);

        if (currentProduct) {
          setName(currentProduct.name);
          setCategory(currentProduct.category);
          setPrice(currentProduct.price.toString());
          setCostPrice(currentProduct.costPrice.toString());
          setStatus(currentProduct.status as 'In Stock' | 'Canceled');
          setShortDescription(currentProduct.shortDescription || '');
          setImage(currentProduct.image || '');
          setExistingReviews(currentProduct.reviews || []);
        }
      } catch (error) {
        console.error('Failed to load product for editing:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    try {
      setIsSaving(true);
      
      const updatedProduct: Product = {
        id, // Keeps the same ID
        name,
        category,
        price: parseFloat(price),
        costPrice: parseFloat(costPrice),
        status,
        shortDescription,
        image,
        reviews: existingReviews // Preserves original reviews
      };

      await updateProduct(updatedProduct);
      
      // Navigate back to the product details page after saving
      navigate(`/products/detail/${id}`);
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-20 bg-[#0B0B0B] min-h-screen">
        Loading product data...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0B0B0B] min-h-screen text-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate(`/products/detail/${id}`)}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold mb-2"
          >
            <ArrowLeft size={16} />
            BACK TO DETAILS
          </button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-gray-500 text-sm mt-1">Update product details and click save</p>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#FF9100] text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#FF9100]/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {isSaving ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Details (Spans 8 columns) */}
        <div className="lg:col-span-8 bg-[#111111] p-6 rounded-[32px] border border-white/5 space-y-6">
          
          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={4}
              className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors resize-none"
            />
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Sale Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Cost Price ($)</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column: Meta & Image (Spans 4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Category */}
          <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'In Stock' | 'Canceled')}
                className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
              >
                <option value="In Stock">In Stock</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>

          {/* Product Image Link */}
          <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 space-y-4">
            <label className="text-xs font-bold text-gray-500 uppercase">Product Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL here"
              className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
            />
            
            {/* Image Preview */}
            {image && (
              <div className="relative aspect-square bg-[#161616] rounded-2xl overflow-hidden flex items-center justify-center border border-white/5 mt-2">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;