"use client";

export default function Greeting() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (<h2 className="text-3xl font-bold text-slate-900">
          {greeting}
        </h2>);
}