// pages/orders/index.tsx
import React from "react";
import Link from "next/link";
import {
  ShoppingCartIcon,   // Purchase Orders
  CurrencyDollarIcon, // Sales Orders
  ClockIcon,          // Pending Orders
  DocumentTextIcon,   // Invoices
} from "@heroicons/react/24/outline";

const orderOptions = [
  {
    name: "Purchase Orders",
    href: "/orders/purchase",
    icon: ShoppingCartIcon,
    description: "Manage and track all your purchase orders.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Sales Orders",
    href: "/orders/sales",
    icon: CurrencyDollarIcon,
    description: "View and manage your customer sales orders.",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Pending Purchase Orders",
    href: "/orders/purchase/pending",
    icon: ClockIcon,
    description: "Track purchase orders awaiting approval or delivery.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Pending Sales Orders",
    href: "/orders/sales/pending",
    icon: ClockIcon,
    description: "Track sales orders that are still pending.",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Invoices",
    href: "/orders/invoices",
    icon: DocumentTextIcon,
    description: "Check invoices linked to your purchase and sales orders.",
    color: "bg-purple-100 text-purple-600",
  },
];

const OrdersHome: React.FC = () => {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orderOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.name}
              href={option.href}
              className={`flex items-center p-6 rounded shadow hover:opacity-90 transition ${option.color.replace(
                /text-[\w-]+/,
                "bg-white"
              )}`}
            >
              <Icon
                className={`w-8 h-8 mr-4 flex-shrink-0 ${
                  option.color.split(" ")[1]
                }`}
              />
              <div>
                <h2 className="text-xl font-semibold mb-1">{option.name}</h2>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default OrdersHome;
