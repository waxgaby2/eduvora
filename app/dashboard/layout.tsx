import Sidebar from "../components/dashboard/sidebar";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import Header from "../components/dashboard/header";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
})

{
    const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
     console.log(user)
  }
 
  return (
    <div className="flex min-h-screen text-black bg-slate-50">
    <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}