import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddStudents from "../student/addstudent";
import AddTeachers from "../teacher/addteacher";
export function QuickAccess(){
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h3>

          <div className="mt-6 flex flex-col gap-3">
               <Dialog>
        <DialogTrigger asChild>
           <button  
            className="rounded-2xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:opacity-90">
              Add Student
            </button>
 </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>

          <AddStudents />
        </DialogContent>
      </Dialog>

<Dialog>
        <DialogTrigger asChild>
            <button className="rounded-2xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50">
              Add Teacher
            </button>
</DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>

          <AddTeachers />
        </DialogContent>
      </Dialog>

          </div>
        </div>
    )
}