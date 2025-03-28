import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://employee-api-woad.vercel.app/api/auth/login", {email, password});
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
        }
    }

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-blue-700 from-50% to-gray-100 to-50% space-y-6">
        <h2 className="font-serif font-semibold text-3xl text-white">The Employee Management System</h2>
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <div htmlFor="email" className='block text-gray-700'>Email</div>
                <input type="email" className='w-full px-3 py-2 border' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='mb-4'>
                <div htmlFor="password" className='block text-gray-700'>Password</div>
                <input type="password" className='w-full px-3 py-2 border' placeholder='*******' onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='md-4 mb-3 flex items-center justify-between'>
               <div className='inline-flex items-center'>
                  <input type="checkbox" className="form-checkbox" />
                  <div className="ml-2 text-gray-700">Remember me</div>
               </div>
               <a href="#" className="text-blue-600">
                Forgot password?
               </a>
            </div>
            <div className='mb-3'>
            <button type="submit" className="w-full bg-blue-600 text-white py-2">Login</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login