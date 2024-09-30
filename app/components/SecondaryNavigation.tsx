"use client"; // Mark this component as client-side
import Link from "next/link"; // Import Link component
import React, { useState } from "react";

const SecondaryNavigation = () => {
  // State to track the active navigation item
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Function to handle click on navigation items
  const handleItemClick = (item: string) => {
    setActiveItem(item); // Set the clicked item as active
  };

  // Define the paths for each tutorial page
  const navItems = [
    { name: "Mathematics", path: "/tutorials/mathematics" },
    { name: "Statistics", path: "/tutorials/statistics" },
    { name: "Python", path: "/tutorials/python" },
    { name: "SQL", path: "/tutorials/sql" },
    { name: "Data Science", path: "/tutorials/data-science" },
  ];

  return (
    <div className="bg-green-500 py-3 w-full">
      <div className="container mx-auto flex justify-around space-x-4 overflow-x-auto whitespace-nowrap">
        {/* Navigation Links */}
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className={`text-white font-semibold transition-all duration-300 ease-in-out px-4 py-2 rounded-md cursor-pointer 
              ${
                activeItem === item.name
                  ? "bg-white text-green-500 shadow-md" // Active item style
                  : "bg-green-500 hover:bg-green-600 hover:scale-105 hover:shadow-lg" // Hover style
              }`}
              onClick={() => handleItemClick(item.name)} // Handle click event
              onMouseEnter={() => setActiveItem(item.name)} // Handle hover event
              onMouseLeave={() => setActiveItem(null)} // Remove active state on hover out
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavigation;
