import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { EVENT_CATEGORIES, FILTERABLE_CATEGORIES } from '../constants/EventCategories';

// --- EventCard Component ---
const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        navigate(`/events/${event.id}`);
    };

    const buttonClass = "bg-indigo-600 hover:bg-indigo-700 text-white";

    return (
        <div className="flex flex-col md:flex-row gap-6 mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">

            {/* Left Section: Text Content */}
            <div className="flex-1">
                {/* Category Header */}
                <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                    {event.category}
                </p>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {event.description}
                </p>

                {/* Action Button: Now always navigates to details */}
                <button
                    className={`px-4 py-2 text-sm font-medium rounded-md transition duration-150 ${buttonClass}`}
                    onClick={handleAction}
                >
                    View Details
                </button>
            </div>

            {/* Right Section: Image Card */}
            <div className="w-full md:w-60 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-lg bg-gray-700 dark:bg-gray-900">
                {/* Placeholder for Image */}
                <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold text-white opacity-40">
                    {event.category === EVENT_CATEGORIES.TECH ? 'AI' : 'FEST'}
                </div>
            </div>
        </div>
    );
};


// --- EventCardList Component ---
const EventCardList = ({ data }) => {
    const [filterCategory, setFilterCategory] = useState(EVENT_CATEGORIES.ALL);

    // List of available categories for the dropdowns
    const categories = [EVENT_CATEGORIES.ALL, ...FILTERABLE_CATEGORIES];

    // Simulate filtering logic
    const filteredEvents = data.filter(event =>
        filterCategory === EVENT_CATEGORIES.ALL || event.category === filterCategory
    );

    return (
        <div className="p-4">

            {/* --- Filter Dropdowns --- */}
            <div className="flex space-x-4 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`
                            px-4 py-2 text-sm font-medium rounded-md transition duration-150
                            ${filterCategory === cat
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                        }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* --- Event List --- */}
            <div className="max-w-4xl mx-auto">
                {filteredEvents.map(event => (
                    // Pass the event object to the card component
                    <EventCard key={event.id} event={event} />
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                    No upcoming events found in this category.
                </p>
            )}
        </div>
    );
};

export default EventCardList;