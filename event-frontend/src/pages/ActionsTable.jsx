import React from 'react';

// Helper function for status classes
const getStatusClasses = (status) => {
    switch (status.toLowerCase()) { // Ensure case-insensitivity
        case 'active':
            return 'bg-green-100 text-green-700';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700';
        case 'inactive':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const ActionsTable = ({ data }) => {
    // These functions would typically interact with your backend
    const handleEdit = (id) => {
        alert(`Editing event with ID: ${id}`);
        // Implement navigation to edit page or open a modal
        // Example: navigate(`/events/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete event with ID: ${id}?`)) {
            alert(`Deleting event with ID: ${id}`);
            // Implement API call to delete the event, then update state
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