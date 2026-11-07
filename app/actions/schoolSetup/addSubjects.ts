
"use server";

import { createClient } from "@/app/lib/supabase/server";

type AddSubjectsResult = {
  success: boolean;
  message: string;
};

export async function addSubjects(
  subjectNames: string[]
): Promise<AddSubjectsResult> {
  const supabase = await createClient();

  // 1. Verify the logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  // 2. Get the school belonging to this user
  const { data: school, error: schoolError } = await supabase
    .from("schools")
    .select("id")
    .eq("id", user.id)
    .single();

  if (schoolError || !school) {
    return {
      success: false,
      message: "School not found.",
    };
  }

  // 3. Clean and remove duplicate subject names
  const cleanedSubjects = [
    ...new Map(
      subjectNames
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => [name.toLowerCase(), name])
    ).values(),
  ];

  if (cleanedSubjects.length === 0) {
    return {
      success: false,
      message: "Please add at least one subject.",
    };
  }

  // 4. Check subjects that already exist
  const { data: existingSubjects, error: fetchError } =
    await supabase
      .from("subjects")
      .select("subject_name")
      .eq("school_id", school.id);

  if (fetchError) {
    return {
      success: false,
      message: "Could not check existing subjects.",
    };
  }

  const existingNames = new Set(
    existingSubjects.map((subject) =>
      subject.subject_name.toLowerCase()
    )
  );

  // 5. Keep only new subjects
  const newSubjects = cleanedSubjects.filter(
    (name) => !existingNames.has(name.toLowerCase())
  );

  if (newSubjects.length === 0) {
    return {
      success: true,
      message: "All subjects already exist.",
    };
  }

  // 6. Save subjects to Supabase
  const { error: insertError } = await supabase
    .from("subjects")
    .insert(
      newSubjects.map((subject_name) => ({
        subject_name,
        school_id: school.id,
      }))
    );

  if (insertError) {
    console.error("Subject insertion error:", insertError);

    return {
      success: false,
      message: "Failed to save subjects.",
    };
  }

  return {
    success: true,
    message: "Subjects saved successfully!",
  };
}
