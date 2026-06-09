
export default function AddStudents() {
  return (
    <form className="space-y-4">
      <div>
      
        <input type="text" aria-label="Student name" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Student name" />
      </div>

      <div>
        
        <input type="text" aria-label="class" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Class" />
      </div>

      <button
        type="button"
        className="w-full bg-indigo-600 text-white p-2 rounded"
      >
        Add Student
      </button>
    </form>
  );
}