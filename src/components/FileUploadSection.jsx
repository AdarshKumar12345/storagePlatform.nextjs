"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../lib/supabaseClient'; 
/**
 * FileUploadSection Component
 * Handles the UI and logic for uploading general files.
 * @param {Object} props - Component props.
 * @param {function(string)} props.showCustomMessage - Function to display custom messages.
 */
const FileUploadSection = ({ showCustomMessage }) => {
  const{user , isLoaded} = useUser();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
     if( selectedFile === null) {
      showCustomMessage('Please select a File to upload.');
      return;
     }
     if(!user || !isLoaded) {
      showCustomMessage('User not authenticated.');
      return;
     }
        const fileExt = selectedFile.name.split('.').pop();
        const timestamp = Date.now(); // or use UUIDs
        const fileName = `${timestamp}.${fileExt}`; // e.g. 1717072609912.jpg
        const filePath = `uploads/${user.id}/${fileName}`;

        try {
            const { data, error } = await supabase.storage
                .from('project1') // 🔁 Replace with your bucket name
                .upload(filePath, selectedFile );


            if (error) {
                console.error('Upload error:', error);
                console.error('Error:', error.message);
                alert('Error uploading File.');
            } else {
                console.log('File uploaded:', data);
                alert('File uploaded successfully!');
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
          className="h-7 w-7 mr-2 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        Upload Files
      </h2>
      <p className="text-gray-600 mb-4">
        Upload any document, archive, or general file.
      </p>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Choose File
        </label>
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-700">
            Selected: <span className="font-medium">{selectedFile.name}</span>
          </p>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        Upload File
      </button>
    </section>
  );
};

export default FileUploadSection;
