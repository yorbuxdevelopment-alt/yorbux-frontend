import React from 'react';
import { Plus } from 'lucide-react';

const SuggestionWidget = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-md mb-4">You Might Like</h3>
        <div className="flex items-center space-x-4">
            <img src="https://i.pravatar.cc/150?u=radovan" className="w-12 h-12 rounded-full object-cover" alt="Profile" />
            <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">Radovan SkillArena</h4>
                <p className="text-gray-500 text-xs">Founder at Trophy</p>
            </div>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
                <Plus size={18} />
            </button>
        </div>
    </div>
);

export default SuggestionWidget;
