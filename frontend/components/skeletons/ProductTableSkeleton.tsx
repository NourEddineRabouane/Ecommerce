export default function ProductTableSkeleton() {
  // Create an array of 5 items to show as placeholders
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
      <div className="overflow-x-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Product", "Price", "Stock", "Actions"].map((header) => (
                <th key={header} className="px-6 py-4 text-left">
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {skeletonRows.map((_, index) => (
              <tr key={index} className="bg-white">
                {/* Product Name & Image */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-slate-200 rounded-lg flex-shrink-0" />
                    <div className="ml-4 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-32" />
                      <div className="h-3 bg-slate-100 rounded w-20" />
                    </div>
                  </div>
                </td>
                {/* Price */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-slate-200 rounded w-12" />
                </td>
                {/* Stock Status */}
                <td className="px-6 py-4">
                  <div className="h-6 bg-slate-200 rounded-full w-20" />
                </td>
                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                    <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
