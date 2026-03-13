import React from 'react';
import { Link } from 'react-router-dom';

// Note: The onLogin prop is passed from App.jsx to handle the login state
const SignIn = ({ onLogin }) => {
  return (
    <div className="bg-white font-sans flex items-center justify-center min-h-screen w-full">
      
      <div className="absolute top-6 right-6">
        <button className="flex items-center space-x-2 text-body-sm text-gray-500 border rounded-lg px-3 py-1.5 bg-white shadow-sm">
          <span>English (UK)</span>
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </button>
      </div>

      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-check text-white text-xs"></i>
        </div>
        <span className="font-bold text-h3">Meetmax</span>
      </div>

      <div className="w-full flex flex-col items-center p-4">
        {/* Dummy Credentials Info Box */}
        <div className="w-full max-w-lg bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 text-center">
          <p className="font-semibold text-body">For Demo Purposes</p>
          <p className="text-body-sm">Email: <span className="font-medium">admin@demo.com</span></p>
          <p className="text-body-sm">Password: <span className="font-medium">password123</span></p>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-display-md font-semibold text-slate-800 mb-2">Sign In</h1>
          <p className="text-body text-gray-500">Welcome back, you've been missed!</p>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 w-full max-w-lg">
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center space-x-2 border border-gray-100 bg-gray-50/50 py-3 rounded-xl hover:bg-gray-100 transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              <span className="text-body-sm font-semibold text-gray-700">Log in with Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border border-gray-100 bg-gray-50/50 py-3 rounded-xl hover:bg-gray-100 transition">
              <i className="fa-brands fa-apple text-h2"></i>
              <span className="text-body-sm font-semibold text-gray-700">Log in with Apple</span>
            </button>
          </div>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-caption font-bold text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* The form now uses a button with an onClick handler */}
          <div className="space-y-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <i className="fa-solid fa-at"></i>
              </span>
              <input type="email" defaultValue="admin@demo.com" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 text-gray-800" placeholder="Email" />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type="password" defaultValue="password123" className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 text-gray-800" placeholder="Password" />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 cursor-pointer">
                <i className="fa-regular fa-eye"></i>
              </span>
            </div>

            <div className="flex items-center justify-between text-body-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-500 font-medium">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-gray-500 font-medium hover:text-blue-600">Forgot Password?</Link>
            </div>

            <button
              onClick={onLogin}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transform active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
          </div>
        </div>

        <p className="mt-8 text-body-sm font-medium text-gray-500">
          You haven't any account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
