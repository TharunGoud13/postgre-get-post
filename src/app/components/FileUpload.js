// components/FileUpload.js
"use client"
import { useState, useRef } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    inputRef.current.value = "";
  };

  return (
    <div>
      <div
        className={`file-upload ${dragActive ? 'active border-red-500' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-input"
          onChange={handleChange}
        />
        <p>Drag and drop your file here or click to upload</p>
      </div>
      {file && (
        <div className="file-details">
          <p>{file.name}</p>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
      <style jsx>{`
        .file-upload {
          border: 2px dashed #ccc;
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
        .file-upload.active {
          border-color: #000;
        }
        .file-input {
          display: none;
        }
        .file-details {
          margin-top: 20px;
        }
        .file-details p {
          display: inline;
          margin-right: 10px;
        }
        .file-details button {
          background: red;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
