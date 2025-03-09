// Header.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: 'MECHANICAL TRANSMISSION',
      subItems: [
        { label: 'All Mechanical Transmission', href: "#" },
        { label: 'Gears & Gearboxes', href: "#" },
        { label: 'Bearings & Bushings', href: "#" },
        { label: 'Chains & Sprockets', href: "#" },
      ],
    },
    {
      label: 'MACHINING',
      subItems: [
        { label: 'All Machining', href: "#" },
        { label: 'Cutting Tools', href: "#" },
        { label: 'Machine Accessories', href: "#" },
        { label: 'CNC Components', href: "#" },
      ],
    },
    {
      label: 'FLUID TRANSMISSION & FLOW TECHNOLOGY',
      subItems: [
        { label: 'All Fluid Systems', href: "#" },
        { label: 'Pumps & Valves', href: "#" },
        { label: 'Hoses & Fittings', href: "#" },
        { label: 'Hydraulic Systems', href: "#" },
      ],
    },
    {
      label: 'PROTECTION-SAFETY-HYGIENE',
      subItems: [
        { label: 'All Safety Equipment', href: "#" },
        { label: 'PPE', href: "#" },
        { label: 'Machine Guards', href: "#" },
        { label: 'Spill Control', href: "#" },
      ],
    },
    {
      label: 'TOOLS & METROLOGY',
      subItems: [
        { label: 'All Tools', href: "#" },
        { label: 'Hand Tools', href: "#" },
        { label: 'Measuring Instruments', href: "#" },
        { label: 'Calibration Equipment', href: "#" },
      ],
    },
    {
      label: 'MAINTENANCE & REPAIRS',
      subItems: [
        { label: 'All Maintenance', href: "#" },
        { label: 'Lubricants', href: "#" },
        { label: 'Repair Kits', href: "#" },
        { label: 'Diagnostic Tools', href: "#" },
      ],
    },
    {
      label: 'WELDING',
      subItems: [
        { label: 'All Welding', href: "#" },
        { label: 'Welding Machines', href: "#" },
        { label: 'Consumables', href: "#" },
        { label: 'Safety Gear', href: "#" },
      ],
    },
    {
      label: 'INSTALLATION & ASSEMBLY',
      subItems: [
        { label: 'All Installation', href: "#" },
        { label: 'Fasteners', href: "#" },
        { label: 'Adhesives', href: "#" },
        { label: 'Mounting Systems', href: "#" },
      ],
    },
    {
      label: 'EQUIPMENT',
      subItems: [
        { label: 'All Equipment', href: "#" },
        { label: 'Heavy Machinery', href: "#" },
        { label: 'Power Tools', href: "#" },
        { label: 'Material Handling', href: "#" },
      ],
    },
  ];

  
  return (
    <nav className="bg-[#051e50]">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center ml-2 mr-1">
              <Image src="/rubix.avif" width={70} height={60} alt="Logo" className="h-8 w-auto" />
            </div>
            <DesktopMenu menuItems={menuItems} />
          </div>

         
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu menuItems={menuItems} />}
    </nav>
  );
};

export default Header;