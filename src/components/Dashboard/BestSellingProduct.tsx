// src/components/Dashboard/BestSellingProduct.tsx

const BestSellingProduct = ({ products }: { products: any[] }) => {
  // نأخذ أول 3 منتجات فقط (الأكثر مبيعاً)
  const topThree = products.slice(0, 3);

  return (
    <div className="bg-[#111111] p-6 rounded-[32px] border border-white/5 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold text-lg uppercase tracking-widest">Top Performers</h3>
        <span className="text-[10px] bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full font-black">THIS WEEK</span>
      </div>

      {/* توزيع أفقي للمنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThree.map((product, index) => (
          <div 
            key={product.id}
            className={`relative overflow-hidden rounded-[24px] border border-white/5 p-5 transition-all duration-500 hover:scale-[1.02] ${
              index === 0 ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111111] border-orange-500/20' : 'bg-[#141414]'
            }`}
          >
            {/* رقم الترتيب كخلفية شفافة كبيرة */}
            <span className="absolute -top-2 -right-2 text-6xl font-black text-white/5 select-none">
              {index + 1}
            </span>

            {/* الصورة في الأعلى ليكون الترتيب أفقياً */}
            <div className="relative mb-4 w-16 h-16 mx-auto">
               <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              {index === 0 && (
                <div className="absolute -bottom-2 -right-2 bg-orange-500 p-1 rounded-lg shadow-lg">
                  <span className="text-[8px] text-white font-black">#1</span>
                </div>
              )}
            </div>

            {/* تفاصيل المنتج مركزة أسفل الصورة */}
            <div className="text-center">
              <h4 className="text-white font-bold text-xs truncate uppercase tracking-tighter mb-1">
                {product.name}
              </h4>
              <div className="text-orange-500 font-black text-lg">${product.price}</div>
              <div className="mt-3 flex justify-center items-center gap-1">
                <span className="text-[9px] text-gray-500 font-bold uppercase">
                  {product.sales} Sold
                </span>
              </div>
            </div>
            
            {/* شريط التقدم الصغير في الأسفل لإعطاء لمسة تقنية */}
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${index === 0 ? 'bg-orange-500' : 'bg-gray-700'}`}
                  style={{ width: `${(product.sales / topThree[0].sales) * 100}%` }}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BestSellingProduct;