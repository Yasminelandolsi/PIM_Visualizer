"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { generateNavigationMenuItems } from "../../mockData/categoryData";

const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Memoize menu items to prevent regenerating on every render
  const menuItems = useMemo(() => generateNavigationMenuItems(), []);

  // Memoize the toggle function to maintain stable reference
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <nav className="bg-[#051e50]">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 p-5">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch xl:justify-start">
            <div className="flex shrink-0 items-center ml-2 mr-1">
              <Link href="/" aria-label="Go to home page">
                <Image
                  src="/rubix.avif"
                  width={70}
                  height={60}
                  alt="Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <DesktopMenu menuItems={menuItems} />
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only render when needed */}
      {mobileMenuOpen && <MobileMenu menuItems={menuItems} />}
    </nav>
  );
});

// Add display name for better debugging
Header.displayName = 'Header';

export default Header;