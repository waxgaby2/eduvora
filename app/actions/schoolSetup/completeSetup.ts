
"use server";

import { createClient } from "@/app/lib/supabase/server";

export async function completeSubjectSetup() {
  const supabase = await createClient();

  // Verify the logged-in user
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

  // Find the school
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

  // Check whether the school has at least one subject
  const { count, error: countError } = await supabase
    .from("subjects")
    .select("id", { count: "exact", head: true })
    .eq("school_id", school.id);

  if (countError) {
    return {
      success: false,
      message: "Could not verify your subjects.",
    };
  }

  if (!count || count < 1) {
    return {
      success: false,
      message: "Please add at least one subject before continuing.",
    };
  }

  // Mark school setup as completed
  const { error: updateError } = await supabase
    .from("schools")
    .update({ setup_completed: true })
    .eq("id", school.id);

  if (updateError) {
    console.error(updateError);

    return {
      success: false,
      message: "Could not complete school setup.",
    };
  }

  return {
    success: true,
    message: "School setup completed successfully!",
  };
}
