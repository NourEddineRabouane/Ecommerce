"use client";

import { Trash2 } from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function CategoriesTable({
  initialCategories,
}: {
  initialCategories: any[];
}) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`/category/${id}`);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (!initialCategories || initialCategories.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="px-6 py-4 text-left font-semibold text-slate-700 text-sm">
            ID
          </th>
          <th className="px-6 py-4 text-left font-semibold text-slate-700 text-sm">
            Name
          </th>
          <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {initialCategories.map((cat) => (
          <tr key={cat.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 text-slate-500 text-sm font-mono">
              {cat.id}
            </td>
            <td className="px-6 py-4 text-slate-900 font-medium">{cat.name}</td>
            <td className="px-6 py-4 text-right">
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-600 hover:text-red-800 text-sm hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
