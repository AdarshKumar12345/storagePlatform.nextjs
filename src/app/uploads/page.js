"use client"
import React, { useState } from 'react';
import FileUploadSection from '@/components/FileUploadSection';
import PhotoUploadSection from '@/components/PhotoUploadSection';
import VideoUploadSection from '@/components/VideoUploadSection';
import  MyUploadButton  from '@/components/MyUploadButton';

/**
 * HomePage Component
 * A complete home page for a website featuring distinct sections for
 * uploading general files, photos, and videos, all within a single React component.
 * Built with React and styled using Tailwind CSS for a responsive design.
 * Includes a custom message box instead of browser alerts.
 */
const App = () => {
  // State for managing selected file names (for display purposes)
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // State for custom message box
  const [message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);

  /**
   * Displays a custom message box with the given text.
   * @param {string} msg - The message to display.
   */
  const showCustomMessage = (msg) => {
    setMessage(msg);
    setShowMessageBox(true);
    // Automatically hide the message after a few seconds
    setTimeout(() => {
      setShowMessageBox(false);
      setMessage('');
    }, 3000); // Message disappears after 3 seconds
  };

  /**
   * Handles file selection for general files.
   * @param {Object} event - The change event from the file input.
   */
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  /**
   * Handles file selection for photos.
   * @param {Object} event - The change event from the file input.
   */
  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedPhoto(event.target.files[0]);
    } else {
      setSelectedPhoto(null);
    }
  };

  /**
   * Handles file selection for videos.
   * @param {Object} event - The change event from the file input.
   */
  const handleVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedVideo(event.target.files[0]);
    } else {
      setSelectedVideo(null);
    }
  };

  /**
   * Handles the upload action (mock function).
   * In a real application, this would send the file to a server.
   * @param {string} type - The type of upload (e.g., 'file', 'photo', 'video').
   * @param {File} file - The file to be uploaded.
   */
  const handleUpload = (type, file) => {
    if (file) {
      console.log(`Uploading ${type}:`, file.name);
      // Here you would typically make an API call to upload the file
      showCustomMessage(`Simulating upload of ${file.name} (${type}).`);
      // Reset the selected file after "upload"
      if (type === 'file') setSelectedFile(null);
      if (type === 'photo') setSelectedPhoto(null);
      if (type === 'video') setSelectedVideo(null);
    } else {
      showCustomMessage(`Please select a ${type} to upload.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Custom Message Box */}
      {showMessageBox && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl text-lg z-50 animate-fade-in-down">
          {message}
        </div>
      )}

      {/* Define keyframes for the fade-in-down animation */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
      `}</style>

      <header className="text-center py-8 mb-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Welcome to Our Platform!
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Easily upload your files, photos, and videos to share and manage.
        </p>
      </header>
      <MyUploadButton showCustomMessage={showCustomMessage} />

      {/* Main content area with three sections */}

      <main className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* File Upload Section */}
        <FileUploadSection/>
        {/* Photo Upload Section */}
        <PhotoUploadSection/>

        {/* Video Upload Section */}
        <VideoUploadSection/>
        
      </main>

      <footer className="text-center mt-12 py-6 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
