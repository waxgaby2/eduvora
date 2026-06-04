import { RegisterForm } from "../components/registration/form";


export default function RegisterPage() {
 
  return (
    <div className="flex flex-col py-20 min-h-screen text-slate-900 items-center bg-indigo-100 px-4">

      {/* Header */}
      <h1 className="text-3xl lg:text-4xl font-bold">
        Create Your Eduvora Account
      </h1>

      <p className="mt-1 text-sm pt-3 pb-8 text-slate-700">
        Start creating and managing assessments in minutes.
      </p>
<RegisterForm />
    </div>
  );
}