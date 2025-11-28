// EventTable.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

// Define the available options and the component that uses them
const STATUS_OPTIONS = ['going', 'not going', 'maybe'];

const getStatusClasses = (status) => {
    // Ensure the function handles the status from the select element
    switch (status) {
        case 'going':
            return 'bg-green-100 text-green-700 border-green-300 dark:border-green-600';
        case 'not going':
            return 'bg-red-100 text-red-700 border-red-300 dark:border-red-600';
        case 'maybe':
            return 'bg-amber-100 text-amber-700 border-amber-300 dark:border-amber-600';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-300 dark:border-gray-600';
    }
};

const EventTable = ({ data = [], onStatusChange, loading = false }) => {
    const navigate = useNavigate();

    const handleViewDetails = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    const handleStatusUpdate = (e, item) => {
        // Stop the event propagation to prevent the row-click (handleViewDetails) from triggering
        e.stopPropagation();

        const newStatus = e.target.value;
        onStatusChange?.(item, newStatus);
    };

    return (
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                {/* Table Header */}
                <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Event</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {loading && (
                    <tr>
                        <td colSpan="4" className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                            Loading your events...
                        </td>
                    </tr>
                )}
                {!loading && data.length === 0 && (
                    <tr>
                        <td colSpan="4" className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                            No events to show yet.
                        </td>
                    </tr>
                )}
                {!loading && data.map((item) => (
                    <tr key={item.eventId ?? item.event}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 cursor-pointer"
                        // Handle View Details on Row Click
                        onClick={() => handleViewDetails(item.eventId || item.event?.replace(/\s+/g, ''))}
                    >

                        {/* Event Cell */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
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

                        {/* Status Pill Cell (Interactive Dropdown) */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <select
                                value={item.status} // Controlled component based on current data status
                                onChange={(e) => handleStatusUpdate(e, item)}
                                disabled={loading}
                                // Styling the select element to look like a pill/button
                                className={`
                                    appearance-none py-1.5 px-3 rounded-full text-xs font-semibold 
                                    uppercase border focus:ring-2 focus:ring-indigo-500 focus:outline-none 
                                    transition duration-150 cursor-pointer text-center
                                    ${getStatusClasses(item.status)}
                                `}
                                // Add a generic right arrow indicator (requires a custom Tailwind setup or small SVG/icon)
                                style={{ paddingRight: '2.5rem', backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem 1rem' }}
                            >
                                {STATUS_OPTIONS.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventTable;