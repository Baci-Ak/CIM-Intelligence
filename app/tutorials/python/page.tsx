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
          <p className="text-lg lg:text-xl mb-6">
            Welcome to the Python tutorial page! Learn Python, the popular programming language used for web development, data science, and more.
          </p>

          {/* Dynamic Content Based on Active Section */}
          <div className="bg-gray-100 p-6 rounded-lg text-base lg:text-lg">
            {allItems[activeIndex] && (
              <>
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4">{allItems[activeIndex]}</h2>
                <p>
                  This is the content for the "{allItems[activeIndex]}" section. You can customize this with more detailed content or code examples.
                </p>
              </>
            )}
          </div>

          {/* Code Cells */}
          <div className="mt-8">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">Example</h2>
            {cells.map((cell, index) => (
              <div key={index} className="mb-6">
                {cell.type === "code" && (
                  <>
                    <div className="w-full md:w-3/4 lg:w-full bg-gray-100 p-8 rounded-lg text-base lg:text-lg">
                      <Editor
                        height="auto"
                        width="100%"
                        defaultLanguage="python"
                        value={cell.content}
                        theme="vs-dark"
                        onChange={(value) => updateCellContent(index, value || "")}
                        options={{
                          fontSize: 24,
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
                    </div>

                    <div className="mt-2 flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => runPythonCode(cell.content, index)}
                      >
                        Run Code
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        onClick={() => resetCode(index)}
                      >
                        Reset Code
                      </button>
                      {!cell.isDefault && (
                        <button
                          onClick={() => removeCell(index)}
                          className="text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white p-1 rounded-full h-8 w-8 flex items-center justify-center"
                        >
                          X
                        </button>
                      )}
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={addNewCell}
                      >
                        Add Code Cell
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
