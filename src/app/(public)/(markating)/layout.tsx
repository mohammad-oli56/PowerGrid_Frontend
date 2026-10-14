

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { ReactNode, Suspense } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
       <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}