"use server";

import { getSchool } from "@/app/lib/db/schooldata";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

type CreateClassParams = {
  className: string[];
};

export async function createClasses(
  params: CreateClassParams
) {
  try {
    const { className } = params;

    const school = await getSchool();

    if (!school) {
      throw new Error("School not found");
    }

    for (const classItem of className) {
      const { data: classExist, error: classError } =
        await supabaseAdmin
          .from("classes")
          .select("class_name")
          .eq("school_id", school.id)
          .ilike("class_name", classItem)
          .maybeSingle();

      if (classError) {
        throw new Error(classError.message);
      }

      // Skip this class if it already exists
      if (classExist) {
        continue;
      }

      const { error: insertError } = await supabaseAdmin
        .from("classes")
        .insert({
          school_id: school.id,
          class_name: classItem,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }
    }

    // This runs only after ALL classes have been processed
    return {
      success: true,
    };
  } catch (error) {
    console.log("GENERAL ERROR", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    };
  }
}