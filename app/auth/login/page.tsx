"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../../../lib/firebase";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle email/password login
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err: any) {
      console.log("Firebase error:", err.code); // Log the error for debugging
      if (err.code === "auth/wrong-password") {
        setError("The password is incorrect for this email.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format. Please check and try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Please try again later.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }    
  };

  // Function to handle social provider login (Google, GitHub)
  const handleSignInWithProvider = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/profile");
    } catch (err: any) {
      console.error("Social login error:", err);
      setError(`Failed to sign in with ${provider.providerId}.`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={() => router.back()} // Close like the sign-up form
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
        >
          &times;
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-center">Log In</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Social sign-in buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => handleSignInWithProvider(googleProvider)}
            className="flex items-center justify-center w-full mr-2 bg-white border border-gray-300 py-2 rounded-md hover:bg-gray-50"
          >
            <FaGoogle className="mr-2 text-red-500" /> Google
          </button>
          <button
            onClick={() => handleSignInWithProvider(githubProvider)}
            className="flex items-center justify-center w-full mr-2 bg-white border border-gray-300 py-2 rounded-md hover:bg-gray-50"
          >
            <FaGithub className="mr-2 text-black" /> GitHub
          </button>
        </div>

        <div className="flex items-center justify-center mb-6">
          <span className="bg-gray-300 h-px flex-grow" />
          <span className="px-4 text-gray-500">OR</span>
          <span className="bg-gray-300 h-px flex-grow" />
        </div>

        {/* Log-in form */}
        <form onSubmit={handleLogIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end mb-4">
            <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
