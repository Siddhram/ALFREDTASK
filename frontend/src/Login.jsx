import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import backUrl from './backurl';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
const nav=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backUrl()}/user/login`, formData);
            alert('Login successful!');
            localStorage.setItem('token',response.data.token)
            // console.log(res);
            
                        localStorage.setItem('email',response.data.email)

            console.log('Token:', response.data.token);
            nav("/")
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <section className="bg-white">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
               
                <div className="w-full max-w-md">
                    
                    <h2 className="text-3xl font-bold text-black sm:text-4xl">Login to Flashcard Learning</h2>
                    <p className="mt-2 text-base text-gray-600">
                        Don't have an account? <Link to={"/register"} className="font-medium text-blue-600 hover:underline">Sign up</Link>
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label className="text-base font-medium text-gray-900">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-base font-medium text-gray-900">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600"
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
             <h1 className="text-center mb-10 text-black shadow-md tracking-wide drop-shadow-lg">
    Wait for 2 to 3 seconds because I am using free deployment which take time for request 

      </h1>
        </section>
    );
};

export default Login;
