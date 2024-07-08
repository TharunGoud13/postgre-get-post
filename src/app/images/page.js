"use client"
import React, { useState, useEffect } from 'react'

const ImageDisplay = ({ fileId }) => {
    const [imageData, setImageData] = useState(null);
    console.log(imageData)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/upload?id=${fileId}`);
                const result = await response.json();
                console.log("result-----",result)
              
                    setImageData(result.dataUrl);
                
            } catch (err) {
                console.error('Error fetching image:', err);
            }
        };

        fetchImage();
    }, [fileId]);

    if (!imageData) {
        return <p>Loading image...</p>;
    }

    return <img src={imageData} alt="Uploaded File" />;
};

export default ImageDisplay
