// pages/dashboard/operations.tsx
import React from "react";
import Link from "next/link";
import {
  ClipboardDocumentCheckIcon, // Order Placement
  ArrowUpTrayIcon,            // New Stock
  ArrowsRightLeftIcon,        // Transfers
  CubeIcon,                   // Product Management
} from "@heroicons/react/24/outline";

const operations = [
  {
    name: "Order Placements",
    href: "/orders/create",
    icon: ClipboardDocumentCheckIcon,
    description: "Place new purchase or sales orders with suppliers and customers.",
    color: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
  },
  {
    name: "New Stock",
    href: "/stocks/add",
    icon: ArrowUpTrayIcon,
    description: "Register new stock arrivals and update warehouse inventory.",
    color: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
  },
  {
    name: "Transfers",
    href: "/stocks/transfers",
    icon: ArrowsRightLeftIcon,
    description: "Move stock between warehouses or factory units.",
    color: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
  },
  {
    name: "Product Management",
    href: "/products",
    icon: CubeIcon,
    description: "Manage product information, categories, and units of measure.",
    color: "bg-gradient-to-r from-purple-500 to-pink-600 text-white",
  },
];

const OperationsDashboard: React.FC = () => {
  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Daily Operations Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {operations.map((op) => {
          const Icon = op.icon;
          return (
            <Link
              key={op.name}
              href={op.href}
              className={`flex flex-col p-6 rounded-2xl shadow-md transform hover:scale-105 transition ${op.color}`}
            >
              <div className="flex items-center mb-4">
                <Icon className="w-12 h-12 mr-4" />
                <h2 className="text-2xl font-semibold">{op.name}</h2>
              </div>
              <p className="opacity-90 text-sm">{op.description}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default OperationsDashboard;
