"use client"
import Image from "next/image";
import Link from "next/link";

import { useUser } from "@clerk/nextjs";

export default  function Home() {
  const { isSignedIn, user, isLoaded } = useUser()
    const handleUploadClick = () => {
    console.log('Upload button clicked, redirecting to uploads page...');
    // Redirect to the uploads page
    window.location.href = '/uploads';
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="text-center py-8 mb-12 bg-white bg-opacity-80 rounded-xl shadow-2xl backdrop-blur-md p-6 sm:p-10 max-w-4xl w-full">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Your ultimate solution for managing and sharing your digital content.
          Join us today to experience seamless organization and collaboration.

        </p>
        
        
          { !isSignedIn ?<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="#" // Placeholder for actual sign-up route
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg text-xl"
          >
            Sign Up
          </a>
          <a
            href="#" // Placeholder for actual sign-in route
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg text-xl"
          >
            Sign In
          </a>
        </div> :<button
                 onClick={handleUploadClick}
                  className="
                 bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                  text-white font-semibold
                   py-3 px-6
                  rounded-lg
                   shadow-md hover:shadow-lg
                   transition duration-300 ease-in-out
        transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
        text-lg
      "
    >
      Upload File
    </button>}

      </header>
    </div>
  );
}