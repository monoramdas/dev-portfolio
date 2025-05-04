import { Outlet } from "react-router";
import React from "react";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

function RootLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 bg-(--dark-background)">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
