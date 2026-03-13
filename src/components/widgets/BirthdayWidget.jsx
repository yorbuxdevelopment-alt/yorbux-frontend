import React from 'react';
import { Gift } from 'lucide-react';

const BirthdayWidget = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-md mb-4">Birthdays</h3>
        <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Gift size={20} />
            </div>
            <p className="text-sm text-gray-700">
                <span className="font-semibold">Edilson De Carvalho</span>'s birthday is today.
            </p>
        </div>
    </div>
);

export default BirthdayWidget;
