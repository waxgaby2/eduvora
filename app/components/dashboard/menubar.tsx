"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/app/lib/client";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    href: "/dashboard/students",
    icon: GraduationCap,
  },
  {
    name: "Teachers",
    href: "/dashboard/teachers",
    icon: Users,
  },
  {
    name: "Classes",
    href: "/dashboard/classes",
    icon: BookOpen,
  },
  {
    name: "Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardList,
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
type SchoolProps = {
  schoolName: string;
  schoolCode: string;
};
export default function Menubar({ schoolName,
  schoolCode,
}: SchoolProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const supabase = createClient();

 async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  window.location.href = "/login";
}



useEffect(() => {
  document.body.style.overflow =open
    ? "hidden"
    : "";

  return () => {
    document.body.style.overflow = "";
  };
}, [open]);


  return (
    <div className="lg:hidden ">
      
      <button type="button" aria-label="open menu"
        onClick={() => setOpen(true)}
        className=" z-50 rounded-xl border border-slate-200 bg-white p-2 shadow-sm lg:hidden"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 pb-20 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white">
              E
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Eduvora
              </h1>
              <p className="text-xs text-slate-500">
                School Management
              </p>
            </div>
          </div>

          <button type="button" aria-label="close menu" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-2">
           {menuItems.map((item) => {
  const Icon = item.icon;

  const isActive = pathname === item.href;

  return (
    <Link
      key={item.name}
      href={item.href}
      onClick={() => setOpen(false)}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3
        ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
    >
      <Icon size={18} />
      <span>{item.name}</span>
    </Link>
  );
})}
          </div>
        </nav>
            <div className="border-t border-slate-200 p-4">
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-600">
              A
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {schoolName}
              </h3>

              <p className="text-xs text-slate-500">
               
                School Code: {schoolCode}
              </p>
            </div>
          </div>

          <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
      </aside>

     
    </div>
  );
}