"use client";
import React, { useState } from "react";
import Link from "next/link";
import SecondaryNavigation from "../../components/SecondaryNavigation";

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

const PythonPage = () => {
  // Initialize expandedSections with an empty array, meaning no section is expanded initially.
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>("Python HOME");

  const handleItemClick = (item: string) => {
    setActiveSection(item); // Set the clicked item as active
  };

  const toggleSection = (sectionIndex: number) => {
    // Toggle the section. If it's already expanded, collapse it; otherwise, expand it.
    setExpandedSections((prevExpandedSections) =>
      prevExpandedSections.includes(sectionIndex)
        ? prevExpandedSections.filter((index) => index !== sectionIndex)
        : [...prevExpandedSections, sectionIndex]
    );
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
                  {expandedSections.includes(sectionIndex) ? "-" : "+"} {/* Toggle icon */}
                </span>
              </h3>
              {expandedSections.includes(sectionIndex) && (
                <div>
                  {section.items.map((item, itemIndex) => (
                    <Link key={itemIndex} href="#">
                      <span
                        className={`block px-4 py-2 rounded mb-2 cursor-pointer ${
                          activeSection === item
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        } hover:bg-green-400 transition`}
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          <h1 className="text-3xl font-bold mb-4">Python Tutorial</h1>
          <p className="text-lg mb-6">
            Welcome to the Python tutorial page! Learn Python, the popular programming language used for web development, data science, and more.
          </p>

          {/* Dynamic Content Based on Active Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            {activeSection && (
              <>
                <h2 className="text-2xl font-semibold mb-4">{activeSection}</h2>
                <p>
                  This is the content for the "{activeSection}" section. You can customize this with more detailed content or code examples.
                </p>
              </>
            )}
          </div>

          {/* Example of "Previous" and "Next" buttons to navigate between sections */}
          <div className="mt-6 flex justify-between">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Previous Section
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Next Section
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default PythonPage;
