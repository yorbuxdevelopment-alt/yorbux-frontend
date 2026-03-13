import React from 'react';

const SignIn = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <header className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-blue-600">Yor-Bux</div>
          <div>
            <select className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </header>

        <main>
          <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>
          <div className="flex justify-center gap-4 mb-4">
            <button className="flex items-center justify-center bg-white border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100">
              {/* Google Icon */}
              <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
              Sign in with Google
            </button>
            <button className="flex items-center justify-center bg-black text-white rounded-full px-4 py-2 hover:bg-gray-800">
              {/* Apple Icon */}
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.06c-1.1 0-2.22.3-3.2.88-.98.58-1.82 1.4-2.48 2.36-.65.98-1.08 2.1-1.22 3.28-.14 1.18.04 2.38.52 3.48.48 1.1.92 2.02 1.52 2.84.6.82 1.32 1.52 2.16 2.08.84.56 1.8.9 2.8.9s1.96-.34 2.8-.9c.84-.56 1.56-1.26 2.16-2.08.6-.82 1.04-1.74 1.52-2.84.48-1.1.66-2.3.52-3.48-.14-1.18-.57-2.3-1.22-3.28-.66-.96-1.5-1.78-2.48-2.36C12.22 3.36 11.1 3.06 10 3.06zm3.44 11.52c-.56.88-1.24 1.6-2.04 2.16-.8.56-1.72.84-2.76.84s-1.96-.28-2.76-.84c-.8-.56-1.48-1.28-2.04-2.16-.56-.88-.9-1.84-1-2.88.1-1.04.52-2.04 1.24-2.96.72-.92 1.68-1.6 2.84-2.04.58-.22 1.18-.33 1.8-.33s1.22.11 1.8.33c1.16.44 2.12 1.12 2.84 2.04.72.92 1.14 1.92 1.24 2.96-.1.96-.44 1.92-1 2.88zM10.04 2a.76.76 0 00-.76.76.76.76 0 00.76.76c.4 0 .76-.34.76-.76a.76.76 0 00-.76-.76z"></path></svg>
              Sign in with Apple
            </button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="mx-4 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <form>
            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* @ Icon */}
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              </span>
              <input type="email" placeholder="Enter your Email" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700" />
            </div>
            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Lock Icon */}
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              </span>
              <input type="password" placeholder="Password" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700" />
            </div>
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign In
            </button>
          </form>

          <p className="text-center mt-8">
            You haven't any account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </main>
      </div>
    </div>
  );
};

export default SignIn;
