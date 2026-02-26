"use client";

import { useState } from "react";
import { Search, Bell, LogOut, Settings, User, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 shadow-sm z-30 h-20">
      <div className="px-6 h-full flex items-center justify-between">
        {/* Left: Logo (Visible on Mobile) & Desktop Spacer */}
        <div className="flex items-center gap-4">
          <div className="md:hidden w-8" /> {/* Spacer for Sidebar toggle */}
          <Link
            href="/"
            className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
          >
            AdminHub
          </Link>
        </div>

        {/* Center: Search Bar (Hidden on small screens) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-12">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline text-sm font-medium text-slate-700">
                Admin
              </span>
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-20">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">
                      John Doe
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      admin@example.com
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
