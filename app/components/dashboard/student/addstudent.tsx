"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DOBPicker } from "../dob";
import { GenderSelect } from "../gender";
import { createStudent } from "@/app/actions/students/create-students";
export default function AddStudents({
  schoolId,
}: {
  schoolId: string;
}) {
  const [dob, setDob] = useState<Date | undefined>();
  const [gender, setGender] = useState("");

  const [fullName, setFullName] = useState("");
  const [className, setClassName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [parent_name, setParent_name] = useState("");
  const [parent_number, setParent_number] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleAddStudent() {
    try {
      setLoading(true);

      const dobString =
        dob?.toISOString().split("T")[0];

      const result = await createStudent({
        schoolId,
        fullName,
        className,
        email,
        password,
        gender,
        dob: dobString,
        address,
        parent_name,
        parent_number,
      });


if (!result.success) {
 toast.error(result.error);
 return;
}
      toast.success(
        `Student created successfully (${result.studentCode})`
      );

      setFullName("");
      setClassName("");
      setGender("");
      setDob(undefined);
      setEmail("");
      setPassword("");
      setAddress("");
      setParent_name("");
      setParent_number("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4">
      <div>
        <input
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          type="text"
          placeholder="Student Name"
          className="w-full border p-2 rounded placeholder:text-gray-400"
        />
      </div>

      <div>
        <input
          value={className}
          onChange={(e) =>
            setClassName(e.target.value)
          }
          type="text"
          placeholder="Class"
          className="w-full border p-2 rounded placeholder:text-gray-400"
        />
      </div>

      <GenderSelect
        value={gender}
        onChange={setGender}
      />

      <DOBPicker
        value={dob}
        onChange={setDob}
      />

      <div>
        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          type="email"
          placeholder="Student Email"
          className="w-full border p-2 rounded placeholder:text-gray-400"
        />
      </div>

      <div>
        <input
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          type="password"
          placeholder="Student Password"
          className="w-full border p-2 rounded placeholder:text-gray-400"
        />
      </div>

      <div>
        <input
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          type="text"
          placeholder="Home Address"
          className="w-full border p-2 rounded placeholder:text-gray-400"
        />
      </div>

      <div>
        <input
          value={parent_name}
          onChange={(e) =>
            setParent_name(e.target.value)
          }
          type="text"
          placeholder="Parent Name"
          className="w-full border p-2 rounded placeholder:text-gray-400"
        />
      </div>

      <div>
        <input
          value={parent_number}
          onChange={(e) =>
            setParent_number(e.target.value)
          }
          type="tel"
          placeholder="Parent Number"
          className="w-full border p-2 rounded placeholder:text-gray-400"
        />
      </div>

      <button
        type="button"
        onClick={handleAddStudent}
        disabled={loading}
        className="w-full bg-indigo-600 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}

        {loading
          ? "Adding Student..."
          : "Add Student"}
      </button>
    </form>
  );
}