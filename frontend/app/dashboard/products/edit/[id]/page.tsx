"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // New router hook
import api from "@/lib/axios";
import { Upload, X, ChevronLeft } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    // ... other fields
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/product", formData);
      router.push("/products"); // Navigate back
      router.refresh(); // Crucial: Refreshes the server data on the products page
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Input Fields Here (same JSX as before) */}

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
