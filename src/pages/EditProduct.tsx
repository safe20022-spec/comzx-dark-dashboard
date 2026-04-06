import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Link as LinkIcon } from 'lucide-react';
import { fetchAllProducts, updateProduct } from '../services/dashboardService';
import type { Product } from '../Types';
import { toast } from 'react-toastify';

const ALLOWED_CATEGORIES = ['Clothing', 'Lingerie', 'Sportswear', 'Accessories'] as const;

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // State for form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Clothing');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [status, setStatus] = useState<'In Stock' | 'Canceled'>('In Stock');
  const [shortDescription, setShortDescription] = useState('');
  
  // Image states
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

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
          currentProduct.shortDescription && setShortDescription(currentProduct.shortDescription || '');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const localImageUrl = URL.createObjectURL(file);
      setImage(localImageUrl);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    if (!name.trim()) {
      toast.error('Product name cannot be empty!');
      return;
    }
    
    if (!category.trim()) {
      toast.error('Please select a product category!');
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedCost = parseFloat(costPrice);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error('Sale price must be a number greater than zero!');
      return;
    }

    if (isNaN(parsedCost) || parsedCost < 0) {
      toast.error('Cost price cannot be negative!');
      return;
    }

    try {
      setIsSaving(true);
      
      const updatedProduct: Product = {
        id,
        name,
        category: category as any, 
        price: parsedPrice,
        costPrice: parsedCost,
        status,
        shortDescription,
        image, 
        reviews: existingReviews 
      };

      await updateProduct(updatedProduct);
      
      toast.success('Product updated successfully! 🚀');
      
      setTimeout(() => {
        navigate(`/products/detail/${id}`);
      }, 1500);

    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to save changes, please try again.');
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

        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => navigate(`/products/detail/${id}`)}
            className="px-6 py-3 bg-[#161616] border border-white/5 rounded-2xl text-white text-sm font-bold hover:bg-[#222222] transition-colors"
          >
            Cancel
          </button>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#FF9100] text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#FF9100]/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-8 bg-[#111111] p-6 rounded-[32px] border border-white/5 space-y-6">
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

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={4}
              className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors resize-none"
            />
          </div>

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

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
                required
              >
                {ALLOWED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
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

          <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase">Product Image</label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 text-xs text-[#FF9100] font-bold hover:text-[#FF9100]/80 transition-colors"
              >
                <Upload size={14} />
                Upload File
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-600">
                <LinkIcon size={16} />
              </span>
              <input
                type="text"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImageFile(null);
                }}
                placeholder="Paste image URL here"
                className="w-full bg-[#161616] border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#FF9100]/30 transition-colors"
              />
            </div>
            
            {image && (
              <div className="relative aspect-square bg-[#161616] rounded-2xl overflow-hidden flex items-center justify-center border border-white/5 mt-2">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                {imageFile && (
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white">
                    Local File
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;