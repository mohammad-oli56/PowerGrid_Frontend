import { ReactNode } from "react";
import ProfileSidebar from "./Component/ProfileSidebar";

export default function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - এটি ফিক্সড থাকবে এবং নিজের মতো স্ক্রোল হবে */}
      <aside className="w-64 shrink-0 border-r bg-white overflow-y-auto">
        <ProfileSidebar />
      </aside>

      {/* Right Content - শুধু এই অংশটি স্ক্রোল হবে, সাইডবার স্থির থাকবে */}
      <main className="min-w-0 flex-1 bg-gray-50 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}