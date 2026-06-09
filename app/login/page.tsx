
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { LoginForm } from "../components/login/form";
export default async function RegisterPage() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col pt-20 min-h-screen text-slate-900 items-center bg-indigo-100 px-4">

      <h1 className="text-3xl lg:text-4xl font-bold">
       Login
      </h1>

<LoginForm />


    </div>
  );
}