// src/app/products/page.tsx
import Link from "next/link";
import { Plus } from "lucide-react";
import ProductTable from "@/components/ProductTable"; // Refactor your table to accept props
import api from "@/lib/axios";
import { Suspense } from "react";
import ProductTableSkeleton from "@/components/skeletons/ProductTableSkeleton";

export default async function ProductsPage() {
  let products = [];
  try {
    const res = await api.get("/product");
    products = res.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">Manage your inventory</p>
        </div>

        <Link
          href="/dashboard/products/add"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Link>
      </div>
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductTable data={products} />
      </Suspense>
    </div>
  );
}
