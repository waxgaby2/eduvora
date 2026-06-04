'use client'
import { supabase } from "../lib/supabase";
import { useState } from "react";
export default function RegisterPage() {
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);
async function handleLogin() {
  try {
    setLoading(true);

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

   alert("Logged In")
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="flex flex-col pt-20 min-h-screen text-slate-900 items-center bg-indigo-100 px-4">

      <h1 className="text-3xl lg:text-4xl font-bold">
       Login
      </h1>


  <div className="w-full max-w-md mt-6 rounded-2xl border border-white/40 bg-white p-6 shadow-sm">

        
        <form className="mt-6 space-y-4">

     
         
            <input
              value={email}
  onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border placeholder:text-gray-400 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#4F46E5]"
            />
          

            <input
             value={password}
  onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border placeholder:text-gray-400 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#4F46E5]"
            />

       
    <button
  onClick={handleLogin}
  type="button"
  disabled={loading}
  className="w-full rounded-xl cursor-pointer bg-[#4F46E5] py-3 font-medium text-white transition disabled:opacity-50 flex items-center justify-center gap-2"
>
  {loading && (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
  )}

  {loading ? "Logging in..." : "Login"}
</button>

        </form>

        <p className="mt-5 text-center text-xs text-slate-500">
         Are you new?{" "}
          <span className="text-[#4F46E5] font-medium cursor-pointer">
           Register
          </span>
        </p>

      </div>


    </div>
  );
}