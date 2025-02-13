import { Outlet } from "react-router-dom";

// Components
import Footer from "@/components/Global/Footer";
import Header from "@/components/Global/Header";
import Newsletter from "@/components/Global/Newsletter";
import React from "react";
import ScrollToTop from "@/components/Global/ScrollToTop";

export default function Website() {
  return (
    <>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
      <ScrollToTop/>
    </>
  );
}
