import type { ProductStat } from "../../Types";
interface ProductTableProps {
  products: ProductStat[]; 
}

const ProductTable = ({ products }: ProductTableProps) => {
  
  if (!products || products.length === 0) {
    return (
      <div className="bg-[#1A1A1A] p-8 rounded-[24px] border border-white/5 text-center">
        <p className="text-gray-500 font-medium">No sales data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-[24px] border border-white/5 w-full shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg tracking-tight">Top Selling Products</h3>
        <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">
          Total: {products.length} Products
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
              <th className="pb-4 font-semibold min-w-[250px]">Product Details</th>
              <th className="pb-4 font-semibold">Unit Price</th>
              <th className="pb-4 font-semibold text-center">Qty Sold</th>
              <th className="pb-4 font-semibold text-right">Total Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => {
              const price = product?.price ?? 0;
              const qty = product?.totalQty ?? 0;
              const revenue = product?.totalRevenue ?? 0;
              const name = product?.name ?? "Unknown Product";
              const category = product?.category ?? "N/A";

              return (
                <tr key={product.productId} className="group hover:bg-white/[0.02] transition-all">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image || 'https://via.placeholder.com/40'} 
                        className="w-11 h-11 rounded-xl object-cover bg-white/5" 
                        alt={name} 
                      />
                      <div>
                        <p className="text-white text-sm font-semibold leading-none mb-1 group-hover:text-emerald-400">
                          {name}
                        </p>
                        <p className="text-gray-500 text-[11px] font-medium uppercase">
                          {category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-300 font-medium">
                    ${price.toLocaleString()}
                  </td>
                  <td className="py-4 text-sm text-gray-300 text-center font-mono">
                    {qty.toLocaleString()}
                  </td>
                  <td className="py-4 text-sm font-bold text-emerald-400 text-right">
                    ${revenue.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;