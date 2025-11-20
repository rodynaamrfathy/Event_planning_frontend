import React from 'react';
import {useNavigate} from "react-router-dom";

const getStatusClasses = (status) => {
    switch (status) {
        case 'going':
            return 'bg-green-100 text-green-700';
        case 'not going':
            return 'bg-red-100 text-red-700';
        case 'maybe':
            return 'bg-amber-100 text-amber-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const EventTable = ({ data }) => {
    const navigate = useNavigate();

    const handleViewDetails = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                {/* Table Header */}
                <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                    >
                        Event
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                    >
                        Date
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                    >
                        Time
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                    >
                        Status
                    </th>
                </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {data.map((item, index) => (
                    <tr key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150"
                        onClick={() => handleViewDetails(item.event.replace(/\s+/g, ''))} // Using the event name as a simple "ID"
                        >

                        {/* Event Cell */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                            {item.event}
                        </td>

                        {/* Date Cell (lighter color) */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.date}
                        </td>

                        {/* Time Cell (lighter color) */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.time}
                        </td>

                        {/* Status Pill Cell */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div
                                className={`
                                        inline-flex items-center px-4 py-1.5 
                                        rounded-full text-xs font-semibold 
                                        tracking-wide uppercase 
                                        ${getStatusClasses(item.status)}
                                    `}
                            >
                                {item.status}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventTable;