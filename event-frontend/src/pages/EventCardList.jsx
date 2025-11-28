import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// --- EventCard Component ---
const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const eventId = event.eventId ?? event.id;

    const handleAction = () => {
        if (eventId) {
            navigate(`/events/${eventId}`);
        }
    };

    const buttonClass = "bg-indigo-600 hover:bg-indigo-700 text-white";

    return (
        <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200">

            {/* Left Section: Text Content */}
            <div className="flex-1">
                {/* Category Header */}
                <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                    {event.category || 'Event'}
                </p>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {event.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {event.date}
                    {event.location && ` • ${event.location}`}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {event.description || 'No description provided yet.'}
                </p>

                {/* Action Button: Now always navigates to details */}
                <button
                    className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition duration-150 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${buttonClass}`}
                    onClick={handleAction}
                >
                    View Details →
                </button>
            </div>

            {/* Right Section: Image Card */}
            <div className="w-full md:w-60 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700">
                {/* Placeholder for Image */}
                <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold text-white opacity-90">
                    {(event.category || 'EVT').slice(0, 3).toUpperCase()}
                </div>
            </div>
        </div>
    );
};


// --- EventCardList Component ---
const EventCardList = ({ data = [], onSearch, isLoading = false }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    // Basic client-side filtering until API integration is wired in
    const filteredEvents = (Array.isArray(data) ? data : []).filter(event => {
        const term = searchTerm.trim().toLowerCase();
        return term === '' ||
            event.title?.toLowerCase().includes(term) ||
            event.description?.toLowerCase().includes(term);
    });

    return (
        <div className="p-4">

            {/* --- Search Input --- */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full md:flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search upcoming events..."
                />
                <button
                    type="button"
                    onClick={() => onSearch && onSearch(searchTerm)}
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-150"
                >
                    Search
                </button>
            </div>

            {/* --- Event List --- */}
            <div className="max-w-4xl mx-auto">
                {isLoading && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                        Loading events...
                    </p>
                )}
                {!isLoading && filteredEvents.map(event => (
                    // Pass the event object to the card component
                    <EventCard key={event.eventId ?? event.id} event={event} />
                ))}
            </div>

            {!isLoading && filteredEvents.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                    No upcoming events match your search yet.
                </p>
            )}
        </div>
    );
};

export default EventCardList;