// pages/settings.tsx
import React from "react";
import Link from "next/link";
import {
  BuildingOffice2Icon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  UserIcon,
  TruckIcon,
  Squares2X2Icon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const settingsOptions = [
  { 
    name: "Company", 
    href: "/setting-collection/company-create", 
    icon: BuildingOffice2Icon, 
    description: "Manage company details and information.",
    color: "bg-red-100 text-red-600"
  },
  { 
    name: "Factory", 
    href: "/setting-collection/factory-create", 
    icon: Cog6ToothIcon, 
    description: "Manage factories associated with your company.",
    color: "bg-green-100 text-green-600"
  },
  { 
    name: "Warehouses", 
    href: "/setting-collection/warehouse-create", 
    icon: ArchiveBoxIcon, 
    description: "Manage warehouses linked to factories.",
    color: "bg-yellow-100 text-yellow-600"
  },
  { 
    name: "Staff Users", 
    href: "/setting-collection/staff-create", 
    icon: UserIcon, 
    description: "Manage your staff accounts and roles.",
    color: "bg-purple-100 text-purple-600"
  },
  { 
    name: "Suppliers", 
    href: "/setting-collection/supplier-create", 
    icon: TruckIcon, 
    description: "Manage your suppliers and contacts.",
    color: "bg-pink-100 text-pink-600"
  },
  { 
    name: "Product Lines", 
    href: "/setting-collection/product", 
    icon: Squares2X2Icon, 
    description: "Manage product lines and categories.",
    color: "bg-indigo-100 text-indigo-600"
  },
  { 
    name: "Warehouse Products", 
    href: "/setting-collection/warehouse-product-create", 
    icon: CubeIcon, 
    description: "Manage products stored in warehouses.",
    color: "bg-teal-100 text-teal-600"
  },
];

const Settings: React.FC = () => {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {settingsOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.name}
              href={option.href}
              className={`flex items-center p-6 rounded shadow hover:opacity-90 transition ${option.color.replace(/text-[\w-]+/, "bg-white")}`}
            >
              <Icon className={`w-8 h-8 mr-4 flex-shrink-0 ${option.color.split(" ")[1]}`} />
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

export default Settings;
