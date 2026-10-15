"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  User,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import { logout } from "@/service/logout";


const menuItems = [
  {
    name: "Reset password",
    href: "/profile/reset-password",
    icon: CalendarDays,
  },
  {
    name: "Update Profile",
    href: "/profile/update-profile",
    icon: User,
  },
];



const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout(); // সার্ভার অ্যাকশন কল করা হলো (যা কুকি ডিলিট করবে)
      
      // লগআউটের পর হোমপেজে বা লগইন পেজে রিডাইরেক্ট করে রিফ্রেশ করা
      router.push("/login"); // আপনার পছন্দমতো রাউট দিন (যেমন: "/" বা "/login")
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-900">
            Power<span className="text-blue-600">Grid</span>
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/coustomer-dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          {isLoggingOut ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;