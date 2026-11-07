"use client";

import { useState } from "react";

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
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [loading, setLoading] = useState<boolean | undefined>();

  function addSubject() {
    const value = subjectInput.trim();

    if (!value) return;

    if (!subjects.includes(value)) {
      setSubjects((prev) => [...prev, value]);
    }

    setSubjectInput("");
  }

  function removeSubject(subject: string) {
    setSubjects((prev) =>
      prev.filter((item) => item !== subject)
    );
  }

  async function handleSubjectComplete() {
    setLoading(true);

    console.log({
      subjects,
      classes,
    });

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-10">

        {/* Page heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Set Up Your Subjects
          </h1>

          <p className="text-slate-600">
            Add subjects and assign them to the classes in your school
          </p>
        </div>

        {/* Add subjects section */}
        <section className="bg-white rounded-xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Subjects
          </h2>

          <div className="flex gap-2">
            <input
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              placeholder="Add a subject"
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={addSubject}
              className="bg-indigo-700 cursor-pointer text-white px-4 rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          </div>

          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => removeSubject(subject)}
                  className="px-3 py-1 text-sm cursor-pointer bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200"
                >
                  {subject} ×
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Classes fetched from database */}
        <section className="bg-white rounded-xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Your Classes
          </h2>

          {classes.length === 0 ? (
            <p className="text-slate-600">
              No classes found.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {classes.map((schoolClass) => (
                <div
                  key={schoolClass.id}
                  className="flex items-center p-3 border rounded-lg"
                >
                  <span className="text-slate-700 text-sm">
                    {schoolClass.class_name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Continue */}
        <button
          onClick={handleSubjectComplete}
          disabled={loading || subjects.length < 1}
          className={`w-full ${
            loading
              ? "bg-indigo-500 text-white"
              : "bg-indigo-700 text-white"
          } py-3 rounded-xl font-semibold transition-all duration-1000`}
        >
          {!loading ? "Continue" : "Submitting..."}
        </button>

      </div>
    </div>
  );
}