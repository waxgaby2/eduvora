import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { getClasses } from "@/app/lib/db/schooldata";
import SubjectSetup from "@/app/components/setup/SubjectSetup";

export default async function SubjectsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { count, error } = await supabase
    .from("subjects")
    .select("id", { count: "exact", head: true })
    .eq("school_id", user.id);

  if (error) throw new Error("Could not check subjects.");

  if (count && count > 0) {
    redirect("/dashboard");
  }

  const classes = await getClasses();

  return <SubjectSetup classes={classes} />;
}