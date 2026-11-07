
"use server";

import { createClient } from "@/app/lib/supabase/server";

type ClassSubjectInput = {
  classId: string;
  subjects: string[];
};

type SaveResult = {
  success: boolean;
  message: string;
};

export async function saveClassSubjects(
  assignments: ClassSubjectInput[]
): Promise<SaveResult> {
  const supabase = await createClient();

  // 1. Verify the logged-in user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  // 2. Find the user's school
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

  // 3. Clean the submitted assignments
  const cleanedAssignments = assignments
    .map((assignment) => ({
      classId: assignment.classId,
      subjects: [
        ...new Set(
          assignment.subjects
            .map((name) => name.trim())
            .filter(Boolean)
            .map((name) => name.toLowerCase())
        ),
      ],
    }))
    .filter((assignment) => assignment.subjects.length > 0);

  if (cleanedAssignments.length === 0) {
    return {
      success: false,
      message: "Please add subjects to at least one class.",
    };
  }

  // 4. Verify that all submitted classes belong to this school
  const classIds = [
    ...new Set(cleanedAssignments.map((item) => item.classId)),
  ];

  const { data: schoolClasses, error: classesError } = await supabase
    .from("classes")
    .select("id")
    .eq("school_id", school.id)
    .in("id", classIds);

  if (classesError || schoolClasses.length !== classIds.length) {
    return {
      success: false,
      message: "Some classes could not be verified.",
    };
  }

  // 5. Collect all unique subject names
  const allSubjectNames = [
    ...new Set(
      cleanedAssignments.flatMap((item) => item.subjects)
    ),
  ];

  // 6. Fetch subjects already belonging to this school
  const { data: existingSubjects, error: subjectsError } =
    await supabase
      .from("subjects")
      .select("id, subject_name")
      .eq("school_id", school.id);

  if (subjectsError) {
    return {
      success: false,
      message: "Could not fetch existing subjects.",
    };
  }

  const subjectMap = new Map(
    existingSubjects.map((subject) => [
      subject.subject_name.trim().toLowerCase(),
      subject.id,
    ])
  );

  // 7. Insert subjects that do not already exist
  const newSubjectNames = allSubjectNames.filter(
    (name) => !subjectMap.has(name)
  );

  if (newSubjectNames.length > 0) {
    const { data: insertedSubjects, error: insertError } =
      await supabase
        .from("subjects")
        .insert(
          newSubjectNames.map((subject_name) => ({
            subject_name,
            school_id: school.id,
          }))
        )
        .select("id, subject_name");

    if (insertError || !insertedSubjects) {
      console.error("Subject insertion error:", insertError);

      return {
        success: false,
        message: "Could not save new subjects.",
      };
    }

    insertedSubjects.forEach((subject) => {
      subjectMap.set(
        subject.subject_name.trim().toLowerCase(),
        subject.id
      );
    });
  }

  // 8. Fetch existing class-subject relationships
  const { data: existingAssignments, error: assignmentError } =
    await supabase
      .from("class_subjects")
      .select("class_id, subject_id")
      .in("class_id", classIds);

  if (assignmentError) {
    return {
      success: false,
      message: "Could not check existing class assignments.",
    };
  }

  const existingPairs = new Set(
    existingAssignments.map(
      (item) => `${item.class_id}:${item.subject_id}`
    )
  );

  // 9. Prepare new class-subject relationships
  const newAssignments = cleanedAssignments.flatMap(
    (assignment) =>
      assignment.subjects
        .map((name) => ({
          class_id: assignment.classId,
          subject_id: subjectMap.get(name)!,
        }))
        .filter(
          (item) =>
            !existingPairs.has(
              `${item.class_id}:${item.subject_id}`
            )
        )
  );

  // 10. Save the relationships
  if (newAssignments.length > 0) {
    const { error: relationshipError } = await supabase
      .from("class_subjects")
      .insert(newAssignments);

    if (relationshipError) {
      console.error("Assignment error:", relationshipError);

      return {
        success: false,
        message: "Could not assign subjects to classes.",
      };
    }
  }

  return {
    success: true,
    message: "Subjects and class assignments saved successfully!",
  };
}
