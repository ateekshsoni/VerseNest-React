import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

/**
 * Reusable sidebar logo component with brand name and animated icon
 * @param {string} brandName - The brand name to display
 * @param {string} className - Additional CSS classes
 */
const SidebarLogo = ({ 
  brandName = "VerseNest", 
  className = "" 
}) => {
  return (
    <header className={`flex items-center mb-10 px-1 ${className}`} role="banner">
      <h1 className="cormorantGaramond gradientText text-3xl mr-2 font-semibold">
        {brandName}
      </h1>
      <div 
        className="animation-bounce text-[#c9b458] text-xl"
        aria-hidden="true"
        title="Feather icon representing writing and poetry"
      >
        <FontAwesomeIcon icon={faFeather} />
      </div>
    </header>
  );
};

export default SidebarLogo;
