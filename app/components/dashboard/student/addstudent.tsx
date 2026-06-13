'use client'
import { DOBPicker } from "../dob";
import { GenderSelect } from "../gender";
import { useState } from "react";
import { createClient } from "@/app/lib/client";
export default function AddStudents({schoolId}:{schoolId:string}) {
    const [dob, setDob] = useState<Date | undefined>();
  const [gender, setGender] = useState("");
const [fullName, setFullName] = useState("");
const [className, setClassName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const supabase=createClient();
const [loading,setLoading]=useState(false);

async function handleAddStudent() {
  try {
    setLoading(true);

    const dobString = dob?.toISOString().split("T")[0];

    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: "student",
          },
        },
      });

    if (authError) {
      alert(authError.message);
      return;
    }

    if (!authData.user) {
      alert("Failed to create student");
      return;
    }

    const studentCode = crypto.randomUUID();

    const { error: studentError } = await supabase
      .from("students")
      .insert({
        id: authData.user.id,
        school_id: schoolId,
        student_id: studentCode,
        full_name: fullName,
        email,
        class_name: className,
        gender,
        dob: dobString,
      });
 const { data: school } = await supabase
  .from("schools")
  .select("student_counter")
  .eq("id", schoolId)
  .single();
  const nextCounter = (school?.student_counter ?? 0) + 1;

const { error } = await supabase
  .from("schools")
  .update({
    student_counter: nextCounter,
  })
  .eq("id", schoolId);
  
    if (studentError) {
      console.error(studentError);
      alert(studentError.message);
      return;
    }

    alert("Student added successfully");

    // reset form
    setFullName("");
    setClassName("");
    setGender("");
    setDob(undefined);
    setEmail("");
    setPassword("");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <form className="space-y-4">
      <div>
      
        <input
          value={fullName}
  onChange={(e) => setFullName(e.target.value)}
        type="text" aria-label="Student name" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Student Name" />
      </div>

      <div>
        
        <input
          value={className}
  onChange={(e) => setClassName(e.target.value)}
   type="text" aria-label="class" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Class" />
      </div>
       <GenderSelect value={gender} onChange={setGender} />

      <DOBPicker value={dob} onChange={setDob} />
  <div>
      
        <input  
  value={email}
  onChange={(e) => setEmail(e.target.value)}
   type="email" aria-label="Student name" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Student Email" />
      </div>
  <div>
      
        <input
          value={password}
  onChange={(e) => setPassword(e.target.value)}
        type="password" aria-label="Student name" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Student Password" />
      </div>

      <button
      onClick={handleAddStudent}
        type="button"
        disabled={loading}
        className="w-full cursor-pointer bg-indigo-600 text-white p-2 rounded"
      > {loading && (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
  )}

  {loading ? "Adding..." : "Add Student"}
        
      </button>
    </form>
  );
}