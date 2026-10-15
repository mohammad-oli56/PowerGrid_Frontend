import { ReactNode } from "react";
import ProfileSidebar from "./Component/ProfileSidebar";

export default function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex lg:h-screen lg:overflow-hidden">
      {/* Left Sidebar (Mobile top bar + drawer, Desktop fixed sidebar) */}
      <div className="lg:shrink-0">
        <ProfileSidebar />
      </div>

      {/* Right Content Area */}
      <main className="min-w-0 flex-1 lg:overflow-y-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}