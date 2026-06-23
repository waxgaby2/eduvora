"use client";

import { useMemo, useState } from "react";

const SCHOOL_CLASSES = {
  Nursery: ["Nursery 1", "Nursery 2"],
  Primary: [
    "Primary 1",
    "Primary 2",
    "Primary 3",
    "Primary 4",
    "Primary 5",
    "Primary 6",
  ],
  Secondary: [
    "JSS1",
    "JSS2",
    "JSS3",
    "SSS1",
    "SSS2",
    "SSS3",
  ],
};

export default function SetupAcc() {
  const [schoolTypes, setSchoolTypes] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);

  const [customClass, setCustomClass] = useState("");
  const [subjectInput, setSubjectInput] = useState("");

  const availableClasses = useMemo(() => {
    return schoolTypes.flatMap(
      (type) =>
        SCHOOL_CLASSES[type as keyof typeof SCHOOL_CLASSES] || []
    );
  }, [schoolTypes]);

  function toggleSchoolType(type: string) {
    setSchoolTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  }

  function toggleClass(className: string) {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className]
    );
  }

  function addCustomClass() {
    const value = customClass.trim();
    if (!value) return;

    if (!selectedClasses.includes(value)) {
      setSelectedClasses((prev) => [...prev, value]);
    }

    setCustomClass("");
  }

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

  function removeClass(className: string) {
    setSelectedClasses((prev) =>
      prev.filter((item) => item !== className)
    );
  }

  async function handleCompleteSetup() {
    console.log({
      schoolTypes,
      classes: selectedClasses,
      subjects,
    });
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Set Up Your School Account
          </h1>
          <p className="text-slate-600">
            Configure classes and subjects before adding students and teachers
          </p>
        </div>

        {/* SCHOOL TYPE */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">
            School Type
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Nursery", "Primary", "Secondary"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-indigo-50"
              >
                <input
                  type="checkbox"
                  checked={schoolTypes.includes(type)}
                  onChange={() => toggleSchoolType(type)}
                />
                <span className="text-slate-700">{type}</span>
              </label>
            ))}
          </div>
        </section>

        {/* CLASSES */}
        <section className="bg-white rounded-xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Classes
          </h2>

          {availableClasses.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableClasses.map((className) => (
                <label
                  key={className}
                  className="flex items-center gap-2 p-2 border rounded-lg hover:bg-indigo-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes(className)}
                    onChange={() => toggleClass(className)}
                  />
                  <span className="text-slate-700 text-sm">
                    {className}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* CUSTOM CLASS */}
          <div className="flex gap-2">
            <input
              value={customClass}
              onChange={(e) => setCustomClass(e.target.value)}
              placeholder="Add custom class"
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={addCustomClass}
              className="bg-indigo-700 cursor-pointer text-white px-4 rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          </div>

          {/* SELECTED CLASSES */}
          {selectedClasses.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedClasses.map((item) => (
                <button
                  key={item}
                  onClick={() => removeClass(item)}
                  className="px-3 py-1 text-sm cursor-pointer bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200"
                >
                  {item} ×
                </button>
              ))}
            </div>
          )}
        </section>

        {/* SUBJECTS */}
        <section className="bg-white rounded-xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Subjects
          </h2>

          <div className="flex gap-2">
            <input
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              placeholder="Enter subject"
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={addSubject}
              className="bg-indigo-700 text-white px-4 rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          </div>

          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-2">
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

        {/* SUBMIT */}
        <button
          onClick={handleCompleteSetup}
          className="w-full bg-indigo-700 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}