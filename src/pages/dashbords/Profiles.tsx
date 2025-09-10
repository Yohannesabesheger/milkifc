import React from "react";
import Link from "next/link";
import { User, Users, Shield, Settings } from "lucide-react";

const profilesSubmenus = [
  {
    name: "Users",
    href: "/user-collection",
    icon: Users,
    description: "Manage system users and their roles.",
  },
  {
    name: "Customers",
    href: "/customer-collection",
    icon: User,
    description: "Manage your customers and their details.",
  },
  {
    name: "Staff",
    href: "/staff-collection",
    icon: Shield,
    description: "Manage staff accounts and permissions.",
  },
  {
    name: "Profile Settings",
    href: "/profile-settings",
    icon: Settings,
    description: "Manage your personal profile settings.",
  },
];

const ProfilesDashboard: React.FC = () => {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Profiles Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {profilesSubmenus.map((submenu) => {
          const Icon = submenu.icon;
          return (
            <Link
              key={submenu.name}
              href={submenu.href}
              className="p-6 bg-white border shadow-sm rounded-xl hover:shadow-md transition flex items-start"
            >
              <Icon className="w-8 h-8 text-purple-600 mr-4" />
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

export default ProfilesDashboard;
