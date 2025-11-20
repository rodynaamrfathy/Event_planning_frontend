// EventDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailedEvents } from "../assets/fakedata";

// Function to simulate fetching data (will be replaced by an API call later)
const fetchEventDetailsById = (eventId) => {
    // In a real app, this would be an async API call: GET /api/events/{eventId}
    return detailedEvents.find(event => event.id === eventId);
};

const EventDetailsPage = () => {
    // 1. Extract the 'id' parameter from the URL (e.g., from /events/tech-meetup)
    const { id } = useParams();

    // 2. Use state to hold the event data
    const [event, setEvent] = useState(null);

    // 3. Use useEffect to fetch data when the component mounts or the ID changes
    useEffect(() => {
        // In a real app, you would handle loading state and errors here
        const data = fetchEventDetailsById(id);
        setEvent(data);
    }, [id]); // Re-run effect if the ID changes

    if (!event) {
        // Handle loading or not found state
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 p-10 text-center text-gray-500">
                {event === null ? 'Loading event details...' : 'Event not found.'}
            </div>
        );
    }

    // --- Content Rendering (Matches your design) ---
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">

                {/* --- Header Section (Title and Host) --- */}
                <h1 className="text-4xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                    {event.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Hosted by **{event.hostedBy}**
                </p>

                {/* --- Details Header --- */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Details
                </h2>

                {/* --- Info Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-8">

                    {/* Date & Time Block */}
                    <div>
                        <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            Date & Time
                        </p>
                        <p className="text-lg text-gray-800 dark:text-gray-200">
                            {event.date}, {event.timeRange}
                        </p>
                    </div>

                    {/* Location Block */}
                    <div>
                        <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            Location
                        </p>
                        <p className="text-lg text-gray-800 dark:text-gray-200">
                            {event.location}
                        </p>
                    </div>
                </div>

                {/* --- Description Block --- */}
                <div className="mt-4">
                    <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
                        Description
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {event.description}
                    </p>
                </div>

                <div className="mt-10">
                    <button className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-lg">
                        RSVP / Join Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;