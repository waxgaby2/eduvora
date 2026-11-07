"use server";

import { getSchool } from "@/app/lib/db/schooldata";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { createClient } from "@/app/lib/supabase/server";
import { string } from "zod";
type CreateClassParams = {
 
  className: string[];
  
};

export async function createClasses(
  params: CreateClassParams
) {
    try {
  const {
   
    className,
  } = params;

  

const school = await getSchool();
for (const classItem of className){

const { data: classExist, error: classError } =
    await supabaseAdmin
      .from("classes")
      .select("class_name")
      .eq("school_id", school?.id)
      .ilike("class_name", classItem)
      .maybeSingle();

if(classError){
    console.error(classError);
   continue;
}
    if(classExist)
    {
    continue;
}else{
      const { error: studentError } =
    await supabaseAdmin
      .from("classes")
      .insert({
      
        school_id: school?.id,
       
        class_name: classItem,
       
      });
}
 return {
      success:true,
     
    };
}
  
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