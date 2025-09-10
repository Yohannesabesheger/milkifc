import React from "react";
import Link from "next/link";
import { FileText, BarChart2, PieChart, Activity } from "lucide-react";

const reportsSubmenus = [
  {
    name: "Sales Report",
    href: "/report/sales",
    icon: FileText,
    description: "Detailed report of sales orders and invoices.",
  },
  {
    name: "Stock Report",
    href: "/report/stock",
    icon: BarChart2,
    description: "Overview of warehouse stock levels and movements.",
  },
  {
    name: "Order Trends",
    href: "/report/orders",
    icon: PieChart,
    description: "Analyze order trends over time.",
  },
  {
    name: "Activity Tracker",
    href: "/report/activities",
    icon: Activity,
    description: "Monitor recent system activities and user actions.",
  },
];

const ReportsDashboard: React.FC = () => {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reportsSubmenus.map((submenu) => {
          const Icon = submenu.icon;
          return (
            <Link
              key={submenu.name}
              href={submenu.href}
              className="p-6 bg-white border shadow-sm rounded-xl hover:shadow-md transition flex items-start"
            >
              <Icon className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h2 className="text-lg font-semibold mb-1">{submenu.name}</h2>
                <p className="text-gray-600 text-sm">{submenu.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default ReportsDashboard;
