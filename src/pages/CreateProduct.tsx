import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductDescriptionForm from '../components/Products/ProductDescriptionForm';
import ProductGeneralInfo from '../components/Products/ProductGeneralInfo';
import ProductCategoryForm from '../components/Products/ProductCategoryForm';
import type { CategoryType } from '../components/Products/ProductCategoryForm';
import ProductGalleryUpload from '../components/Products/ProductGalleryUpload';
import type { Product } from '../Types';

// 1. Import the mock API function you just created
// Note: Replace '../api/products' with your actual file path
import { createNewProduct } from '../services/dashboardService';

interface CreateProductProps {
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CreateProduct = ({ setProducts }: CreateProductProps) => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [status, setStatus] = useState<'In Stock' | 'Canceled'>('In Stock');
  const [image, setImage] = useState<File | null>(null);

  // 2. Marked the function as async to handle the API promise
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !category || !price || !costPrice || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const imageUrl = URL.createObjectURL(image);

    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9), 
      name,
      category: category as "Clothing" | "Lingerie" | "Sportswear" | "Accessories",
      price: parseFloat(price),
      costPrice: parseFloat(costPrice), 
      status: status === 'In Stock' ? 'In Stock' : 'Canceled',
      image: imageUrl,
      reviews: [], 
      shortDescription: description.substring(0, 50) + '...', 
    };

    try {
      // 3. Call the mock API and wait for it to finish pushing to productsData
      await createNewProduct(newProduct);

      console.log('Product created and saved to mock data successfully!');
      
      // 4. Navigate back to products only after the API operation is complete
      navigate('/products');
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Something went wrong while creating the product.');
    }
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0B0B0B] min-h-screen">
      
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} />
          BACK TO PRODUCTS
        </button>
      </div>

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">Create Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-5 space-y-6">
          <ProductDescriptionForm 
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />

          <ProductCategoryForm 
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <ProductGeneralInfo 
              price={price}
              setPrice={setPrice}
              costPrice={costPrice}
              setCostPrice={setCostPrice}
              status={status}
              setStatus={setStatus}
            />

            <ProductGalleryUpload 
              image={image}
              setImage={setImage}
            />
          </div>

          <div className="flex items-center justify-end gap-4 mt-4 bg-[#111111] p-6 rounded-[24px] border border-white/5">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-[#161616] border border-white/5 rounded-2xl text-white text-sm font-bold hover:bg-[#222222] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#FF9100] rounded-2xl text-black text-sm font-bold hover:bg-[#FF9100]/90 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default CreateProduct;