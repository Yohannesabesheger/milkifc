"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  ActivityIcon,
  Factory,
  ShoppingBasket,
  Package,
  Truck,
  Users,
  FileText,
} from "lucide-react";

type NavItem = {
  name: string;
  href?: string;
  icon: React.ComponentType<any>;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Operations",
    href: "/dashbords/operations",
    icon: Factory,
    children: [
      { name: "Daily Dashboard", href: "/operations/dashboard", icon: ActivityIcon },
      { name: "Order Placements", href: "/operations/orders", icon: ShoppingBasket },
      { name: "New Stock", href: "/operations/new-stock", icon: Package },
      { name: "Transfers", href: "/operations/transfers", icon: Truck },
    ],
  },
  {
    name: "Products",
    href: "/dashbords/product",
    icon: Package,
    children: [
      { name: "Product List", href: "/products", icon: Package },
      { name: "Categories", href: "/products/categories", icon: FileText },
    ],
  },
  {
    name: "Orders",
    href: "/dashbords/orders",
    icon: ShoppingBagIcon,
    children: [
      { name: "Order List", href: "/orders", icon: ShoppingBagIcon },
      { name: "Order Reports", href: "/orders/reports", icon: DocumentTextIcon },
    ],
  },
  {
    name: "Reports",
    href: "/dashbords/Reports",
    icon: DocumentTextIcon,
    children: [
      { name: "Sales Reports", href: "/reports/sales", icon: DocumentTextIcon },
      { name: "Stock Reports", href: "/reports/stock", icon: DocumentTextIcon },
      { name: "User Reports", href: "/reports/users", icon: DocumentTextIcon },
    ],
  },
  {
    name: "Users",
    href: "/dashbords/Profiles",
    icon: Users,
    children: [
      { name: "User Management", href: "/users", icon: UserIcon },
      { name: "Customers", href: "/customers", icon: Users },
      { name: "Suppliers", href: "/suppliers", icon: Truck },
    ],
  },
  {
    name: "Settings",
    href: "/dashbords/settings",
    icon: Cog6ToothIcon,
    children: [
      { name: "Profile Settings", href: "/settings/profile", icon: UserIcon },
      { name: "System Settings", href: "/settings/system", icon: Cog6ToothIcon },
    ],
  },
  { name: "About", href: "/about", icon: InformationCircleIcon },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // Automatically collapse if width < 800, expand if >= 800
      setCollapsed(width < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? "4rem" : "16rem";
  const toggleMenu = (name: string) => setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));

  // If screen width < 500, hide sidebar completely
  if (windowWidth < 500) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="bg-white text-black border-r border-gray-200 shadow-sm transition-all duration-300 flex-shrink-0"
        style={{ width: sidebarWidth }}
      >
        {/* Collapse button */}
        {windowWidth >= 600 && (
          <button
            className="w-full p-2 hover:bg-gray-100 flex justify-center items-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRightIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        )}

        <nav className="flex flex-col mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isActive =
              (item.href && pathname.startsWith(item.href)) ||
              item.children?.some((child) => child.href === pathname);

            return (
              <div key={item.name}>
                <div className="flex items-center">
                  {/* Main menu link */}
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center space-x-2 p-2 w-full rounded 
                      ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                  >
                    <Icon className="w-6 h-6 flex-shrink-0 text-gray-700" />
                    {!collapsed && <span className="text-gray-800">{item.name}</span>}
                  </Link>

                  {/* Chevron for expanding submenu */}
                  {hasChildren && !collapsed && (
                    <button onClick={() => toggleMenu(item.name)} className="p-2 hover:bg-gray-100">
                      {openMenus[item.name] ? (
                        <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {hasChildren && openMenus[item.name] && !collapsed && (
                  <div className="ml-6 flex flex-col space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href || "#"}
                          className={`flex items-center space-x-2 p-2 rounded 
                            ${isChildActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-50 text-gray-700"}`}
                        >
                          <ChildIcon className="w-5 h-5 text-gray-500" />
                          <span>{child.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
