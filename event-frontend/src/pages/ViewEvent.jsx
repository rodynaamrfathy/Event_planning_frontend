import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById, respondToEvent } from "../services/eventService.js";

const EventDetailsPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRsvping, setIsRsvping] = useState(false);

    useEffect(() => {
        const loadEvent = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await fetchEventById(id);
                setEvent(data);
                setError(null);
            } catch (err) {
                const message = err.response?.data?.message || "Event not found.";
                setError(message);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [id]);

    const handleRsvp = async () => {
        if (!event?.eventId || isRsvping) return;
        try {
            setIsRsvping(true);
            await respondToEvent(event.eventId, "Going");
            alert("Your RSVP has been recorded as 'Going'.");
        } catch (err) {
            const message = err.response?.data?.message || "Unable to submit RSVP.";
            alert(message);
        } finally {
            setIsRsvping(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 p-10 text-center text-gray-500">
                Loading event details...
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 p-10 text-center text-red-500">
                {error || "Event not found."}
            </div>
        );
    }

    const formattedDate = event.eventDate
        ? new Date(event.eventDate).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "Date TBD";

    return (
            <div className="min-h-screen bg-white dark:bg-gray-950 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">

                {/* --- Header Section (Title and Host) --- */}
                <h1 className="text-4xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                    {event.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Hosted by {event.organizer?.name || "Organizer"}
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
                            Date
                        </p>
                        <p className="text-lg text-gray-800 dark:text-gray-200">
                            {formattedDate}
                        </p>
                    </div>

                    {/* Location Block */}
                    <div>
                        <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            Location
                        </p>
                        <p className="text-lg text-gray-800 dark:text-gray-200">
                            {event.location || "Location TBD"}
                        </p>
                    </div>
                </div>

                {/* --- Description Block --- */}
                <div className="mt-4">
                    <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
                        Description
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {event.description || "No description available for this event yet."}
                    </p>
                </div>

                <div className="mt-10">
                    <button
                        onClick={handleRsvp}
                        disabled={isRsvping}
                        className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 shadow-lg"
                    >
                        {isRsvping ? "Submitting RSVP..." : "RSVP / Join Event"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;