
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/logout";
import { LoaderCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  name: string;
  email?: string;
  role: string;
};

export function DropdownMenuDemo({ user }: { user: User }) {
  const router = useRouter();

 const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout(); // সার্ভার অ্যাকশন কল করা হলো (যা কুকি ডিলিট করবে)
      
      // লগআউটের পর হোমপেজে বা লগইন পেজে রিডাইরেক্ট করে রিফ্রেশ করা
      // router.push("/login"); 
      window.location.href="/login"
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const handleDashboard = () => {
    const dashboardPath =
      user.role === "ADMIN"
        ? "/admin-dashboard"
        : user.role === "LANDLORD"
          ? "/landlord-dashboard"
          : user.role === "CUSTOMER"
            ? "/coustomer-dashboard"
            : "/";

    router.push(dashboardPath);
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">{user.name}</Button>}
      />

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user.name}</span>
              {user.email && (
                <span className="text-xs font-normal text-gray-500">
                  {user.email}
                </span>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={handleProfile}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDashboard}>
            Dashboard
          </DropdownMenuItem>

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
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

