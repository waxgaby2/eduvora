"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { createClient } from "@/app/lib/client";
import { toast } from "sonner";
const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    active: true,
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
export default function Sidebar({ schoolName,
  schoolCode,
}: SchoolProps) {

  const pathname=usePathname();

const supabase = createClient();

async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Something went wrong, try again");
    return;
  }
toast.success("Logout Successful")
  window.location.href = "/login";
}

  return (
    <aside className="hidden lg:flex sticky top-0 z-30 h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-900 text-lg font-bold text-white shadow-sm">
            E
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Eduvora
            </h1>
            <p className="text-xs text-slate-500">
              School Management
            </p>
          </div>
        </div>
      </div>

     
      <nav className="flex-1 overflow-y-auto px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-white shadow-sm"
                      : "bg-slate-100 group-hover:bg-white"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <span className="font-medium">{item.name}</span>
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
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-red-100 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}