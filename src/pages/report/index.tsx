// pages/reports/index.tsx
import React from "react";
import Link from "next/link";
import {
  ChartBarIcon,        // Sales Report
  ShoppingCartIcon,    // Purchase Report
  ClipboardDocumentIcon, // Inventory Report
  UserGroupIcon,       // Customer Report
  TruckIcon,           // Supplier Report
  DocumentTextIcon,    // General Reports
} from "@heroicons/react/24/outline";

const reportOptions = [
  {
    name: "Sales Reports",
    href: "/reports/sales",
    icon: ChartBarIcon,
    description: "Analyze sales performance and revenue trends.",
    color: "bg-gradient-to-r from-green-500 to-green-700 text-white",
  },
  {
    name: "Purchase Reports",
    href: "/reports/purchase",
    icon: ShoppingCartIcon,
    description: "Review purchase history and supplier expenses.",
    color: "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
  },
  {
    name: "Inventory Reports",
    href: "/reports/inventory",
    icon: ClipboardDocumentIcon,
    description: "Track stock levels, shortages, and inventory movements.",
    color: "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white",
  },
  {
    name: "Customer Reports",
    href: "/reports/customers",
    icon: UserGroupIcon,
    description: "View customer activity, trends, and engagement.",
    color: "bg-gradient-to-r from-pink-500 to-pink-700 text-white",
  },
  {
    name: "Supplier Reports",
    href: "/reports/suppliers",
    icon: TruckIcon,
    description: "Monitor supplier performance and deliveries.",
    color: "bg-gradient-to-r from-teal-500 to-teal-700 text-white",
  },
  {
    name: "General Reports",
    href: "/reports/general",
    icon: DocumentTextIcon,
    description: "Access financial and operational summary reports.",
    color: "bg-gradient-to-r from-gray-600 to-gray-800 text-white",
  },
];

const ReportsDashboard: React.FC = () => {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Reports Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {reportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.name}
              href={option.href}
              className={`flex flex-col p-6 rounded-2xl shadow-lg transform hover:scale-105 transition ${option.color}`}
            >
              <div className="flex items-center mb-4">
                <Icon className="w-10 h-10 mr-3" />
                <h2 className="text-2xl font-semibold">{option.name}</h2>
              </div>
              <p className="opacity-90">{option.description}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default ReportsDashboard;
