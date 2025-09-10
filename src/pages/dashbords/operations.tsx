import React from "react";
import Link from "next/link";
import { Factory, Package, RefreshCw } from "lucide-react";

const operationsSubmenus = [
  {
    name: "New Stock",
    href: "/op/new-stock",
    icon: Package,
    description: "Add and manage new incoming stock.",
  },
  {
    name: "Transfers",
    href: "/op/transfers",
    icon: RefreshCw,
    description: "Track and manage product transfers.",
  },
  {
    name: "Factories",
    href: "/op/factories",
    icon: Factory,
    description: "Manage your factories and production units.",
  },
];

const OperationsDashboard: React.FC = () => {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Operations Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {operationsSubmenus.map((submenu) => {
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

export default OperationsDashboard;
