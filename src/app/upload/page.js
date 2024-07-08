"use client"
import React, { useState } from 'react'

const page = () => {
    const [file,setFile] = useState(null)
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.set("file",file)
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: data
        })
        const result = await response.json()
        console.log(result)
    }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-3xl'>Upload Image</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} />
            <button type="submit" className='border p-2.5 text-white bg-blue-600'>Upload</button>
        </form>
    </div>
  )
}

export default page