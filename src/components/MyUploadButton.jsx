import { redirect } from 'next/dist/server/api-utils';
import React from 'react';

const MyUploadButton = ({ href = "myuploads" }) => {
    const handleClick = () =>{
        console.log(`redirection to ${href}`)
        window.location.href = href;
    }
    
    return (
        <div>
            <button  type="button" className="
          bg-blue-500 hover:bg-blue-700
          text-white font-bold py-2 px-4 rounded
          transition duration-300 ease-in-out transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
        "  onClick={handleClick}>Upload</button>
        </div>
    );
}

export default MyUploadButton;
