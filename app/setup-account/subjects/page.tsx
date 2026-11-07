import { getClasses } from "@/app/lib/db/schooldata";
import SubjectSetup from "@/app/components/setup/SubjectSetup";

export default async function SubjectsPage() {
  const classes = await getClasses();

  return <SubjectSetup classes={classes} />;
}