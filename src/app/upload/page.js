"use client"
import React, { useState, useEffect } from 'react'
import ImageDisplay from '../images/page';


const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [uploadedFileId, setUploadedFileId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData(); // for handling file or image uploadings
        data.set("file", file);
        const response = await fetch('/api/upload', { method: "POST", body: data });
        const result = await response.json();
        console.log(result);
        console.log("id--",result.response)
        setUploadedFileId(result.response)
       
        
        console.log(uploadedFileId)
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-3xl'>Upload File / Image</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} />
                <button type="submit" className='border text-white bg-blue-600 p-2.5 rounded'>Upload</button>
            </form>
            {uploadedFileId && <ImageDisplay fileId={uploadedFileId} />}
        </div>
    );
}

export default UploadPage;
