import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BellIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { fetchUserInfo, logout, UserType } from "../lib/api";
import Link from "next/link";
import {
  HomeIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const mainMenu = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Orders", href: "/order-collection", icon: ShoppingBagIcon },
  { name: "Settings", href: "/settings-dashboard", icon: Cog6ToothIcon },
  { name: "Reports", href: "/reports", icon: DocumentTextIcon },
  { name: "Users", href: "/user-collection", icon: UserIcon },
];

const Header: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const u = await fetchUserInfo();
        setUser(u);
      } catch (err) {
        logout();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-16 bg-white shadow">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const mobileMenuItems = (
    <div className="flex flex-col space-y-2 p-4 bg-white shadow-md rounded-md absolute right-4 mt-2 z-40 w-52">
      {mainMenu.map((item) => {
        const Icon = item.icon;
        const active = router.pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
              active ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            <Icon className="w-5 h-5 text-gray-700" />
            <span>{item.name}</span>
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="mt-2 px-2 py-1 text-red-500 hover:text-red-700 rounded"
      >
        Logout
      </button>
    </div>
  );

  return (
    <header className="bg-white shadow-md z-30">
      <div className="flex justify-between items-center py-2 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="font-bold text-lg text-gray-800">MILKI FOOD COMPLEX</span>
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="flex items-center space-x-4">
            <button className="relative">
              <BellIcon className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                3
              </span>
            </button>
            <button className="relative">
              <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold text-white bg-blue-600 rounded-full">
                2
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="w-6 h-6 text-gray-600" />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-gray-700">
                  {user.first_name} {user.last_name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-gray-200 rounded"
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && isMobile && mobileMenuItems}
    </header>
  );
};

export default Header;
