import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import { QuickAccess } from "../components/dashboard/school/quickaccess";

const stats = [
  {
    title: "Students",
    value: "120",
    icon: GraduationCap,
    change: "+12%",
  },
  {
    title: "Teachers",
    value: "18",
    icon: Users,
    change: "+4%",
  },
  {
    title: "Classes",
    value: "12",
    icon: BookOpen,
    change: "+2%",
  },
  {
    title: "Attendance",
    value: "95%",
    icon: ClipboardCheck,
    change: "+8%",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Here's what's happening in your school today.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                  <Icon
                    size={22}
                    className="text-indigo-600"
                  />
                </div>

                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <TrendingUp size={16} />
                  {stat.change}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-sm text-slate-500">
                  {stat.title}
                </h3>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom Grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>

          <div className="mt-6 space-y-5">
            {[
              "5 new students registered",
              "Mathematics attendance submitted",
              "2 teachers added",
              "Class timetable updated",
            ].map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-3"
              >
                <div className="h-3 w-3 rounded-full bg-indigo-600" />

                <p className="text-sm text-slate-600">
                  {activity}
                </p>
              </div>
            ))}
          </div>
        </div>
<QuickAccess />
 
      </section>

      {/* Upcoming Classes */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Upcoming Classes
        </h3>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-4 text-sm font-medium text-slate-500">
                  Subject
                </th>
                <th className="pb-4 text-sm font-medium text-slate-500">
                  Teacher
                </th>
                <th className="pb-4 text-sm font-medium text-slate-500">
                  Class
                </th>
                <th className="pb-4 text-sm font-medium text-slate-500">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-4">Mathematics</td>
                <td className="py-4">Mr. Johnson</td>
                <td className="py-4">JSS 1</td>
                <td className="py-4">09:00 AM</td>
              </tr>

              <tr className="border-b border-slate-100">
                <td className="py-4">English</td>
                <td className="py-4">Mrs. Grace</td>
                <td className="py-4">JSS 2</td>
                <td className="py-4">10:30 AM</td>
              </tr>

              <tr>
                <td className="py-4">Biology</td>
                <td className="py-4">Mr. David</td>
                <td className="py-4">SS 1</td>
                <td className="py-4">12:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}