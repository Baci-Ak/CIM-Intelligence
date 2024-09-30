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
                className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "Tutorials" ? 'rotate-180' : ''}`}
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
                className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "Exercises" ? 'rotate-180' : ''}`}
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
