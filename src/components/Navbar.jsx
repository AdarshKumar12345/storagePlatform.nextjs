import React from 'react';
import {

  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
/**
 * Simple Navbar Component
 * A basic, static navigation bar design using React and Tailwind CSS.
 * Features:
 * - Brand/Logo section
 * - Fixed set of navigation links
 */
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo Section */}
        <div className="flex items-center">
          <a href="#" className="text-white text-2xl font-bold tracking-wide">
            Storage Platform
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;


