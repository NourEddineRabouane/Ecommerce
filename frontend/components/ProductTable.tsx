"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import { Product } from "@/app/dashboard/types/product";
import Image from "next/image";

interface ProductTableProps {
  data: Product[];
}

export default function ProductTable({ data }: ProductTableProps) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  // Handle Sort
  const handleSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort Data Logic
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Safety check for null/undefined
    if (aValue === undefined || bValue === undefined) return 0;

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/product/${id}`);
      router.refresh(); // Tells Next.js to re-fetch the server data
    } catch (error) {
      alert("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {/* Header Columns */}
              {["name", "price", "stockQuantity"].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof Product)}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-2">
                    {key === "stockQuantity"
                      ? "Stock"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {product.images?.[0] ? (
                        <Image
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.images[0].url}
                          width={10}
                          height={10}
                          alt=""
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          ?
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-slate-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {product.category || "Uncategorized"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stockQuantity < 10
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {product.stockQuantity} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/products/edit/${product.id}`}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
