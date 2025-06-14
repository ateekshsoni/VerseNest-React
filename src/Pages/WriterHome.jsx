import LeftSidebar from "@/components/sidebar/LeftSidebar";
import HomeMainContent from "@/components/WriterComponents/HomeMainContent";
import RightSidebar from "@/components/sidebar/RightSidebar";
import React from "react";
import "./Main.css";

/**
 * WriterHome Page Component
 * 
 * Main page for writers featuring left sidebar, main content, and right sidebar.
 * Uses a responsive grid layout that adapts to different screen sizes.
 * 
 * @component
 * @returns {JSX.Element} The writer's home page layout
 */
const WriterHome = () => {
  return (
    <div className="w-full h-screen grid relative min-h-screen max-w-full mx-auto xl:grid-cols-[220px_1fr_320px] md:grid-cols-[1fr] lg:grid-cols-[80px_1fr_320px] bg-aged-parchment">
      {/* Left Sidebar */}
      <LeftSidebar />
      
      {/* Main Content Area */}
      <HomeMainContent />
      
      {/* Right Sidebar - Community Features */}
      <RightSidebar />
    </div>
  );
};

export default WriterHome;