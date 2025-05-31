"use client"
import React, { useState } from 'react';
import {supabase} from '../lib/supabaseClient';
import {useUser} from "@clerk/nextjs"


/**
 * VideoUploadSection Component
 * Handles the UI and logic for uploading video files.
 * @param {Object} props - Component props.
 * @param {function(string)} props.showCustomMessage - Function to display custom messages.
 */
const VideoUploadSection = ({ showCustomMessage }) => {
  const { user, isLoaded } = useUser();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedVideo(event.target.files[0]);
    } else {
      setSelectedVideo(null);
    }
  };

  const handleUpload = async () => {
     if( selectedVideo === null) {
      showCustomMessage('Please select a video to upload.');
      return;
     }
     if(!user || !isLoaded) {
      showCustomMessage('User not authenticated.');
      return;
     }
        const fileExt = selectedVideo.name.split('.').pop();
        const timestamp = Date.now(); // or use UUIDs
        const fileName = `${timestamp}.${fileExt}`; // e.g. 1717072609912.jpg
        const filePath = `uploads/${user.id}/${fileName}`;

        try {
            const { data, error } = await supabase.storage
                .from('project1') // 🔁 Replace with your bucket name
                .upload(filePath, selectedVideo );


            if (error) {
                console.error('Upload error:', error);
                console.error('Error:', error.message);
                alert('Error uploading video.');
            } else {
                console.log('video uploaded:', data);
                alert('video uploaded successfully!');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('Unexpected error during upload.');
        }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 mr-2 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        Upload Videos
      </h2>
      <p className="text-gray-600 mb-4">
        Upload your video clips and recordings.
      </p>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center">
        <input
          type="file"
          id="video-upload"
          accept="video/*"
          className="hidden"
          onChange={handleVideoChange}
        />
        <label
          htmlFor="video-upload"
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Choose Video
        </label>
        {selectedVideo && (
          <p className="mt-2 text-sm text-gray-700">
            Selected: <span className="font-medium">{selectedVideo.name}</span>
          </p>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        Upload Video
      </button>
    </section>
  );
};

export default VideoUploadSection;