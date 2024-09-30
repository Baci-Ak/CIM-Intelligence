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
