"use client"
import React, { useState } from 'react';
import {supabase} from '../lib/supabaseClient';
import {useUser} from "@clerk/nextjs" // Adjust the import based on your project structure

/**
 * PhotoUploadSection Component
 * Handles the UI and logic for uploading photo files.
 * @param {Object} props - Component props.
 * @param {function(string)} props.showCustomMessage - Function to display custom messages.
 */
const PhotoUploadSection = ({ showCustomMessage }) => {
const { user, isLoaded } = useUser();

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedPhoto(event.target.files[0]);
      console.log(event.target.files[0].name)
    } else {
      setSelectedPhoto(null);
    }
  };

  const handleUpload = async () => {
     if( selectedPhoto === null) {
      showCustomMessage('Please select a photo to upload.');
      return;
     }
     if(!user || !isLoaded) {
      showCustomMessage('User not authenticated.');
      return;
     }
        const fileExt = selectedPhoto.name.split('.').pop();
        const timestamp = Date.now(); // or use UUIDs
        const fileName = selectedPhoto.name // e.g. 1717072609912.jpg
        const filePath = `uploads/${user.id}/${fileName}`;

        try {
            const { data, error } = await supabase.storage
                .from('project1') // 🔁 Replace with your bucket name
                .upload(filePath, selectedPhoto );


            if (error) {
                console.error('Upload error:', error);
                console.error('Error:', error.message);
                alert('Error uploading image.');
            } else {
                console.log('Image uploaded:', data);
                alert('Image uploaded successfully!');
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
          className="h-7 w-7 mr-2 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Upload Photos
      </h2>
      <p className="text-gray-600 mb-4">
        Share your favorite images and pictures.
      </p>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center">
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <label
          htmlFor="photo-upload"
          className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Choose Photo
        </label>
        {selectedPhoto && (
          <p className="mt-2 text-sm text-gray-700">
            Selected: <span className="font-medium">{selectedPhoto.name}</span>
          </p>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        Upload Photo
      </button>
    </section>
  );
};

export default PhotoUploadSection;
