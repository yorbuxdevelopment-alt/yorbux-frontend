import React from 'react';
import { GraduationCap, Camera } from 'lucide-react';

const RecentEvent = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-md mb-4">Recent Events</h3>
        <div className="space-y-3">
            <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <GraduationCap size={20} />
                </div>
                <p className="text-sm text-gray-700 group-hover:text-green-700">Graduation Ceremony</p>
            </div>
            <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <Camera size={20} />
                </div>
                <p className="text-sm text-gray-700 group-hover:text-red-700">Photography Ideas</p>
            </div>
        </div>
    </div>
);

export default RecentEvent;
