import React, { useRef } from 'react';
import { CloudUpload, Trash2 } from 'lucide-react';

interface ProductGalleryUploadProps {
  // الصورة ستكون إما نصاً (URL) أو File Object عند الرفع المحلي
  image: File | string | null; 
  setImage: (image: File | null) => void;
}

const ProductGalleryUpload = ({
  image,
  setImage,
}: ProductGalleryUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // نأخذ الملف الأول فقط بناءً على طلبك (صورة واحدة)
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // نأخذ الملف الأول فقط
      setImage(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // مسح اختيار الملف من المدخل
    }
  };

  // إنشاء رابط مؤقت لعرض الصورة المرفوعة محلياً
  const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;

  return (
    <div className="bg-[#111111] p-6 rounded-[24px] border border-white/5 space-y-5">
      {/* عنوان المكون */}
      <h3 className="text-white text-lg font-bold mb-1">Product Gallery</h3>

      {/* منطقة الرفع/العرض */}
      <div
        className={`bg-[#161616] p-5 rounded-2xl border border-white/5 h-[300px] flex items-center justify-center transition-all ${
          !image ? 'hover:border-[#FF9100]/30 cursor-pointer' : ''
        }`}
        onClick={() => !image && fileInputRef.current?.click()} // الضغط لفتح اختيار الملف إذا لم تكن هناك صورة
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" // إخفاء المدخل الافتراضي
        />

        {image ? (
          // عرض الصورة المرفوعة
          <div className="relative group w-full h-full flex items-center justify-center">
            <img
              src={imageUrl || ''}
              alt="Uploaded Product"
              className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
            />
            {/* زر الحذف يظهر عند تمرير الفأرة */}
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-rose-500/20 text-rose-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500/30"
              title="Remove Image"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          // واجهة الرفع
          <div className="text-center space-y-4 text-gray-600">
            <CloudUpload size={48} className="mx-auto" strokeWidth={1} />
            <div className="text-sm">
              <span className="text-[#FF9100] font-medium">Click to upload</span> or drag and drop
            </div>
            <div className="text-xs text-gray-700">
              Only one image allowed. Supports PNG, JPG, JPEG.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductGalleryUpload);