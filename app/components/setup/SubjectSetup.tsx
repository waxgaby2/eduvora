
"use client";

import { useState } from "react";
import { completeSubjectSetup } from "@/app/actions/schoolSetup/completeSetup";
import { saveClassSubjects } from "@/app/actions/schoolSetup/saveClassSubjects";
import { toast } from "sonner";
import {useRouter} from "next/navigation";
type SchoolClass = {
  id: string;
  class_name: string;
};

type SubjectSetupProps = {
  classes: SchoolClass[];
};

export default function SubjectSetup({
  classes,
}: SubjectSetupProps) {
  // Subjects are stored separately for each class
  const [classSubjects, setClassSubjects] = useState<
    Record<string, string[]>
  >({});
const [loading, setLoading] = useState(false);
const router=useRouter();
  // Each class also has its own input value
  const [subjectInputs, setSubjectInputs] = useState<
    Record<string, string>
  >({});


  function addSubject(classId: string) {
    const value = (subjectInputs[classId] || "").trim();

    if (!value) return;

    const currentSubjects = classSubjects[classId] || [];

    // Prevent duplicate subjects within the same class
    const alreadyExists = currentSubjects.some(
      (subject) => subject.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) return;

    setClassSubjects((prev) => ({
      ...prev,
      [classId]: [...(prev[classId] || []), value],
    }));

    setSubjectInputs((prev) => ({
      ...prev,
      [classId]: "",
    }));
  }

  function removeSubject(classId: string, subject: string) {
    setClassSubjects((prev) => ({
      ...prev,
      [classId]: (prev[classId] || []).filter(
        (item) => item !== subject
      ),
    }));

   
  }
async function handleSubjectComplete() {
  setLoading(true);

  try {
    const assignments = Object.entries(classSubjects)
      .filter(([, subjects]) => subjects.length > 0)
      .map(([classId, subjects]) => ({
        classId,
        subjects,
      }));

    // Save newly added subjects, if any
    if (assignments.length > 0) {
      const saveResult = await saveClassSubjects(assignments);

      if (!saveResult.success) {
        toast.error(saveResult.message);
        return;
      }
    }

    // Check the database and mark setup as complete
    const result = await completeSubjectSetup();

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.replace("/dashboard");
  } catch (error) {
    console.error("Subject setup error:", error);
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-8">

        {/* Page heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Set Up Your Subjects
          </h1>

          <p className="text-slate-600">
            Add the subjects offered in each class.
          </p>
        </div>

        {/* Classes */}
        <section className="space-y-4">
          {classes.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-slate-600">
                No classes found.
              </p>
            </div>
          ) : (
            classes.map((schoolClass) => {
              const subjects = classSubjects[schoolClass.id] || [];

              return (
                <details
                  key={schoolClass.id}
                  className="group bg-white rounded-xl shadow-sm border border-slate-200"
                >
                  {/* Collapsible heading */}
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <div className="space-y-1">
                      <h2 className="font-semibold text-slate-800">
                        {schoolClass.class_name}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {subjects.length === 0
                          ? "No subjects added yet"
                          : `${subjects.length} ${
                              subjects.length === 1
                                ? "subject"
                                : "subjects"
                            } added`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {subjects.length > 0 && (
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
                          {subjects.length}
                        </span>
                      )}

                      <span className="text-slate-500 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </div>
                  </summary>

                  {/* Collapsible content */}
                  <div className="px-5 pb-5 border-t border-slate-100 pt-5 space-y-4">

                    {/* Subject input */}
                    <div className="flex gap-2">
                      <input
                        value={subjectInputs[schoolClass.id] || ""}
                        onChange={(e) =>
                          setSubjectInputs((prev) => ({
                            ...prev,
                            [schoolClass.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSubject(schoolClass.id);
                          }
                        }}
                        placeholder="Enter subject name"
                        className="flex-1 min-w-0 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <button
                        type="button"
                        onClick={() => addSubject(schoolClass.id)}
                        className="bg-indigo-700 text-white px-4 rounded-lg hover:bg-indigo-800"
                      >
                        Add
                      </button>
                    </div>

                    {/* Added subjects */}
                    {subjects.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((subject) => (
                          <span
                            key={subject}
                            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm"
                          >
                            {subject}

                            <button
                              type="button"
                              onClick={() =>
                                removeSubject(
                                  schoolClass.id,
                                  subject
                                )
                              }
                              className="font-semibold hover:text-red-600"
                              aria-label={`Remove ${subject}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">
                        Add the subjects taught in this class.
                      </p>
                    )}
                  </div>
                </details>
              );
            })
          )}
        </section>

        {/* Continue */}
      <button
  type="button"
  onClick={handleSubjectComplete}
  disabled={loading}
  className="w-full bg-indigo-700 text-white py-3 rounded-xl font-semibold disabled:bg-slate-300"
>
  {loading ? "Completing..." : "Done"}
</button>
      </div>
    </div>
  );
}
