import React from 'react';

const YouMightLike = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">You Might Like</h3>
            <a href="#" className="text-blue-500 text-sm font-medium">See All</a>
        </div>
        <div className="flex items-center space-x-4 mb-6">
            <img src="https://i.pravatar.cc/150?u=radovan" alt="User suggestion" className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                <h4 className="font-bold text-sm">Radovan SkillArena</h4>
                <p className="text-xs text-gray-400">Founder & CEO at Trophy</p>
            </div>
        </div>
        <div className="flex space-x-3">
            <button className="flex-1 py-2 border rounded-xl text-sm font-semibold text-gray-500">Ignore</button>
            <button className="flex-1 py-2 bg-blue-600 rounded-xl text-sm font-semibold text-white">Follow</button>
        </div>
    </div>
);

const RecentEvent = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-6">Recent Event</h3>
        <div className="flex space-x-4 items-start p-3 bg-green-50 rounded-xl mb-4">
            <div className="p-3 bg-white rounded-lg text-green-500"><i className="fa-solid fa-graduation-cap"></i></div>
            <div>
                <h4 className="font-bold text-sm">Graduation Ceremony</h4>
                <p className="text-[10px] text-gray-400">The graduation ceremony is also sometimes called...</p>
            </div>
        </div>
        <div className="flex space-x-4 items-start p-3 bg-red-50 rounded-xl">
            <div className="p-3 bg-white rounded-lg text-red-500"><i className="fa-solid fa-camera"></i></div>
            <div>
                <h4 className="font-bold text-sm">Photography Ideas</h4>
                <p className="text-[10px] text-gray-400">Reflections. Reflections work because they can create...</p>
            </div>
        </div>
    </div>
);

const Widgets = () => {
    return (
        <div className="w-full xl:flex-1 space-y-6">
            <YouMightLike />
            <RecentEvent />
        </div>
    );
};

export default Widgets;
