import { Home, BookOpen, Users, BarChart, Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      

        {/* Dashboard Stats */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Courses" value="120" />
          <StatCard title="Active Students" value="1,450" />
          <StatCard title="Revenue" value="$12,300" />
          <StatCard title="Instructors" value="32" />
        </section>

        {/* Courses Table */}
        <section className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Courses</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">Course Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Students</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <TableRow name="React Basics" category="Web Dev" students="230" status="Active" />
                <TableRow name="Python for Beginners" category="Programming" students="180" status="Active" />
                <TableRow name="Data Science 101" category="Data" students="95" status="Pending" />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
        active ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

function TableRow({ name, category, students, status }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{name}</td>
      <td className="p-3">{category}</td>
      <td className="p-3">{students}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "Active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
