"use server";

import { supabaseAdmin } from "@/app/lib/supabase/admin";
type CreateStudentParams = {
  schoolId: string;
  fullName: string;
  className: string;
  email: string;
  password: string;
  gender: string;
  dob?: string;
  address: string;
  parent_name: string;
  parent_number: string;
};

export async function createStudent(
  params: CreateStudentParams
) {
    try {
  const {
    schoolId,
    fullName,
    className,
    email,
    password,
    gender,
    dob,
    address,
    parent_name,
    parent_number,
  } = params;

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: "student",
      },
    });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error("Failed to create student");
  }

  const { data: school, error: schoolError } =
    await supabaseAdmin
      .from("schools")
      .select("student_counter")
      .eq("id", schoolId)
      .single();

  if (schoolError) {
    throw new Error(schoolError.message);
  }

  const nextCounter =
    (school?.student_counter ?? 0) + 1;

  const studentCode = `STD-${String(
    nextCounter
  ).padStart(4, "0")}`;

  const { error: studentError } =
    await supabaseAdmin
      .from("students")
      .insert({
        id: authData.user.id,
        school_id: schoolId,
        student_id: studentCode,
        full_name: fullName,
        email,
        class_name: className,
        gender,
        dob,
        address,
        parent_name,
        parent_number,
      });

  if (studentError) {
    throw new Error(studentError.message);
  }

  const { error: counterError } =
    await supabaseAdmin
      .from("schools")
      .update({
        student_counter: nextCounter,
      })
      .eq("id", schoolId);

  if (counterError) {
    throw new Error(counterError.message);
  }

  return {
    success: true,
    studentCode,
  };
} catch (error) {

    console.log("GENERAL ERROR", error);

    return {
      success:false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    };
  }}