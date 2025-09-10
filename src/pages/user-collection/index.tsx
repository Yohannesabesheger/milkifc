// pages/settings/profile.tsx
import React from "react";
import Link from "next/link";
import {
  UserGroupIcon,  // Users
  UserIcon,       // Customers
  TruckIcon,      // Suppliers
  Cog6ToothIcon,  // Profile Settings
} from "@heroicons/react/24/outline";

const profileOptions = [
  {
    name: "Users",
    href: "/users",
    icon: UserGroupIcon,
    description: "Manage staff user accounts and roles.",
    color: "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white",
  },
  {
    name: "Customers",
    href: "/customers",
    icon: UserIcon,
    description: "Manage customer accounts and profiles.",
    color: "bg-gradient-to-r from-pink-500 to-pink-700 text-white",
  },
  {
    name: "Suppliers",
    href: "/suppliers",
    icon: TruckIcon,
    description: "View and manage supplier information.",
    color: "bg-gradient-to-r from-teal-500 to-teal-700 text-white",
  },
  {
    name: "Profile Settings",
    href: "/settings/account",
    icon: Cog6ToothIcon,
    description: "Update your profile and system preferences.",
    color: "bg-gradient-to-r from-gray-600 to-gray-800 text-white",
  },
];

const ProfileDashboard: React.FC = () => {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">User & Profile Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {profileOptions.map((option) => {
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

export default ProfileDashboard;
