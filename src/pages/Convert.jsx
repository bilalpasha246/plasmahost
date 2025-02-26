import React, { useState } from 'react';
import Navbar from "../components/Navbar";

function Convert() {
  // State to store the uploaded file
  const [file, setFile] = useState(null);

  const [downloadUrl, setDownloadUrl] = useState(null);

  // State to show/hide loading overlay
  const [isLoading, setIsLoading] = useState(false);

  // Select file by dropping
  const fileDrop = (event) => {
    event.preventDefault();
    const upload_file = event.dataTransfer.files[0];
    setFile(upload_file);
  };

  // Select file via file picker
  const fileSelect = (event) => {
    const upload_file = event.target.files[0];
    setFile(upload_file);
  };

  // Ignore drag over events
  const dragOver = (event) => {
    event.preventDefault();
  };

  // Basic file validation (example: check if the file is a DXF)
  const isValidFile = (file) => {
    if (!file) return false;
    // Check if the file extension is .dxf (case-insensitive)
    return file.name.toLowerCase().endsWith('.dxf');
  };

  // Handle the "upload" (in this case, just simulating processing)
  const handleConvert = async () => {
    // Ensure a file is selected
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    // Validate the file type
    if (!isValidFile(file)) {
      alert('Invalid file type. Only DXF files are allowed.');
      return;
    }

    // Simulate a loading state
    setIsLoading(true);

    try {
      // 1. Request a presigned URL from your Python server
      // Make sure to use the correct endpoint:
      const response = await fetch('https://plasma-env.eba-ehc3x2tx.us-west-2.elasticbeanstalk.com/get_upload_url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name }),
      });

      if (!response.ok) {
        throw new Error('Failed to get presigned URL.');
      }

      const { upload_url, id } = await response.json();
      console.log("file type: ", file.type)

      // 2. Upload the file to S3 using the presigned URL
      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type || 'application/dxf',
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3.');
      }

      // Successfully uploaded
      alert('File uploaded to S3 successfully!');

      // 3. Request and Receive the download link for the file
      const download_response = await fetch(`https://plasma-env.eba-ehc3x2tx.us-west-2.elasticbeanstalk.com/get_download_url?file_id=${id}`, {
        method: 'GET',
      });
      
      if (!download_response.ok) {
        throw new Error('Failed to get presigned URL.');
      }
      
      // Parse the JSON from the response
      const { download_url } = await download_response.json();
      setDownloadUrl(download_url);

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

    // Handle file download
  const handleDownload = async () => {
    if (!downloadUrl) return;

    try {
      // Fetch the file as a blob
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error("Failed to download the file.");
      }
      const blob = await response.blob();
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      // Optionally, set a filename for the download
      let fileName = file.name;
      let objName = fileName.slice(0, -4) + ".obj";
      link.setAttribute("download", objName);
      // Append the link, trigger the download, and remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Release the blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <Navbar />

      <div className="flex-grow flex flex-col justify-center items-center w-full h-full">
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="spinner border-4 border-t-4 border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
            <p className="loading-text text-white mt-4">Processing your file...</p>
          </div>
        )}

        <h1 className="text-5xl font-bold text-center mb-16">Convert DXF to OBJ</h1>

        <label
          className="flex flex-col items-center justify-center w-[30%] h-[22%] border-2 border-dashed border-white rounded-md cursor-pointer"
          onDrop={fileDrop}
          onDragOver={dragOver}
        >
          {file ? (
            <strong className="text-white text-center mt-16">{file.name}</strong>
          ) : (
            <>
              <i className="bx bxs-cloud-upload text-9xl text-white mt-16"></i>
              <span className="text-md font-semibold text-white mb-16">
                Drop file to upload or Browse
              </span>
              <input
                id="fileUpload"
                type="file"
                accept=".dxf"
                className="hidden"
                onChange={fileSelect}
              />
            </>
          )}
        </label>

        <button
          onClick={handleConvert}
          disabled={!file || isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-8 disabled:bg-gray-500"
        >
          Convert
        </button>

        {downloadUrl && (
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Download Converted File
          </button>
        )}

        <p className="text-md text-center mt-16 italic">
          Automating the conversion process of DXF to OBJ files to maximize accuracy and efficiency.
        </p>
      </div>
    </div>
  );
}

export default Convert;
