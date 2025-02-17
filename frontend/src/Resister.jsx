import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Resister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        agree: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const nav=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agree) {
            alert('You must agree to the terms and conditions.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/user/register', {
                email: formData.email,
                password: formData.password
            });
            alert(response.data.message);
            nav('/login')
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up to Celebration</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account? <Link to={"/login"} className="font-medium text-blue-600 hover:text-blue-700 hover:underline">Login</Link>
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label className="text-base font-medium text-gray-900">Full Name</label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-base font-medium text-gray-900">Email address</label>
                                    <div className="mt-2.5">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email to get started"
                                            className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-base font-medium text-gray-900">Password</label>
                                    <div className="mt-2.5">
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
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-blue-600 border-gray-200 rounded"
                                    />
                                    <label className="ml-3 text-sm text-gray-500">
                                        I agree to Celebration’s <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
                                    </label>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    >
                                        Create free account
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-3 space-y-3">
                           

                            
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div>
                        <img className="w-full mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png" alt="Cards" />
                        <div className="w-full max-w-md mx-auto xl:max-w-xl">
                            <h3 className="text-2xl font-bold text-center text-black">Design your own card</h3>
                            <p className="mt-2.5 text-center text-gray-500">Create beautiful cards with ease.</p>
                            <div className="flex items-center justify-center mt-10 space-x-3">
                                <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>
                                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resister;
