import Link from "next/link"

export function Header(){
    return (
        <header
  className={`sticky top-0 z-50 flex w-full items-center
  justify-between border-b border-slate-200/80
  bg-[#F8FAFC]/95 px-4 py-3 backdrop-blur-md
  sm:px-6 lg:px-10`}
>
  <div
    className={`mx-auto flex w-full max-w-7xl
    items-center justify-between`}
  >
    <h1
      className={`text-2xl font-bold tracking-tight
      text-indigo-900`}
    >
      Eduvora
    </h1>

    <nav
      className={`hidden items-center gap-8
      text-sm font-medium text-slate-600
      lg:flex`}
    >
      <a
        href="#"
        className={`transition-colors duration-300
        hover:text-[#4F46E5]`}
      >
        Features
      </a>

      <a
        href="#"
        className={`transition-colors duration-300
        hover:text-[#4F46E5]`}
      >
        Solutions
      </a>

      <a
        href="#"
        className={`transition-colors duration-300
        hover:text-[#4F46E5]`}
      >
        Pricing
      </a>

      <a
        href="#"
        className={`transition-colors duration-300
        hover:text-[#4F46E5]`}
      >
        Contact
      </a>
    </nav>
     <div
        className={`flex gap-4`}
      >
       <Link href="/login"
          className={`rounded-2xl border
          border-slate-300 bg-white
          px-5 py-3 text-sm font-semibold
          text-slate-700 transition-all duration-300
          hover:border-[#4F46E5]
          hover:text-[#4F46E5]
          active:scale-95`}
        >
          Login
        </Link>
<Link href="/register" className={`rounded-xl bg-indigo-700
      px-5 py-3 text-sm font-semibold text-white
      transition-all duration-300
      hover:bg-[#4338CA]
      active:scale-95`}
    >
      Get Started
    </Link></div>

    <div className={`flex items-center gap-3 lg:hidden`}>
      <button className="text-slate-700">
        ☰
      </button>
    </div>
  </div>
</header>
    )
}