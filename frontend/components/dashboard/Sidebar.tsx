"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Package,
  Folder,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/dashboard/products", label: "Products", icon: Package },
  { path: "/dashboard/categories", label: "Categories", icon: Folder },
  { path: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { path: "/dashboard/customers", label: "Customers", icon: Users },
  { path: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Replaces useLocation

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:hidden bg-linear-to-r from-indigo-600 to-pink-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-20 h-screen w-48 bg-white border-r border-slate-200 pt-5 transition-transform duration-300 z-40 ${
          isOpen
            ? "translate-x-0 top-0! pt-20!"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">AdminHub</p>
          <p>v2.0.0 (Next.js)</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
