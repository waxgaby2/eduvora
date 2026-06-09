"use client";

import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import Menubar from "./menubar";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white lg:px-8 px-3">
  
      <div className="flex flex-row gap-4 justify-center items-center">
  <Menubar />
        <h2 className="mt-1 lg:text-2xl font-bold text-black">
        Greenfield School 
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-52 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notifications */}
        <button type="button" aria-label="notifications" className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50">
          <Bell size={20} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-semibold text-indigo-600">
            A
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-slate-900">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              School Owner
            </p>
          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />
        </button>
      </div>
    </header>
  );
}