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
  const [collapsed, setCollapsed] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Track window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-collapse for small screens
  useEffect(() => {
    if (windowWidth < 500) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [windowWidth]);

  const sidebarWidth = collapsed ? "w-16" : "w-64";

  return (
    <aside
      className={`bg-gray-800 text-white min-h-screen p-4 transition-all duration-300 ${sidebarWidth}`}
      style={{ overflowY: "hidden", overflowX: "auto" }}
    >
      {/* Collapse button */}
      <button className="mb-6" onClick={() => setCollapsed(!collapsed)}>
        <Bars3Icon className="w-6 h-6" />
      </button>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded"
            >
              {/* Icon always visible */}
              <Icon className="w-6 h-6 flex-shrink-0" />
              {/* Text visible only on >=500px */}
              {windowWidth >= 500 && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
