import { Outlet } from "react-router";
import React from "react";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--dark-background)] text-[var(--text-color-main)]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;
