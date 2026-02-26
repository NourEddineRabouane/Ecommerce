"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2 } from "lucide-react";
import api from "@/lib/axios";

interface ProductFormProps {
  initialData?: any; // If provided, we are in "Edit" mode
  categories: any[];
}

export default function ProductForm({
  initialData,
  categories,
}: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    stockQuantity: initialData?.stockQuantity || "",
    categoryId: initialData?.category?.id || "",
    images: initialData?.images || [], // Assumes API returns array of strings
  });

  // We keep a separate state for new image files vs existing image URLs
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    initialData?.images || [],
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImageFiles((prev) => [...prev, ...files]);

      // Create local preview URLs for the new files
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    // Logic to remove from newImageFiles or formData.images would go here
    // (Simulated for UI purposes)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you might upload images to S3/Cloudinary here first
      // and get URLs back. For now, we submit the JSON.

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        // If your API expects categoryId as a number/string
        categoryId: formData.categoryId,
      };

      if (isEditMode) {
        await api.put(`/product/${initialData.id}`, payload);
      } else {
        await api.post("/product", payload);
      }

      router.push("/products");
      router.refresh(); // Update the products list
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Details */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g., Premium Wireless Headphones"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Stock
              </label>
              <input
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Right Column: Images */}
        <div className="space-y-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Product Images
          </label>

          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-slate-900">
                Click to upload
              </p>
              <p className="text-xs text-slate-500 mt-1">
                SVG, PNG, JPG or GIF (max 5MB)
              </p>
            </div>
          </div>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previewUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200"
                >
                  <img
                    src={url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-70"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditMode ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
