import LeftSidebar from "@/components/sidebar/LeftSidebar";
import HomeMainContent from "@/components/WriterComponents/HomeMainContent";
import React from "react";
import "./Main.css";

/**
 * WriterHome Page Component
 * 
 * Main page for writers featuring a sidebar and the main content area.
 * Uses a responsive grid layout that adapts to different screen sizes.
 * 
 * @component
 * @returns {JSX.Element} The writer's home page layout
 */
const WriterHome = () => {
  return (
    <div className="w-full h-screen grid relative min-h-screen max-w-full mx-auto xl:grid-cols-[220px_1fr_280px] md:grid-cols-[1fr] lg:grid-cols-[80px_1fr_250px] bg-aged-parchment">
      {/* Left Sidebar */}
      <LeftSidebar />
      
      {/* Main Content Area */}
      <HomeMainContent />
      
      {/* Right Sidebar (Future: Notifications, Trending, etc.) */}
      <aside 
        className="hidden xl:block bg-ivory-white border-l border-verse-border"
        aria-label="Secondary content and recommendations"
      >
        {/* Future: Right sidebar content */}
      </aside>
    </div>
  );
};

export default WriterHome;
