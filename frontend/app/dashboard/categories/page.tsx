// src/app/categories/page.tsx
import CategoriesTable from "@/components/CategoriesTable";
import api from "@/lib/axios";

// This is a Server Component by default
export default async function CategoriesPage() {
  // Fetch data directly on the server
  let categories = [];
  try {
    const res = await api.get("/category");
    categories = res.data;
  } catch (error) {
    console.error("Failed to load categories", error);
    // You could also throw an error to show an error boundary
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500 mt-1">Manage your product categories</p>
        </div>
        {/* Add Category Button could go here */}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Pass the server-fetched data down to the client component */}
        <CategoriesTable initialCategories={categories} />
      </div>
    </div>
  );
}
