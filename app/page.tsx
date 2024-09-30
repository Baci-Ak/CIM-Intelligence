import SecondaryNavigation from "./components/SecondaryNavigation"; // Importing SecondaryNavigation component
import Link from "next/link"; // Import Link
import { AcademicCapIcon, ChartBarIcon, CodeBracketIcon, ServerIcon, BeakerIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div>
      {/* Render the Secondary Navigation Bar */}
      <SecondaryNavigation />

      {/* Hero Section */}
      <section className="hero-section bg-black text-white py-20">
        <div className="container mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold mb-4">Welcome to CIM Intelligence!</h1>

          {/* Subheading */}
          <p className="text-lg mb-8">Your gateway to mastering Data Science!</p>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search tutorials..."
              className="px-4 py-2 w-80 text-black rounded-l-lg"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 active:scale-95 transition">
              Search
            </button>
          </div>

          {/* Supportive Text */}
          <p className="text-gray-400">Start typing to search for tutorials...</p>
        </div>
      </section>

      {/* Featured Tutorials Section */}
      <section className="featured-tutorials py-16 bg-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Learn Mathematics */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-green-100">
              <AcademicCapIcon className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Learn Mathematics</h2>
                <p className="text-gray-600 mb-6">Foundational Mathematics concepts for Data Science.</p>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:shadow-md active:scale-95 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Learn Statistics */}
            <div className="bg-red-200 p-8 rounded-lg shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-red-300">
              <ChartBarIcon className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Learn Statistics</h2>
                <p className="text-gray-600 mb-6">Master statistics for data analysis.</p>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:shadow-md active:scale-95 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Learn Python */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-yellow-100">
              <CodeBracketIcon className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Learn Python</h2>
                <p className="text-gray-600 mb-6">Interactive Python tutorials to boost your learning.</p>
                
                {/* Wrap Link around the button */}
                <Link href="/tutorials/python" passHref>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:shadow-md active:scale-95 transition">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Learn SQL */}
            <div className="bg-green-200 p-8 rounded-lg shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-green-300">
              <ServerIcon className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Learn SQL</h2>
                <p className="text-gray-600 mb-6">Real-world projects for hands-on experience with SQL.</p>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:shadow-md active:scale-95 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Learn Data Science */}
            <div className="bg-blue-100 p-8 rounded-lg shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-blue-200">
              <BeakerIcon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Learn Data Science</h2>
                <p className="text-gray-600 mb-6">Comprehensive data science tutorials to guide your learning.</p>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:shadow-md active:scale-95 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to CIM Intelligence!
        </h1>
      </div>
    </div>
  );
}
