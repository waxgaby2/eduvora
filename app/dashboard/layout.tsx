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

 const { data: school } = await supabase
  .from("schools")
  .select("*")
  .eq("id", user?.id)
  .single();

  return (
    <div className="flex min-h-screen text-black bg-slate-50">
    <Sidebar schoolName={school?.school_name} schoolCode={school?.school_code} />
      <div className="flex-1">
        <Header schoolName={school?.school_name} schoolCode={school?.school_code} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}