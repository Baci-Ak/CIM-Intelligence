"use client"; // Marks this component as client-side

import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  // State to track if the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Dropdown state for desktop view for Tutorials, Exercises, and Projects
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile search input state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State to handle dark mode
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode enabled

  // Refs for dropdown handling clicks outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle Dropdown in desktop
  const handleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null); // Close dropdown if it's already open
    } else {
      setActiveDropdown(dropdown); // Open the selected dropdown
    }
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark"); // Add the 'dark' class to the root element
    } else {
      document.documentElement.classList.remove("dark"); // Remove the 'dark' class
    }
  };

  // Automatically enable dark mode by default on initial load
  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsDarkMode(true); // Ensure dark mode is enabled by default
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null); // Close dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md py-4 relative">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0 relative z-20">
        {/* Logo Section */}
        <div className="w-24">
          <img src="/logo.png" alt="CIM Intelligence Logo" className="w-full h-auto" />
        </div>

        {/* Mobile Menu: Hamburger icon, search icon, log in */}
        <div className="md:hidden flex items-center space-x-1 w-full justify-evenly">
          {/* Menu Button for mobile */}
          <button
            className="flex items-center space-x-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
            <span className="text-sm font-medium">Menu</span> {/* Menu Label */}
          </button>

          {/* Search Icon for Mobile */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="px-2"
          >
            {!isSearchOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm21-6h-1M15 11l-3 3"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </button>

          {/* Dark Mode Toggle for Mobile */}
          <button onClick={handleDarkModeToggle} className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          {/* Log In Button */}
          <button className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Log In
          </button>
        </div>

        {/* Navigation Links for desktop */}
        <nav className="hidden md:flex space-x-8">
          {/* Dropdown for Tutorials */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => handleDropdown("tutorials")}
              className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span>Tutorials</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "tutorials" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Python
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  SQL
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Data Science
                </a>
              </div>
            )}
          </div>

          {/* Dropdown for Exercises */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("exercises")}
              className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span>Exercises</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "exercises" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Python Exercises
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  SQL Exercises
                </a>
              </div>
            )}
          </div>

          {/* Dropdown for Projects */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("projects")}
              className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span>Projects</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "projects" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Python Projects
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  SQL Projects
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right-hand section for desktop view: search, dark mode, sign up, log in */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            {/* Search Icon */}
            <button className="absolute right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3"
                />
              </svg>
            </button>
          </div>

          {/* Dark Mode Toggle for Desktop */}
          <button onClick={handleDarkModeToggle} className="px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          {/* Sign Up Button */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>

          {/* Log In Button */}
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Log In
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-2 px-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            {/* Search Icon for Mobile */}
            <button className="absolute right-3 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 px-4 transition-transform duration-300 ease-in-out">
          <a href="#" className="block text-gray-700 dark:text-gray-300">
            Tutorials
          </a>
          <a href="#" className="block text-gray-700 dark:text-gray-300">
            Exercises
          </a>
          <a href="#" className="block text-gray-700 dark:text-gray-300">
            Projects
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;









































"use client"; // Marks this component as client-side

