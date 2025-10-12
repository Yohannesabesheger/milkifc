

// import React from "react";

// const HomePage: React.FC = () => {
//   return (
    
//       <div className="space-y-6">

//         {/* Hero Section */}
//         <div className="bg-white shadow-md rounded-lg p-6 text-center">
//           <h1 className="text-2xl font-bold mb-2">Welcome to the Dashboard</h1>
//           <p className="text-gray-600">
//             Resize the window to see the sidebar shrink and the header menu turn into a dropdown.
//           </p>
//         </div>

//         {/* Cards Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white shadow-md rounded-lg p-4 text-center">
//             <h2 className="font-bold text-lg mb-2">Users</h2>
//             <p className="text-gray-600 text-2xl">123</p>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-4 text-center">
//             <h2 className="font-bold text-lg mb-2">Orders</h2>
//             <p className="text-gray-600 text-2xl">45</p>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-4 text-center">
//             <h2 className="font-bold text-lg mb-2">Revenue</h2>
//             <p className="text-gray-600 text-2xl">$5,678</p>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-white shadow-md rounded-lg overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <tr>
//                 <td className="px-4 py-2">John Doe</td>
//                 <td className="px-4 py-2">john@example.com</td>
//                 <td className="px-4 py-2">Admin</td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-2">Jane Smith</td>
//                 <td className="px-4 py-2">jane@example.com</td>
//                 <td className="px-4 py-2">User</td>
//               </tr>
//               <tr>
//                 <td className="px-4 py-2">Bob Johnson</td>
//                 <td className="px-4 py-2">bob@example.com</td>
//                 <td className="px-4 py-2">Moderator</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Responsive Placeholder Boxes */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 1</div>
//           <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 2</div>
//           <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 3</div>
//           <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 4</div>
//         </div>

//       </div>
    
//   );
// };

// export default HomePage;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { StatCard } from "@/components/ui/stat-card";
import { MenuCard } from "@/components/ui/menu-card";
import {
  ShoppingCart,
  Package,
  Factory,
  Warehouse,
  Users,
  Truck,
  ClipboardList,
  Boxes,
} from "lucide-react";

import {
  CORE_ENDPOINTS,
  POSO_ENDPOINTS,
  INVENTORY_ENDPOINTS,
} from "@/lib/apiEndpoints"; // adjust path if needed

export default function Dashboard() {
  const [stats, setStats] = useState({
    stocks: 0,
    factories: 0,
    warehouses: 0,
    suppliers: 0,
    customers: 0,
  });

  const menus = [
    { title: "Purchase Orders", icon: ClipboardList, href: "/purchase-orders" },
    { title: "Sales Orders", icon: ShoppingCart, href: "/sales-orders" },
    { title: "Inventory Management", icon: Boxes, href: "/inventory" },
    { title: "Inventory Operations", icon: Package, href: "/inventory/operations" },
    { title: "Suppliers", icon: Truck, href: "/suppliers" },
    { title: "Customers", icon: Users, href: "/customers" },
  ];

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          stockRes,
          factoryRes,
          warehouseRes,
          supplierRes,
          customerRes,
        ] = await Promise.all([
          axios.get(INVENTORY_ENDPOINTS.STOCKS),
          axios.get(CORE_ENDPOINTS.FACTORIES),
          axios.get(INVENTORY_ENDPOINTS.WAREHOUSES),
          axios.get(POSO_ENDPOINTS.SUPPLIERS),
          axios.get(POSO_ENDPOINTS.CUSTOMERS),
        ]);

        setStats({
          stocks: stockRes.data.count || stockRes.data.length || 0,
          factories: factoryRes.data.count || factoryRes.data.length || 0,
          warehouses: warehouseRes.data.count || warehouseRes.data.length || 0,
          suppliers: supplierRes.data.count || supplierRes.data.length || 0,
          customers: customerRes.data.count || customerRes.data.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { title: "Stocks", value: stats.stocks, icon: Package },
    { title: "Factories", value: stats.factories, icon: Factory },
    { title: "Warehouses", value: stats.warehouses, icon: Warehouse },
    { title: "Suppliers", value: stats.suppliers, icon: Truck },
    { title: "Customers / Users", value: stats.customers, icon: Users },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Main Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map((menu, index) => (
            <MenuCard key={index} title={menu.title} icon={menu.icon} href={menu.href} />
          ))}
        </div>
      </div>
    </div>
  );
}
