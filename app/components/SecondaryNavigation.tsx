"use client"; // Mark this component as client-side
import Link from "next/link"; // Import Link component
import React, { useState, useRef, useEffect } from "react";
import { FiHome } from "react-icons/fi"; // Import Home icon from react-icons
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Import scroll icons

const SecondaryNavigation = () => {
  // State to track the active navigation item
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // References for scrolling the nav container
  const navRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  // Handle scrolling the navigation bar
  const scrollNav = (direction: "left" | "right") => {
    if (navRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      navRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Check whether the user can scroll left or right
  const handleScrollCheck = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Use effect to check scrollability on mount and whenever the nav bar is scrolled
  useEffect(() => {
    handleScrollCheck(); // Initial check
    if (navRef.current) {
      navRef.current.addEventListener("scroll", handleScrollCheck);
    }
    return () => {
      if (navRef.current) {
        navRef.current.removeEventListener("scroll", handleScrollCheck);
      }
    };
  }, []);

  return (
    <div className="bg-green-500 py-3 w-full relative">
      {/* Home icon */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4">
        <Link href="/">
          <div className="flex items-center justify-center text-white w-8 h-8 hover:bg-green-600 cursor-pointer">
            <FiHome size={22} />
          </div>
        </Link>
      </div>

      {/* Scroll Left Icon */}
      {canScrollLeft && (
        <button
          className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          onClick={() => scrollNav("left")}
        >
          <AiOutlineLeft size={20} />
        </button>
      )}

      {/* Navigation Links */}
      <div
        className="container mx-auto flex justify-between items-center space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide pl-16 pr-8"
        ref={navRef}
      >
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

      {/* Scroll Right Icon */}
      {canScrollRight && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          onClick={() => scrollNav("right")}
        >
          <AiOutlineRight size={20} />
        </button>
      )}
    </div>
  );
};

export default SecondaryNavigation;
