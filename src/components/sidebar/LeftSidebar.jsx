import React, { useState } from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFeatherPointed,
  faGear,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

// Import reusable components
import SidebarLogo from "./SidebarLogo";
import NavigationItem from "./NavigationItem";
import UserProfile from "./UserProfile";
import "./sidebar.css";

/**
 * LeftSidebar Component - Main navigation sidebar for the application
 * Features: Brand logo, navigation menu, user profile section
 * Responsive design with proper semantic HTML and accessibility
 */
const LeftSidebar = () => {
  // State for active navigation item
  const [activeNavItem, setActiveNavItem] = useState('home');

  // Navigation items configuration
  const navigationItems = [
    {
      id: 'home',
      icon: faHome,
      label: 'Home',
      href: '/home',
      isActive: activeNavItem === 'home'
    },
    {
      id: 'new-post',
      icon: faFeatherPointed,
      label: 'New Post',
      href: '/new-post',
      isActive: activeNavItem === 'new-post'
    },
    {
      id: 'chats',
      icon: faEnvelope,
      label: 'Chats',
      href: '/chats',
      badgeCount: 3,
      isActive: activeNavItem === 'chats'
    },
    {
      id: 'settings',
      icon: faGear,
      label: 'Settings',
      href: '/settings',
      isActive: activeNavItem === 'settings'
    }
  ];

  // Handle navigation item click
  const handleNavClick = (itemId) => {
    setActiveNavItem(itemId);
    // Add your navigation logic here (e.g., router navigation)
    console.log(`Navigating to: ${itemId}`);
  };

  // Handle user profile click
  const handleProfileClick = () => {
    console.log('Profile clicked - open user menu or navigate to profile');
    // Add your profile interaction logic here
  };

  return (
    <aside 
      className="
        bg-[#618b5f] text-[#faf8f0] sticky top-0 h-screen overflow-y-auto 
        flex w-full flex-col border-r-2 border-[#faf8f01a] px-6 py-6
        shadow-lg transition-all duration-300
      "
      aria-label="Main navigation sidebar"
      role="navigation"
    >
      {/* Brand Logo Section */}
      <SidebarLogo brandName="VerseNest" />

      {/* Main Navigation Menu */}
      <nav className="flex-grow mb-6" role="navigation" aria-label="Main menu">
        <ul className="space-y-2" role="list">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={item.isActive}
              badgeCount={item.badgeCount}
              onClick={() => handleNavClick(item.id)}
              className="transition-all duration-200"
            />
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <UserProfile
        name="Rabindranath Tagore"
        title="Wandering Wordsmith"
        avatarSrc="/Rabindranath.avif"
        avatarAlt="Profile picture of Rabindranath Tagore"
        onClick={handleProfileClick}
        className="mt-auto"
      />
    </aside>
  );
};

export default LeftSidebar;
