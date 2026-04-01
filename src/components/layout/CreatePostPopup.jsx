import React from 'react';

const CreatePostPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Create Post</h2>
            <div className="flex items-center space-x-2">
              <a href="#" className="text-sm text-blue-500">Visible For</a>
              <div className="relative">
                <button className="flex items-center space-x-1 text-sm border rounded-md px-2 py-1">
                  <span>Friends</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <textarea
              className="w-full h-24 p-2 border rounded-md resize-none"
              placeholder="What's Happening?"
            ></textarea>
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.55a1 1 0 01.89.55l.8 1.6a1 1 0 01-.22 1.22l-2.12 2.12a1 1 0 01-1.42 0L15 13l-3 3-3-3-2.55 2.55a1 1 0 01-1.22.22l-1.6-.8A1 1 0 014.45 14L4 9.45a1 1 0 01.55-.89l1.6-.8a1 1 0 011.22.22L10 10l3-3 2 2z"></path></svg>
                <span>Live Video</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 16"></path></svg>
                <span>Photo/Video</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Feeling</span>
              </button>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;