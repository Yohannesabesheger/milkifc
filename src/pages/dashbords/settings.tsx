// pages/settings-dashboard.tsx
import React from "react";
import Link from "next/link";
import { 
  Building, 
  Cog, 
  Archive, 
  Truck, 
  Columns, 
  Home,
  HomeIcon
} from "lucide-react";

const settingsSubmenus = [
  {
    name: "Company",
    href: "/setting-collection/company-create",
    icon: Building,
    description: "Manage company details and information.",
  },
  {
    name: "Factories",
    href: "/setting-collection/factory-create",
    icon: Cog,
    description: "Manage factories associated with your company.",
  },
  {
    name: "Warehouses",
    href: "/setting-collection/warehouse-create",
    icon: Archive,
    description: "Manage warehouses linked to factories.",
  },
  {
    name: "Suppliers",
    href: "/setting-collection/supplier-create",
    icon: Truck,
    description: "Manage suppliers and contacts.",
  },
  {
    name: "Product Lines",
    href: "/setting-collection/product",
    icon: Columns,
    description: "Manage product lines and categories.",
  },
  {
    name: "Warehouse Products",
    href: "/setting-collection/warehouse-product-create",
    icon: HomeIcon,
    description: "Manage products stored in warehouses.",
  },
];

const SettingsDashboard: React.FC = () => {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Settings Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {settingsSubmenus.map((submenu) => {
          const Icon = submenu.icon;
          return (
            <Link
              key={submenu.name}
              href={submenu.href}
              className="flex items-start p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex-shrink-0">
                <Icon className="w-10 h-10 text-blue-600 mr-4" />
              </div>
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

export default SettingsDashboard;
