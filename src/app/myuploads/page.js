"use client";

import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function MyUploads() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileLocation, setFileLocation] = useState(null);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const userPath = `uploads/${user.id}`;
    setFileLocation(userPath);

    const getFiles = async () => {
      setLoading(true);

      const { data, error } = await supabase.storage
        .from("project1")
        .list(userPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) {
        console.error("Error listing files:", error);
        setFiles([]);
      } else {
        setFiles(data);
      }

      setLoading(false);
    };

    getFiles();
  }, [user, isLoaded]);

  if (!isLoaded) {
    return <p className="text-center text-gray-500 mt-4">Loading user...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 mt-4">User not authenticated.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-white-800 mb-4">My Uploaded Files</h2>

      {fileLocation && (
        <p className="text-sm text-gray-500 mb-6">
          Folder: <span className="font-mono text-blue-500">{fileLocation}</span>
        </p>
      )}

      {loading && <p className="text-gray-600 animate-pulse">Loading files...</p>}

      {!loading && files.length === 0 && (
        <p className="text-gray-500 italic">No files found.</p>
      )}

      <ul className="space-y-3">
        {files.map((file) => (
          <li
            key={file.name}
            className="flex justify-between items-center bg-blue-200 px-4 py-2 rounded-md hover:to-blue-400 transition"
          >
            <a
              href={`https://ouofvlpgafkmcoremjzs.supabase.co/storage/v1/object/public/project1/${fileLocation}/${file.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline truncate max-w-[70%]"
              title={file.name}
            >
              {file.name}
            </a>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
