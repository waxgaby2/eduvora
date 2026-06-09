
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
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
      <aside className="w-64 border-r bg-white">
        Sidebar
      </aside>

      <div className="flex-1">
        <header className="h-16 border-b bg-white">
          Header
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}