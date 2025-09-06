import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About", href: "/about", icon: InformationCircleIcon },
  { name: "Contact", href: "/contact", icon: DocumentTextIcon },
  { name: "Dashboard", href: "/dashboard", icon: UserIcon },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true); // collapsed by default
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Track window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? "4rem" : "16rem"; // collapsed = 64px, expanded = 256px

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="bg-gray-800 text-white transition-all duration-300 flex-shrink-0"
        style={{
          width: sidebarWidth,
          padding: 0, // remove padding to eliminate gaps
          boxSizing: "border-box",
        }}
      >
        {/* Collapse button: visible only on large screens */}
        {windowWidth >= 500 && (
          <button
            className="w-full p-2 text-white hover:bg-gray-700 flex justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        )}

        <nav className="flex flex-col mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 p-2 hover:bg-gray-700"
              >
                {/* Icon always visible */}
                <Icon className="w-6 h-6 flex-shrink-0" />
                {/* Text visible only on >=500px and when expanded */}
                {windowWidth >= 500 && !collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 m-0 p-0">
        {/* Your page content goes here, fully flush with sidebar */}
      </main>
    </div>
  );
};

export default Sidebar;
