
export default function AddTeachers() {
  return (
    <form className="space-y-4">
      <div>
      
        <input type="text" aria-label="Teacher name" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Teacher name" />
      </div>

      <div>
        
        <input type="text" aria-label="Subject" className="w-full border p-2 rounded placeholder:text-gray-400" placeholder="Subject" />
      </div>

      <button
        type="button"
        className="w-full bg-indigo-600 text-white p-2 rounded"
      >
        Add Teacher
      </button>
    </form>
  );
}