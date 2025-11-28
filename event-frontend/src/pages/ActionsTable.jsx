import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEvent } from '../services/eventService.js';

// Helper function for status classes
const getStatusClasses = (status) => {
    switch (status.toLowerCase()) { // Ensure case-insensitivity
        case 'active':
            return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
        case 'inactive':
            return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
};

const ActionsTable = ({ data, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/events/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Are you sure you want to delete this event? This action cannot be undone.`)) {
            return;
        }

        try {
            await deleteEvent(id);
            if (onDelete) {
                onDelete(id);
            } else {
                // Reload the page if no callback provided
                window.location.reload();
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to delete event.";
            alert(message);
        }
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
                    <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                    >
                        Actions {/* New Actions Header */}
                    </th>
                </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150">

                        {/* Event Cell */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                            {item.event}
                        </td>

                        {/* Date Cell */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.date}
                        </td>

                        {/* Time Cell */}
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

                        {/* Actions Cell */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                                onClick={() => handleEdit(item.id)}
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActionsTable;