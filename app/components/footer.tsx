export default function Footer(){
    return (
     <footer
  className={`border-t border-slate-200
  bg-white px-4 py-10
  sm:px-6 lg:px-10`}
>
  <div
    className={`mx-auto flex max-w-7xl
    flex-col items-center justify-between
    gap-6 text-center
    sm:flex-row sm:text-left`}
  >
    <div>
      <h2
        className={`text-xl font-bold
        text-[#312E81]`}
      >
        Eduvora
      </h2>

      <p
        className={`mt-2 text-sm text-slate-500`}
      >
        Modern academic management platform
        for schools and institutions.
      </p>
    </div>

    <div
      className={`flex items-center gap-6
      text-sm text-slate-600`}
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
        Pricing
      </a>

      <a
        href="#"
        className={`transition-colors duration-300
        hover:text-[#4F46E5]`}
      >
        Contact
      </a>
    </div>
  </div>
</footer>   
    )
}