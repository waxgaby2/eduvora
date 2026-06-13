import Link from "next/link";

export default function Hero(){
    return(
        <section
  className={`relative overflow-hidden
  bg-[#F8FAFC] px-4 py-20
  sm:px-6 sm:py-6
  lg:px-10 lg:py-10`}
>
  <div
    className={`mx-auto grid max-w-7xl
    items-center gap-14
    lg:grid-cols-2`}
  >
    <div
      className={`flex flex-col
      items-start justify-center`}
    >
      <div
        className={`mb-6 rounded-full
        border border-indigo-100
        bg-indigo-50 px-4 py-2
        text-sm font-medium text-indigo-700`}
      >
        Modern Academic Management Platform
      </div>

      <h1
        className={`max-w-xl text-4xl
        font-bold leading-tight tracking-tight
        text-slate-900
        sm:text-3xl
        lg:text-5xl`}
      >
        Streamline Learning,
        Assessments & Academic Workflow
      </h1>

      <p
        className={`mt-6 max-w-lg
        text-base leading-8 text-slate-600
        sm:text-lg`}
      >
        Eduvora helps schools and training institutions
        manage assessments, monitor performance,
        and simplify academic operations from one
        modern platform.
      </p>

      <div
        className={`mt-10 flex flex-col gap-4
        sm:flex-row`}
      >
        <Link href="/register"
          className={`rounded-2xl bg-indigo-700
          px-7 py-4 text-sm font-semibold
          text-white shadow-lg shadow-indigo-200
          transition-all duration-300
          hover:bg-[#4338CA]
          active:scale-95`}
        >
          Get Started
        </Link>

       <Link href="/register"
          className={`rounded-2xl border
          border-slate-300 bg-white
          px-7 py-4 text-sm font-semibold
          text-slate-700 transition-all duration-300
          hover:border-[#4F46E5]
          hover:text-[#4F46E5]
          active:scale-95`}
        >
          Book Demo
        </Link>
      </div>
    </div>

    <div
      className={`relative mx-auto w-full
      max-w-xl rounded-[28px]
      border border-slate-200 bg-white
      p-4 shadow-2xl shadow-slate-200/60`}
    >


   <div className="grid gap-10 p-5 sm:grid-cols-2">
  {/* Card 1 */}
  <div className="rounded-2xl border border-white/20 bg-[#6f6cca]/20 p-5">
    <p className="text-sm font-medium text-black/70">
      Active Students
    </p>

    <h2 className="mt-2 text-3xl font-bold text-[#6f6cca]">
      12,540
    </h2>
  </div>

  {/* Card 2 */}
  <div className="rounded-2xl border border-white/20 bg-[#ca5597]/20 p-5">
    <p className="text-sm font-medium text-black/70">
      Assessments Completed
    </p>

    <h2 className="mt-2 text-3xl font-bold text-[#ca5597]">
      48,320
    </h2>
  </div>

  {/* Card 3 */}
  <div className="rounded-2xl border border-white/20 bg-[#5ad624]/20 p-5">
    <p className="text-sm font-medium text-black/70">
      Institutions
    </p>

    <h2 className="mt-2 text-3xl font-bold text-[#5ad624]">
      120+
    </h2>
  </div>

  {/* Card 4 */}
  <div className="rounded-2xl border border-white/20 bg-[#cdba4d]/20 p-5">
    <p className="text-sm font-medium text-black/70">
      Average Performance
    </p>

    <h2 className="mt-2 text-3xl font-bold text-[#cdba4d]">
      87%
    </h2>
  </div>
</div>
    </div>
  </div>
</section>
    )
}