"use client";

import { addProductAction } from "@/actions/product-actions";
import { useActionState, useRef } from "react";
import {
  AlertCircle,
  Loader2,
  Package,
  DollarSign,
  Layers,
  Upload,
  CheckIcon,
} from "lucide-react";
import Toast from "@/components/dashboard/Toast";

export default function ProductForm() {
  const [state, formAction, isPending] = useActionState(addProductAction, null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = [{ id: 1, name: "electronics" }];

  return (
    <form action={formAction} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          {state?.ok && (
            <Toast
              message="Product was added successfully"
              type="success"
              duration={4000}
              position="top-right"
              animation="bounceIn"
              icon={
                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
              }
            />
          )}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Product Name
            </label>

            <div className="relative">
              <input
                name="name"
                type="text"
                placeholder="e.g. Wireless Noise Cancelling Headphones"
                className={`w-full pl-4 pr-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
                  state?.errors?.name
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />
            </div>

            {state?.errors?.name && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />{" "}
                {state.errors.name || state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Category */}

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category
            </label>

            <div className="relative">
              <Layers className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <select
                name="category"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border appearance-none bg-white transition-all outline-none focus:ring-2 ${
                  state?.errors?.categoryId
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              >
                <option value="">Select a category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {state?.errors?.categoryId && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />{" "}
                {state.errors.categoryId || state.errors?.categoryId[0]}
              </p>
            )}
          </div>

          {/* Price */}

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Price ($)
            </label>

            <div className="relative">
              <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
                  state?.errors?.price
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />
            </div>

            {state?.errors?.price && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />{" "}
                {state.errors.price || state.errors.price[0]}
              </p>
            )}
          </div>

          {/* Stock Quantity */}

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Stock Quantity
            </label>

            <div className="relative">
              <Package className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <input
                name="stockQuantity"
                type="number"
                placeholder="0"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
                  state?.errors?.stockQuantity
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />
            </div>

            {state?.errors?.stockQuantity && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />{" "}
                {state.errors.stockQuantity || state.errors.stockQuantity[0]}
              </p>
            )}
          </div>

          {/* Description */}

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              placeholder="Tell us about the features..."
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none focus:ring-2 ${
                state?.errors?.description
                  ? "border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />

            {state?.errors?.description && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />{" "}
                {state.errors.description || state.errors.description[0]}
              </p>
            )}
          </div>

          {/* Image Upload Field */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Product Images (1-5 images)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`group cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${
                state?.errors?.images
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                name="images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
              />
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">
                  Click to upload images
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG or WebP (Max 5MB per file)
                </p>
              </div>
            </div>

            {/* Image Errors */}
            {state?.errors?.images && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />{" "}
                {state.errors.images || state.errors.images[0]}
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
          <button type="button" className="text-slate-600 font-medium px-4">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-all"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
