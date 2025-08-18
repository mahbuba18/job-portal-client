import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";
import ScrollToTop from "../pages/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <ScrollToTop></ScrollToTop>
      <Navbar />
      <main className="min-h-screen pt-20"> {/* added padding */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
