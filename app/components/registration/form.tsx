"use client";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { createClient } from "@/app/lib/client";
import { RegisterSchema } from "@/app/lib/validations/register";
import { RegisterType } from "@/app/lib/validations/register";
import Link from "next/link";
import { generateSchoolCode } from "@/app/lib/schoolcode";
export function RegisterForm(){
     const [role, setRole] = useState<"school" | "private tutor">("school");
const [name,setName]=useState<string>("");
const [email,setEmail]=useState<string>("");
const [password,setPassword]=useState<string>("");
const [loading,setLoading]=useState<boolean>(false);
const [confirmPassword,setConfirmPassword]=useState<string>("");
const [passwordMatch,setPasswordMatch]=useState<boolean>(true)
const [errors, setErrors] = useState<
  Partial<Record<keyof RegisterType, string[]>>
>({});
const supabase = createClient();
const router=useRouter();

async function handleRegister() {
  setErrors({});

  const result = RegisterSchema.safeParse({
    name,
    email,
    password,
  });

  if (!result.success) {
    setErrors(result.error.flatten().fieldErrors);
    return;
  }

  if (password !== confirmPassword) {
    setPasswordMatch(false);
    return;
  }

  setPasswordMatch(true);

  try {
    setLoading(true);

    // Create auth account
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role,
          },
        },
      });

    if (authError) {
      alert(authError.message);
      return;
    }

    if (!authData.user) {
      alert("Failed to create user");
      return;
    }

    // Generate unique school code
    let schoolCode = "";
    let exists = true;

    while (exists) {
      schoolCode = generateSchoolCode(name);

      const { data: existingSchool, error } = await supabase
        .from("schools")
        .select("school_code")
        .eq("school_code", schoolCode)
        .maybeSingle();

      if (error) {
        console.error(error);
      }

      exists = !!existingSchool;
    }

    console.log("Generated school code:", schoolCode);

    // Insert school record
    const { error: schoolError } = await supabase
      .from("schools")
      .insert({
        id: authData.user.id,
        school_name: name,
        school_code: schoolCode,
      });

    if (schoolError) {
      console.error(schoolError);
      alert(schoolError.message);
      return;
    }

    alert("Account created successfully!");

    router.push("/login");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
}

    return (<>
    
      <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white p-6 shadow-sm">

        {/* Role Switch */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          
         

          <button
            onClick={() => setRole("school")}
            className={`flex-1 rounded-lg px-3 cursor-pointer py-2 text-sm transition ${
              role === "school"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            School
          </button>

          <button
            onClick={() => setRole("private tutor")}
            className={`flex-1 rounded-lg px-3 py-2 cursor-pointer text-sm transition ${
              role === "private tutor"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
           Private Tutor
          </button>

        </div>

        <form className="mt-6 space-y-4">

          <input
            value={name}
  onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={
              role === "school"
                ? "School name"
                : "Full name"
            }
            className={`w-full rounded-xl border
               border-slate-200 bg-white px-4 py-3
                text-slate-900 outline-none placeholder:text-gray-400
                 focus:border-[#4F46E5]`}
          />
{errors.name && (
  <p className="text-red-500 text-sm mt-1">
    {errors.name[0]}
  </p>
)}
        
            <input
              value={email}
  onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border placeholder:text-gray-400 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#4F46E5]"
            />
        {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email[0]}
  </p>
)}

            <input
             value={password}
  onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border placeholder:text-gray-400 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#4F46E5]"
            />
{errors.password && (
  <p className="text-red-500 text-sm mt-1">
    {errors.password[0]}
  </p>
)}
            <input
             value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-xl border placeholder:text-gray-400 border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#4F46E5]"
            />
{!passwordMatch && (
  <p className="text-red-500 text-sm mt-1">
    Password does not match
  </p>
)}
          
          <button
          onClick={handleRegister}
            type="button"
            disabled={loading}
            className="w-full rounded-xl cursor-pointer bg-[#4F46E5] py-3 font-medium text-white transition disabled:opacity-50 flex items-center justify-center gap-2"
          > 
          {loading && (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
  )}

  {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="mt-5 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
          href="/login"
          className="text-indigo-700 font-medium cursor-pointer">
            Login
          </Link>
        </p>

      </div>
    </>)
}