import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  // State to track if the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Dropdown state for both desktop and mobile view
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile search input state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State to handle dark mode
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode enabled

  // Toggle dropdown for both desktop and mobile
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark"); // Add the 'dark' class to the root element
    } else {
      document.documentElement.classList.remove("dark"); // Remove the 'dark' class
    }
  };

  // Automatically enable dark mode by default on initial load
  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsDarkMode(true); // Ensure dark mode is enabled by default
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md py-4 relative">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0 relative z-20">
        {/* Logo Section */}
        <div className="w-24">
          <img src="/logo.png" alt="Logo" className="w-full h-auto" />
        </div>

        {/* Mobile Menu: Hamburger icon, search icon, log in */}
        <div className="md:hidden flex items-center space-x-1 w-full justify-evenly">
          {/* Menu Button for mobile */}
          <button
            className="flex items-center space-x-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            <span className="text-sm font-medium">Menu</span>
          </button>

          {/* Search Icon for Mobile */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="px-2"
          >
            {!isSearchOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm21-6h-1M15 11l-3 3"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </button>

          {/* Dark Mode Toggle for Mobile */}
          <button onClick={handleDarkModeToggle} className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          {/* Log In Button */}
          <button className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Log In
          </button>
        </div>

        {/* Navigation Links for desktop */}
        <nav className="hidden md:flex space-x-8">
          {/* Dropdown for Tutorials */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("tutorials")}
              className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span>Tutorials</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "tutorials" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Python
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  SQL
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Data Science
                </a>
              </div>
            )}
          </div>

          {/* Dropdown for Exercises */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("exercises")}
              className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span>Exercises</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "exercises" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Python Exercises
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  SQL Exercises
                </a>
              </div>
            )}
          </div>

          {/* Dropdown for Projects */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("projects")}
              className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span>Projects</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "projects" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Python Projects
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  SQL Projects
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right-hand section for desktop view: search, dark mode, sign up, log in */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            {/* Search Icon */}
            <button className="absolute right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3"
                />
              </svg>
            </button>
          </div>

          {/* Dark Mode Toggle for Desktop */}
          <button onClick={handleDarkModeToggle} className="px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          {/* Sign Up Button */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>

          {/* Log In Button */}
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Log In
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-2 px-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            {/* Search Icon for Mobile */}
            <button className="absolute right-3 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 text-white p-8 space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setIsOpen(false)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("Tutorials")}
              className="flex justify-between w-full text-left py-2 border-b border-gray-600"
            >
              <span className="font-semibold">Tutorials</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={activeDropdown === "Tutorials" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
            {activeDropdown === "Tutorials" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Python</p>
                <p className="text-sm">JavaScript</p>
                <p className="text-sm">Data Science</p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("Exercises")}
              className="flex justify-between w-full text-left py-2 border-b border-gray-600"
            >
              <span className="font-semibold">Exercises</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={activeDropdown === "Exercises" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
            {activeDropdown === "Exercises" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Python Exercises</p>
                <p className="text-sm">JavaScript Exercises</p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("Certificates")}
              className="flex justify-between w-full text-left py-2 border-b border-gray-600"
            >
              <span className="font-semibold">Certificates</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={activeDropdown === "Certificates" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
            {activeDropdown === "Certificates" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Get Certified</p>
              </div>
            )}
          </div>

          {/* Additional sections like Services, Spaces, Plus, etc. */}
          <div>
            <button
              onClick={() => toggleDropdown("Services")}
              className="flex justify-between w-full text-left py-2 border-b border-gray-600"
            >
              <span className="font-semibold">Services</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={activeDropdown === "Services" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
            {activeDropdown === "Services" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Web Development</p>
                <p className="text-sm">SEO</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-evenly">
              {/* Social icons */}
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.494v-9.294H9.687V11.09h3.132v-2.42c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.464.099 2.797.143v3.243h-1.918c-1.504 0-1.794.716-1.794 1.764v2.313h3.587l-.467 3.617h-3.12V24h6.11C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>

              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.724-.951.566-2.005.978-3.127 1.2-.896-.957-2.173-1.555-3.591-1.555-2.719 0-4.922 2.203-4.922 4.917 0 .385.043.761.128 1.123C7.691 8.094 4.066 6.13 1.64 3.161c-.423.725-.666 1.561-.666 2.457 0 1.696.865 3.191 2.18 4.071-.803-.026-1.561-.246-2.228-.615v.061c0 2.372 1.685 4.348 3.918 4.798-.41.111-.84.171-1.285.171-.314 0-.621-.03-.919-.086.621 1.943 2.422 3.36 4.556 3.398-1.67 1.31-3.778 2.093-6.066 2.093-.394 0-.779-.023-1.162-.067C2.18 21.544 4.777 22.5 7.548 22.5c9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.015-.637.96-.693 1.796-1.562 2.457-2.549z" />
              </svg>

              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
              </svg>

              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c-5.822 0-10.525 4.703-10.525 10.525S6.178 23.213 12 23.213 22.525 18.51 22.525 12.688 17.822 2.163 12 2.163zm0 19.64c-5.04 0-9.144-4.104-9.144-9.144S6.96 3.516 12 3.516s9.144 4.104 9.144 9.144-4.104 9.144-9.144 9.144z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;





































"use client"; // Marks this component as client-side

import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  // State to track if the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Dropdown state for desktop view for Tutorials, Exercises, and Projects
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile search input state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State to handle dark mode
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode enabled

  // Refs for handling clicks outside of dropdowns
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle Dropdown in both desktop and mobile
  const handleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null); // Close dropdown if it's already open
    } else {
      setActiveDropdown(dropdown); // Open the selected dropdown
    }
  };
  
  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark"); // Add the 'dark' class to the root element
    } else {
      document.documentElement.classList.remove("dark"); // Remove the 'dark' class
    }
  };

  // Automatically enable dark mode by default on initial load
  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsDarkMode(true); // Ensure dark mode is enabled by default
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null); // Close dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md py-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo Section */}
        <div className="w-24">
          <img src="/logo.png" alt="CIM Intelligence Logo" className="w-full h-auto" />
        </div>

        {/* Mobile View: Hamburger menu, Search, Dark Mode, Log In */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Hamburger Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
            <span className="text-sm font-medium">Menu</span>
          </button>

          {/* Search Icon for Mobile */}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="px-2">
            {!isSearchOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm21-6h-1M15 11l-3 3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </button>

          {/* Dark Mode Toggle for Mobile */}
          <button onClick={handleDarkModeToggle} className="px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          {/* Log In Button */}
          <button className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs font-medium">Log In</button>
        </div>

        {/* Desktop View: Main Navigation */}
        <nav className="hidden md:flex space-x-8">
          {/* Tutorials Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => handleDropdown("tutorials")} className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200">
              <span>Tutorials</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "tutorials" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Python</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">SQL</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Data Science</a>
              </div>
            )}
          </div>

          {/* Exercises Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown("exercises")} className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200">
              <span>Exercises</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "exercises" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Python Exercises</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">SQL Exercises</a>
              </div>
            )}
          </div>

          {/* Projects Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown("projects")} className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200">
              <span>Projects</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "projects" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Python Projects</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">SQL Projects</a>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop View: Search, Dark Mode, Sign Up, Log In */}
        <div className="hidden md:flex space-x-4 items-center">
          <div className="relative flex items-center">
            <input type="text" placeholder="Search..." className="border rounded-md px-3 py-1 bg-white dark:bg-gray-800 text-black dark:text-white" />
            <button className="absolute right-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3" />
              </svg>
            </button>
          </div>

          {/* Dark Mode Toggle for Desktop */}
          <button onClick={handleDarkModeToggle} className="px-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded-md">Sign Up</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Log In</button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-2 px-4 relative">
          <div className="relative">
            <input type="text" placeholder="Search..." className="border rounded-md px-3 py-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white" />
            <button className="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 text-white p-8 space-y-4 z-50">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setIsOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div>
            <button onClick={() => handleDropdown("Tutorials")} className="flex justify-between w-full text-left py-2 border-b border-gray-600">
              <span className="font-semibold">Tutorials</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={activeDropdown === "Tutorials" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
            {activeDropdown === "Tutorials" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Python</p>
                <p className="text-sm">SQL</p>
                <p className="text-sm">Data Science</p>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => handleDropdown("Exercises")} className="flex justify-between w-full text-left py-2 border-b border-gray-600">
              <span className="font-semibold">Exercises</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={activeDropdown === "Exercises" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
            {activeDropdown === "Exercises" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Python Exercises</p>
                <p className="text-sm">SQL Exercises</p>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => handleDropdown("Certificates")} className="flex justify-between w-full text-left py-2 border-b border-gray-600">
              <span className="font-semibold">Certificates</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={activeDropdown === "Certificates" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
            {activeDropdown === "Certificates" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Get Certified</p>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="mt-4 flex justify-evenly">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.494v-9.294H9.687V11.09h3.132v-2.42c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.464.099 2.797.143v3.243h-1.918c-1.504 0-1.794.716-1.794 1.764v2.313h3.587l-.467 3.617h-3.12V24h6.11C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.724-.951.566-2.005.978-3.127 1.2-.896-.957-2.173-1.555-3.591-1.555-2.719 0-4.922 2.203-4.922 4.917 0 .385.043.761.128 1.123C7.691 8.094 4.066 6.13 1.64 3.161c-.423.725-.666 1.561-.666 2.457 0 1.696.865 3.191 2.18 4.071-.803-.026-1.561-.246-2.228-.615v.061c0 2.372 1.685 4.348 3.918 4.798-.41.111-.84.171-1.285.171-.314 0-.621-.03-.919-.086.621 1.943 2.422 3.36 4.556 3.398-1.67 1.31-3.778 2.093-6.066 2.093-.394 0-.779-.023-1.162-.067C2.18 21.544 4.777 22.5 7.548 22.5c9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.015-.637.96-.693 1.796-1.562 2.457-2.549z" />
            </svg>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
            </svg>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

























// secondarynavigation file

"use client"; // Mark this component as client-side

import React, { useState } from "react";

const SecondaryNavigation = () => {
  // State to track the active navigation item
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Function to handle click on navigation items
  const handleItemClick = (item: string) => {
    setActiveItem(item); // Set the clicked item as active
  };

  return (
    <div className="bg-green-500 py-3 w-full">
      <div className="container mx-auto flex justify-around space-x-4 overflow-x-auto whitespace-nowrap">
        {/* Navigation Links */}
        {["Mathematics", "Statistics", "Python", "SQL", "Data Science"].map((item) => (
          <a
            key={item}
            href="#"
            className={`text-white font-semibold transition-all duration-300 ease-in-out px-4 py-2 rounded-md 
              ${
                activeItem === item
                  ? "bg-white text-green-500 shadow-md" // Active item style
                  : "bg-green-500 hover:bg-green-600 hover:scale-105 hover:shadow-lg" // Hover style
              }`}
            onClick={() => handleItemClick(item)} // Handle click event
            onMouseEnter={() => setActiveItem(item)} // Handle hover event
            onMouseLeave={() => setActiveItem(null)} // Remove active state on hover out
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavigation;















































"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import Editor from "@monaco-editor/react"; // Monaco Editor for code editing

const sections = [
  {
    title: "Python Tutorial",
    items: [
      "Python HOME",
      "Python Introduction",
      "Python Syntax",
      "Python Variables",
      "Python Data Types",
    ],
  },
  {
    title: "File Handling",
    items: [
      "File Handling Introduction",
      "Opening Files",
      "Reading Files",
      "Writing Files",
      "Deleting Files",
    ],
  },
  {
    title: "Python Modules",
    items: ["Modules Introduction", "Creating Modules", "Using Modules"],
  },
];

// Flatten the sections for easier navigation
const allItems = sections.flatMap((section) => section.items);

const PythonPage = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track the active section index
  const [code, setCode] = useState<string>('print("Hello, World!")'); // Default Python code
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    // Dynamically load Skulpt when the page is loaded
    const loadSkulpt = () => {
      return new Promise((resolve, reject) => {
        const skulptScript = document.createElement("script");
        const skulptLibScript = document.createElement("script");

        skulptScript.src =
          "https://cdn.jsdelivr.net/npm/skulpt@0.10.0/dist/skulpt.min.js";
        skulptLibScript.src =
          "https://cdn.jsdelivr.net/npm/skulpt@0.10.0/dist/skulpt-stdlib.js";

        skulptScript.async = true;
        skulptLibScript.async = true;

        document.body.appendChild(skulptScript);
        document.body.appendChild(skulptLibScript);

        skulptScript.onload = () => {
          if (window["Sk"]) {
            resolve(true);
          } else {
            reject("Skulpt not loaded.");
          }
        };
        skulptScript.onerror = () => reject("Skulpt script failed to load.");
        skulptLibScript.onerror = () =>
          reject("Skulpt standard library failed to load.");
      });
    };

    loadSkulpt()
      .then(() => console.log("Skulpt loaded successfully"))
      .catch((err) => setOutput(`Error loading Skulpt: ${err}`));
  }, []);

  const handleItemClick = (itemIndex: number) => {
    setActiveIndex(itemIndex); // Set the clicked item as active
  };

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections((prevExpandedSections) =>
      prevExpandedSections.includes(sectionIndex)
        ? prevExpandedSections.filter((index) => index !== sectionIndex)
        : [...prevExpandedSections, sectionIndex]
    );
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < allItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Function to run the code using Skulpt
  const runPythonCode = () => {
    setOutput(""); // Clear previous output

    if (typeof window["Sk"] !== "undefined") {
      const builtinRead = (file: string) => {
        if (window["Sk"].builtinFiles === undefined || window["Sk"].builtinFiles["files"][file] === undefined) {
          throw "File not found: '" + file + "'";
        }
        return window["Sk"].builtinFiles["files"][file];
      };

      window["Sk"].configure({
        output: (text: string) => setOutput((prev) => prev + text),
        read: builtinRead,
      });

      try {
        window["Sk"].importMainWithBody("<stdin>", false, code, true);
      } catch (error) {
        setOutput("Error: " + error.toString());
      }
    } else {
      setOutput("Failed to load Skulpt.");
    }
  };

  return (
    <>
      <SecondaryNavigation />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 h-screen sticky top-0 overflow-y-auto">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3
                className="font-bold mb-2 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection(sectionIndex)}
              >
                {section.title}
                <span>
                  {expandedSections.includes(sectionIndex) ? "-" : "+"}
                </span>
              </h3>
              {expandedSections.includes(sectionIndex) && (
                <div>
                  {section.items.map((item, itemIndex) => {
                    const overallIndex = allItems.indexOf(item);

                    return (
                      <Link key={itemIndex} href="#">
                        <span
                          className={`block px-4 py-2 rounded mb-2 cursor-pointer ${
                            activeIndex === overallIndex
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                          } hover:bg-green-400 transition`}
                          onClick={() => handleItemClick(overallIndex)}
                        >
                          {item}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          <h1 className="text-3xl font-bold mb-4">Python Tutorial</h1>
          <p className="text-lg mb-6">
            Welcome to the Python tutorial page! Learn Python, the popular
            programming language used for web development, data science, and more.
          </p>

          {/* Dynamic Content Based on Active Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            {allItems[activeIndex] && (
              <>
                <h2 className="text-2xl font-semibold mb-4">{allItems[activeIndex]}</h2>
                <p>
                  This is the content for the "{allItems[activeIndex]}" section. You can
                  customize this with more detailed content or code examples.
                </p>
              </>
            )}
          </div>

          {/* Code Editor Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Try It Yourself</h2>
            <Editor
              height="200px"
              defaultLanguage="python"
              defaultValue={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
            />
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={runPythonCode}
              >
                Run Code
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h3 className="font-semibold">Output:</h3>
              <pre>{output}</pre>
            </div>
          </div>

          {/* Previous and Next Section Navigation */}
          <div className="mt-6 flex justify-between">
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevious}
              disabled={activeIndex === 0}
            >
              Previous Section
            </button>

            <button
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                activeIndex === allItems.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
              disabled={activeIndex === allItems.length - 1}
            >
              Next Section
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default PythonPage;













































"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import Editor from "@monaco-editor/react"; // Monaco Editor for code editing

const sections = [
  {
    title: "Python Tutorial",
    items: [
      "Python HOME",
      "Python Introduction",
      "Python Syntax",
      "Python Variables",
      "Python Data Types",
    ],
  },
  {
    title: "File Handling",
    items: [
      "File Handling Introduction",
      "Opening Files",
      "Reading Files",
      "Writing Files",
      "Deleting Files",
    ],
  },
  {
    title: "Python Modules",
    items: ["Modules Introduction", "Creating Modules", "Using Modules"],
  },
];

// Flatten the sections for easier navigation
const allItems = sections.flatMap((section) => section.items);

const PythonPage = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track the active section index
  const [cells, setCells] = useState([
    { type: "code", content: 'print("Hello, World!")', output: "", isDefault: true }, // Default example code
  ]);

  // Function to send code to the Flask server and get the result
  const runPythonCode = async (code: string, index: number) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/run_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // Send the code in the request body
      });

      const data = await response.json();
      const updatedCells = [...cells];
      updatedCells[index].output = data.output || "No output"; // Store output in the respective cell
      setCells(updatedCells);
    } catch (error) {
      const updatedCells = [...cells];
      updatedCells[index].output = "Error executing code: " + error.message;
      setCells(updatedCells);
    }
  };

  useEffect(() => {
    // Run the default code on the first render
    runPythonCode(cells[0].content, 0);
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  const handleItemClick = (itemIndex: number) => {
    setActiveIndex(itemIndex); // Set the clicked item as active
  };

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections((prevExpandedSections) =>
      prevExpandedSections.includes(sectionIndex)
        ? prevExpandedSections.filter((index) => index !== sectionIndex)
        : [...prevExpandedSections, sectionIndex]
    );
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < allItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Function to add new code cells
  const addNewCell = () => {
    setCells([...cells, { type: "code", content: "", output: "", isDefault: false }]);
  };

  // Function to update content of a cell
  const updateCellContent = (index: number, content: string) => {
    const updatedCells = cells.map((cell, i) =>
      i === index ? { ...cell, content } : cell
    );
    setCells(updatedCells);
  };

  // Function to remove a user-added cell
  const removeCell = (index: number) => {
    const updatedCells = cells.filter((_, i) => i !== index);
    setCells(updatedCells);
  };

  // Function to reset code for a specific cell
  const resetCode = (index: number) => {
    const updatedCells = [...cells];
    if (cells[index].isDefault) {
      updatedCells[index].content = 'print("Hello, World!")'; // Default code example
    } else {
      updatedCells[index].content = ""; // Blank for user-added cells
    }
    setCells(updatedCells);
  };

  return (
    <>
      <SecondaryNavigation />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 h-screen sticky top-0 overflow-y-auto">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3
                className="font-bold mb-2 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection(sectionIndex)}
              >
                {section.title}
                <span>
                  {expandedSections.includes(sectionIndex) ? "-" : "+"}
                </span>
              </h3>
              {expandedSections.includes(sectionIndex) && (
                <div>
                  {section.items.map((item, itemIndex) => {
                    const overallIndex = allItems.indexOf(item);

                    return (
                      <Link key={itemIndex} href="#">
                        <span
                          className={`block px-4 py-2 rounded mb-2 cursor-pointer ${
                            activeIndex === overallIndex
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                          } hover:bg-green-400 transition`}
                          onClick={() => handleItemClick(overallIndex)}
                        >
                          {item}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          <h1 className="text-3xl font-bold mb-4">Python Tutorial</h1>
          <p className="text-lg mb-6">
            Welcome to the Python tutorial page! Learn Python, the popular
            programming language used for web development, data science, and more.
          </p>

          {/* Dynamic Content Based on Active Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            {allItems[activeIndex] && (
              <>
                <h2 className="text-2xl font-semibold mb-4">{allItems[activeIndex]}</h2>
                <p>
                  This is the content for the "{allItems[activeIndex]}" section. You can
                  customize this with more detailed content or code examples.
                </p>
              </>
            )}
          </div>

          {/* Code Cells */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Example</h2>
            {cells.map((cell, index) => (
              <div key={index} className="mb-6">
                {cell.type === "code" && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Editor
                        height="400px"
                        width="70%" // Adjusted width
                        defaultLanguage="python"
                        value={cell.content}
                        theme="vs-dark"
                        onChange={(value) => updateCellContent(index, value || "")}
                        options={{
                          fontSize: 18, // Adjust the font size here
                          minimap: { enabled: false }, // Option to disable the minimap if desired
                        }}
                      />
                      {/* Close button only for user-added cells */}
                      {!cell.isDefault && (
                        <button
                          onClick={() => removeCell(index)}
                          className="text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white p-1 rounded-full h-8 w-8 flex items-center justify-center"
                        >
                          X
                        </button>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => runPythonCode(cell.content, index)}
                      >
                        Run Code
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
                        onClick={() => resetCode(index)}
                      >
                        Reset Code
                      </button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h3 className="font-semibold">Output:</h3>
                      <pre>{cell.output || "No output"}</pre>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={addNewCell}
              >
                Add Code Cell
              </button>
            </div>
          </div>

          {/* Previous and Next Section Navigation */}
          <div className="mt-6 flex justify-between">
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevious}
              disabled={activeIndex === 0}
            >
              Previous Section
            </button>

            <button
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                activeIndex === allItems.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
              disabled={activeIndex === allItems.length - 1}
            >
              Next Section
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default PythonPage;





































"use client"; // Marks this component as client-side

import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  // State to track if the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Dropdown state for desktop view for Tutorials, Exercises, and Projects
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile search input state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State to handle dark mode
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode enabled

  // Refs for handling clicks outside of dropdowns
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle Dropdown in both desktop and mobile
  const handleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null); // Close dropdown if it's already open
    } else {
      setActiveDropdown(dropdown); // Open the selected dropdown
    }
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark"); // Add the 'dark' class to the root element
    } else {
      document.documentElement.classList.remove("dark"); // Remove the 'dark' class
    }
  };

  // Automatically enable dark mode by default on initial load
  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsDarkMode(true); // Ensure dark mode is enabled by default
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null); // Close dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md py-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo Section */}
        <div className="w-24">
          <img src="/logo.png" alt="CIM Intelligence Logo" className="w-full h-auto" />
        </div>

        {/* Mobile View: Hamburger menu, Search, Dark Mode, Log In */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Hamburger Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
            <span className="text-sm font-medium">Menu</span>
          </button>

          {/* Search Icon for Mobile */}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="px-2">
            {!isSearchOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm21-6h-1M15 11l-3 3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </button>

          {/* Dark Mode Toggle for Mobile */}
          <button onClick={handleDarkModeToggle} className="px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          {/* Log In Button */}
          <button className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs font-medium">Log In</button>
        </div>

        {/* Desktop View: Main Navigation */}
        <nav className="hidden md:flex space-x-8">
          {/* Tutorials Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => handleDropdown("tutorials")} className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200">
              <span>Tutorials</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "tutorials" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Python</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">SQL</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Data Science</a>
              </div>
            )}
          </div>

          {/* Exercises Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown("exercises")} className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200">
              <span>Exercises</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "exercises" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Python Exercises</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">SQL Exercises</a>
              </div>
            )}
          </div>

          {/* Projects Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown("projects")} className="flex items-center space-x-2 py-2 px-4 hover:text-gray-800 dark:hover:text-gray-200">
              <span>Projects</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === "projects" && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Python Projects</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">SQL Projects</a>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop View: Search, Dark Mode, Sign Up, Log In */}
        <div className="hidden md:flex space-x-4 items-center">
          <div className="relative flex items-center">
            <input type="text" placeholder="Search..." className="border rounded-md px-3 py-1 bg-white dark:bg-gray-800 text-black dark:text-white" />
            <button className="absolute right-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3" />
              </svg>
            </button>
          </div>

          {/* Dark Mode Toggle for Desktop */}
          <button onClick={handleDarkModeToggle} className="px-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8-9h1M4 12H3m16.364 6.364l-.707-.707m-12.02.02l-.707-.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded-md">Sign Up</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Log In</button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-2 px-4 relative">
          <div className="relative">
            <input type="text" placeholder="Search..." className="border rounded-md px-3 py-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white" />
            <button className="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm15-6h-1M15 11l-3 3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 text-white p-8 space-y-4 z-50">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setIsOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div>
            <button
              onClick={() => handleDropdown("Tutorials")}
              className="flex justify-between w-full text-left py-2 border-b border-gray-600"
            >
              <span className="font-semibold">Tutorials</span>
              <svg
                className={w-4 h-4 transition-transform duration-300 ${activeDropdown === "Tutorials" ? 'rotate-180' : ''}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {activeDropdown === "Tutorials" && (
              <div className="pl-4 mt-2 space-y-6">
                <p className="text-sm">Python</p>
                <p className="text-sm">SQL</p>
                <p className="text-sm">Data Science</p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => handleDropdown("Exercises")}
              className="flex justify-between w-full text-left py-2 border-b border-gray-600"
            >
              <span className="font-semibold">Exercises</span>
              <svg
                className={w-4 h-4 transition-transform duration-300 ${activeDropdown === "Exercises" ? 'rotate-180' : ''}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {activeDropdown === "Exercises" && (
              <div className="pl-4 mt-2 space-y-6">
                <p className="text-sm">Python Exercises</p>
                <p className="text-sm">SQL Exercises</p>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => handleDropdown("Certificates")} className="flex justify-between w-full text-left py-2 border-b border-gray-600">
              <span className="font-semibold">Certificates</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={activeDropdown === "Certificates" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
            {activeDropdown === "Certificates" && (
              <div className="pl-4 mt-2 space-y-2">
                <p className="text-sm">Get Certified</p>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="mt-4 flex justify-evenly">
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm12.25 11.25h-3v-5.604c0-1.379-.471-2.318-1.653-2.318-.902 0-1.437.605-1.673 1.189-.086.211-.108.503-.108.797v5.936h-3s.04-9.623 0-10.623h3v1.506c.399-.618 1.11-1.496 2.701-1.496 1.971 0 3.449 1.292 3.449 4.073v6.54z" />
              </svg>
            </a>

            {/* GitHub Icon */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.599.111.82-.26.82-.578 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.238 1.838 1.238 1.07 1.834 2.809 1.304 3.492.997.108-.775.418-1.305.761-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.398 3.005-.404 1.02.006 2.047.138 3.006.404 2.292-1.553 3.298-1.23 3.298-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.911 1.236 3.221 0 4.61-2.805 5.625-5.475 5.921.43.37.813 1.1.813 2.219 0 1.602-.014 2.896-.014 3.289 0 .321.218.694.825.576C20.565 21.798 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Instagram Icon */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.428.41.603.232 1.036.513 1.49.968.453.454.736.888.967 1.49.17.458.356 1.258.411 2.429.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.054 1.17-.24 1.97-.41 2.428a4.618 4.618 0 01-.967 1.49c-.454.453-.888.736-1.49.967-.458.17-1.258.356-2.429.411-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.17-.054-1.97-.24-2.428-.41a4.618 4.618 0 01-1.49-.967 4.618 4.618 0 01-.967-1.49c-.17-.458-.356-1.258-.411-2.429-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.054-1.17.24-1.97.41-2.428a4.618 4.618 0 01.967-1.49 4.618 4.618 0 011.49-.967c.458-.17 1.258-.356 2.429-.411 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.27 0-3.67.013-4.947.071-1.276.058-2.15.25-2.905.534a6.994 6.994 0 00-2.528 1.649 6.994 6.994 0 00-1.649 2.528c-.285.756-.477 1.63-.534 2.905-.058 1.276-.071 1.676-.071 4.947s.013 3.671.071 4.947c.058 1.276.25 2.15.534 2.905a6.994 6.994 0 001.649 2.528 6.994 6.994 0 002.528 1.649c.756.285 1.63.477 2.905.534 1.276.058 1.676.071 4.947.071s3.671-.013 4.947-.071c1.276-.058 2.15-.25 2.905-.534a6.994 6.994 0 002.528-1.649 6.994 6.994 0 001.649-2.528c.285-.756.477-1.63.534-2.905.058-1.276.071-1.676.071-4.947s-.013-3.671-.071-4.947c-.058-1.276-.25-2.15-.534-2.905a6.994 6.994 0 00-1.649-2.528 6.994 6.994 0 00-2.528-1.649c-.756-.285-1.63-.477-2.905-.534-1.276-.058-1.676-.071-4.947-.071zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.999 3.999 3.999 0 010 7.999zm6.406-10.943a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;






































































"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import Editor from "@monaco-editor/react"; // Monaco Editor for code editing
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"; // Import Menu and Close icons for mobile

const sections = [
  {
    title: "Python Tutorial",
    items: [
      "Python HOME",
      "Python Introduction",
      "Python Syntax",
      "Python Variables",
      "Python Data Types",
    ],
  },
  {
    title: "File Handling",
    items: [
      "File Handling Introduction",
      "Opening Files",
      "Reading Files",
      "Writing Files",
      "Deleting Files",
    ],
  },
  {
    title: "Python Modules",
    items: ["Modules Introduction", "Creating Modules", "Using Modules"],
  },
];

// Flatten the sections for easier navigation
const allItems = sections.flatMap((section) => section.items);

const PythonPage = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track the active section index
  const [cells, setCells] = useState([
    { type: "code", content: 'print("Hello, World!")', output: "", isDefault: true }, // Default example code
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar toggle for mobile/tablet

  // Function to send code to the Flask server and get the result
  const runPythonCode = async (code: string, index: number) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/run_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // Send the code in the request body
      });

      const data = await response.json();
      const updatedCells = [...cells];
      updatedCells[index].output = data.output || "No output"; // Store output in the respective cell
      setCells(updatedCells);
    } catch (error) {
      const updatedCells = [...cells];
      updatedCells[index].output = "Error executing code: " + error.message;
      setCells(updatedCells);
    }
  };

  useEffect(() => {
    // Run the default code on the first render
    runPythonCode(cells[0].content, 0);
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  const handleItemClick = (itemIndex: number) => {
    setActiveIndex(itemIndex); // Set the clicked item as active
    setIsSidebarOpen(false); // Close the sidebar when an item is clicked (for mobile/tablet)
  };

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections((prevExpandedSections) =>
      prevExpandedSections.includes(sectionIndex)
        ? prevExpandedSections.filter((index) => index !== sectionIndex)
        : [...prevExpandedSections, sectionIndex]
    );
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < allItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const addNewCell = () => {
    setCells([...cells, { type: "code", content: "", output: "", isDefault: false }]);
  };

  const updateCellContent = (index: number, content: string) => {
    const updatedCells = cells.map((cell, i) =>
      i === index ? { ...cell, content } : cell
    );
    setCells(updatedCells);
  };

  const removeCell = (index: number) => {
    const updatedCells = cells.filter((_, i) => i !== index);
    setCells(updatedCells);
  };

  const resetCode = (index: number) => {
    const updatedCells = [...cells];
    if (cells[index].isDefault) {
      updatedCells[index].content = 'print("Hello, World!")'; // Default code example
    } else {
      updatedCells[index].content = ""; // Blank for user-added cells
    }
    setCells(updatedCells);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (isSidebarOpen && !target.closest("aside")) {
      setIsSidebarOpen(false); // Close sidebar only if clicking outside of it
    }
  };

  return (
    <>
      <SecondaryNavigation />

      {/* Mobile/Tablet Header with Menu Icon */}
      <div className="md:hidden bg-gray-100 p-4 flex items-center justify-between">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-700">
          {isSidebarOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
        </button>
        <h1 className="text-xl font-bold">Python Tutorial</h1>
      </div>

      <div className="flex" onClick={handleContentClick}>
        {/* Sidebar for Larger Screens */}
        <aside className="hidden md:block w-64 bg-gray-100 p-4 h-screen sticky top-0 overflow-y-auto">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3
                className="font-bold mb-2 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection(sectionIndex)}
                style={{ fontSize: "24px" }} // Sidebar font size increased
              >
                {section.title}
                <span>
                  {expandedSections.includes(sectionIndex) ? "-" : "+"}
                </span>
              </h3>
              {expandedSections.includes(sectionIndex) && (
                <div>
                  {section.items.map((item, itemIndex) => {
                    const overallIndex = allItems.indexOf(item);

                    return (
                      <Link key={itemIndex} href="#">
                        <span
                          className={`block px-4 py-2 rounded mb-2 cursor-pointer ${
                            activeIndex === overallIndex
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                          } hover:bg-green-400 transition`}
                          onClick={() => handleItemClick(overallIndex)}
                          style={{ fontSize: "18px" }} // Sidebar items font size
                        >
                          {item}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Sidebar for Mobile/Tablet */}
        {isSidebarOpen && (
          <aside
            className="md:hidden fixed top-0 left-0 w-64 h-screen bg-white shadow-lg p-4 z-50 overflow-y-auto"
          >
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h3
                  className="font-bold mb-2 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(sectionIndex)}
                  style={{ fontSize: "24px" }} // Sidebar font size increased
                >
                  {section.title}
                  <span>
                    {expandedSections.includes(sectionIndex) ? "-" : "+"}
                  </span>
                </h3>
                {expandedSections.includes(sectionIndex) && (
                  <div>
                    {section.items.map((item, itemIndex) => {
                      const overallIndex = allItems.indexOf(item);

                      return (
                        <Link key={itemIndex} href="#">
                          <span
                            className={`block px-4 py-2 rounded mb-2 cursor-pointer ${
                              activeIndex === overallIndex
                                ? "bg-green-500 text-white"
                                : "bg-gray-200"
                            } hover:bg-green-400 transition`}
                            onClick={() => handleItemClick(overallIndex)}
                            style={{ fontSize: "18px" }} // Sidebar items font size
                          >
                            {item}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          <h1 className="text-3xl font-bold mb-4">Python Tutorial</h1>
          <p className="text-lg mb-6">
            Welcome to the Python tutorial page! Learn Python, the popular programming language used for web development, data science, and more.
          </p>

          {/* Dynamic Content Based on Active Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            {allItems[activeIndex] && (
              <>
                <h2 className="text-2xl font-semibold mb-4">{allItems[activeIndex]}</h2>
                <p>
                  This is the content for the "{allItems[activeIndex]}" section. You can customize this with more detailed content or code examples.
                </p>
              </>
            )}
          </div>

          {/* Code Cells */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Example</h2>
            {cells.map((cell, index) => (
              <div key={index} className="mb-6">
                {cell.type === "code" && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Editor
                        height="auto"
                        width="100%"
                        defaultLanguage="python"
                        value={cell.content}
                        theme="vs-dark"
                        onChange={(value) => updateCellContent(index, value || "")}
                        options={{
                          fontSize: 18,
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          wordWrap: "on",
                          automaticLayout: true,
                          lineNumbers: "on",
                        }}
                        onMount={(editor) => {
                          const editorElement = editor.getDomNode();
                          if (editorElement) {
                            editorElement.style.height = "auto";
                            editorElement.style.maxHeight = "800px";
                            editorElement.style.overflow = "hidden";
                          }
                          editor.onDidContentSizeChange(() => {
                            const contentHeight = editor.getContentHeight();
                            editorElement.style.height = `${contentHeight}px`;
                            editor.layout();
                          });
                        }}
                      />

                      {!cell.isDefault && (
                        <button
                          onClick={() => removeCell(index)}
                          className="text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white p-1 rounded-full h-8 w-8 flex items-center justify-center"
                        >
                          X
                        </button>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => runPythonCode(cell.content, index)}
                      >
                        Run Code
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
                        onClick={() => resetCode(index)}
                      >
                        Reset Code
                      </button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h3 className="font-semibold">Output:</h3>
                      <pre>{cell.output || "No output"}</pre>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={addNewCell}>
                Add Code Cell
              </button>
            </div>
          </div>

          {/* Previous and Next Section Navigation */}
          <div className="mt-6 flex justify-between">
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevious}
              disabled={activeIndex === 0}
            >
              Previous Section
            </button>

            <button
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                activeIndex === allItems.length - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleNext}
              disabled={activeIndex === allItems.length - 1}
            >
              Next Section
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default PythonPage;
