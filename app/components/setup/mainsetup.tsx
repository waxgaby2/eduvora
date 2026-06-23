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

    // TODO:
    // Insert into schools/classes/subjects tables
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">
          Set Up Your School Account
        </h1>

        <p className="text-muted-foreground mt-2">
          Configure your school before adding
          students and teachers.
        </p>
      </div>

      {/* School Type */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">
          School Type
        </h2>

        <div className="flex flex-col gap-3">
          {["Nursery", "Primary", "Secondary"].map(
            (type) => (
              <label
                key={type}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={schoolTypes.includes(type)}
                  onChange={() =>
                    toggleSchoolType(type)
                  }
                />

                <span>{type}</span>
              </label>
            )
          )}
        </div>
      </section>

      {/* Classes */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">
          Classes
        </h2>

        {availableClasses.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableClasses.map((className) => (
              <label
                key={className}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(
                    className
                  )}
                  onChange={() =>
                    toggleClass(className)
                  }
                />

                <span>{className}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            value={customClass}
            onChange={(e) =>
              setCustomClass(e.target.value)
            }
            placeholder="Custom class"
            className="border rounded px-3 py-2 flex-1"
          />

          <button
            type="button"
            onClick={addCustomClass}
            className="border px-4 py-2 rounded"
          >
            Add Class
          </button>
        </div>

        {selectedClasses.length > 0 && (
          <div>
            <p className="font-medium mb-2">
              Selected Classes
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedClasses.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    removeClass(item)
                  }
                  className="px-3 py-1 rounded-full border text-sm"
                >
                  {item} ×
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Subjects */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">
          Subjects
        </h2>

        <div className="flex gap-2">
          <input
            value={subjectInput}
            onChange={(e) =>
              setSubjectInput(e.target.value)
            }
            placeholder="Enter subject"
            className="border rounded px-3 py-2 flex-1"
          />

          <button
            type="button"
            onClick={addSubject}
            className="border px-4 py-2 rounded"
          >
            Add Subject
          </button>
        </div>

        {subjects.length > 0 && (
          <div>
            <p className="font-medium mb-2">
              Selected Subjects
            </p>

            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() =>
                    removeSubject(subject)
                  }
                  className="px-3 py-1 rounded-full border text-sm"
                >
                  {subject} ×
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Submit */}
      <button
        onClick={handleCompleteSetup}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium"
      >
        Complete Setup
      </button>
    </div>
  );
}