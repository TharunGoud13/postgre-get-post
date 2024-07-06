
"use client"
import React, { useState } from 'react'

const SignUp = () => {
    const [username,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState(0)
    const [address,setAddress] = useState("")
    const [id,setId] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            body: JSON.stringify({ id,username, email, phone,address }),
          });
    
          const data = await response.json();
          console.log('Success:', data);
    
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };
    
  return (
    <div className='flex flex-col justify-center h-screen items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col my-2.5 gap-2.5'>
            <input onChange={(e) => setId(e.target.value)} type="number" className='border p-2.5 border-black' placeholder="Enter Id"/>
            <input onChange={(e) => setName(e.target.value)} type="text" className='border p-2.5 border-black' placeholder="Enter Name"/>
            <input  onChange={(e) => setEmail(e.target.value)} type="email" className='border p-2.5 border-black' placeholder="Enter Email"/>
            <input  onChange={(e) => setPhone(e.target.value)} type="number" className='border p-2.5 border-black' placeholder="Enter Phone Number"/>
            <input  onChange={(e) => setAddress(e.target.value)} type="text" className='border p-2.5 border-black' placeholder="Enter Address"/>
            <button className='p-2.5 bg-blue-500 text-white'>Submit</button>
        </form>
    </div>
  )
}

export default SignUp