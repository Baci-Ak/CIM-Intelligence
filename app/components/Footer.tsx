import Link from "next/link";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      {/* Call to Action Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Join the CIM Intelligence Python Community!</h2>
        <p className="mb-6 text-lg">Get access to exclusive Python content, tutorials, and more.</p>
        <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg shadow-md transition-all hover:shadow-lg hover:scale-105">
          Sign Up Now
        </Link>
      </div>

      {/* Divider */}
      <hr className="border-gray-700 mb-8" />

      {/* Quick Links and Social Media Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm px-4">
        {/* Quick Links */}
        <div className="mb-4 md:mb-0">
          <ul className="flex space-x-8 text-lg">
            <li>
              <Link href="/about" className="hover:text-gray-300 transition-all">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-gray-300 transition-all">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gray-300 transition-all">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300 transition-all">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <Link href="https://twitter.com" aria-label="Twitter">
            <FaTwitter className="h-8 w-8 hover:opacity-75 transition-transform transform hover:scale-110 hover:text-blue-400" />
          </Link>
          <Link href="https://facebook.com" aria-label="Facebook">
            <FaFacebookF className="h-8 w-8 hover:opacity-75 transition-transform transform hover:scale-110 hover:text-blue-600" />
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedinIn className="h-8 w-8 hover:opacity-75 transition-transform transform hover:scale-110 hover:text-blue-700" />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram">
            <FaInstagram className="h-8 w-8 hover:opacity-75 transition-transform transform hover:scale-110 hover:text-pink-500" />
          </Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>© 2024 CIM Intelligence. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
