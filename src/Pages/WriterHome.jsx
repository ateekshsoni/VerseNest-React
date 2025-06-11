import LeftSidebar from "@/components/sidebar/LeftSidebar";
import React from "react";
import "./Main.css";
const WriterHome = () => {
  return (
    <div className="w-full h-screen grid relative min-h-screen max-w-full mx-auto xl:grid-cols-[220px_1fr_280px] md:grid-cols-[1fr] lg:grid-cols-[80px_1fr_250px]  bg-[#f5ecd9]">
      <LeftSidebar />
    </div>
  );
};

export default WriterHome;
