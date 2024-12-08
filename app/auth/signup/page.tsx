"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider, linkedInProvider, db } from "../../../lib/firebase";
import Link from "next/link";
import { FaGoogle, FaGithub, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeToNews, setSubscribeToNews] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensures no user is signed in when arriving at this page
    const checkAuth = async () => {
      if (auth.currentUser) {
        await signOut(auth);
      }
    };
    checkAuth();
  }, []);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailAlreadyExists(false);

    if (!email || !email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy to sign up.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setError("Registration successful! Please check your email to verify your account.");

      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: new Date()
      });

      // Clear fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setAgreeToTerms(false);
      setSubscribeToNews(false);
      setShowPassword(false);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setEmailAlreadyExists(true);
        setError("This email is already registered. Please log in instead.");
      } else {
        setError(err.message);
      }
    }
  };

  const handleSignUpWithProvider = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);

      const userProfile = await getDoc(userRef);
      if (!userProfile.exists()) {
        await setDoc(userRef, {
          firstName: user.displayName?.split(' ')[0],
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email,
          createdAt: new Date()
        });
      }
      // Redirect to profile page or dashboard
      router.push("/profile");
    } catch (err) {
      setError(`Failed to sign up with ${provider.providerId}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        <button onClick={() => router.back()} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold transition">&times;</button>
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
        {error && <p className={`mb-4 text-center ${error.startsWith("Registration successful") ? "text-green-500" : "text-red-500"}`}>{error}</p>}
        {emailAlreadyExists && (
          <p className="text-center mb-4 text-red-500">
            This email is already registered. Please <Link href="/auth/login" className="text-green-500 hover:underline">log in</Link> instead.
          </p>
        )}
        <div className="flex justify-between mb-6">
          <button onClick={() => handleSignUpWithProvider(googleProvider)} className="flex items-center justify-center w-full mr-2 bg-white border border-gray-300 py-2 rounded-md hover:bg-gray-50"><FaGoogle className="mr-2 text-red-500" /> Google</button>
          <button onClick={() => handleSignUpWithProvider(githubProvider)} className="flex items-center justify-center w-full mr-2 bg-white border border-gray-300 py-2 rounded-md hover:bg-gray-50"><FaGithub className="mr-2 text-black" /> GitHub</button>
          <button onClick={() => handleSignUpWithProvider(linkedInProvider)} className="flex items-center justify-center w-full bg-white border border-gray-300 py-2 rounded-md hover:bg-gray-50"><FaLinkedin className="mr-2 text-blue-500" /> LinkedIn</button>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium">First Name</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" placeholder="Enter your first name" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium">Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" placeholder="Enter your last name" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md" placeholder="Enter your email" />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-md" placeholder="Enter your password" />
            <div onClick={togglePasswordVisibility} className="absolute right-3 top-10 cursor-pointer text-gray-500">{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.</p>
          <div className="mb-4 flex items-start">
            <input type="checkbox" id="agreeToTerms" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="mr-2 mt-1" />
            <label htmlFor="agreeToTerms" className="text-sm">I agree to the <a href="/terms" className="text-blue-500">Terms of Service</a> and <a href="/privacy" className="text-blue-500">Privacy Policy</a>.</label>
          </div>
          <div className="mb-6 flex items-start">
            <input type="checkbox" id="subscribeToNews" checked={subscribeToNews} onChange={(e) => setSubscribeToNews(e.target.checked)} className="mr-2 mt-1" />
            <label htmlFor="subscribeToNews" className="text-sm">Email me with news and updates.</label>
          </div>
          <button type="submit" className={`w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition duration-300 ${!agreeToTerms ? "opacity-50 cursor-not-allowed" : ""}`} disabled={!agreeToTerms}>Sign Up</button>
        </form>
        <div className="mt-6 text-center text-sm">Already have an account? <Link href="/auth/login" className="text-green-500 hover:underline">Log in</Link></div>
      </div>
    </div>
  );
};

export default SignUp;
