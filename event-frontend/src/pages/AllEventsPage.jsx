import React, { useCallback, useEffect, useState } from 'react';
import EventCardList from "./EventCardList.jsx";
import { searchEvents } from "../services/eventService.js";

export default function AllEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const normalizeEvents = (items) => items.map((event) => ({
        id: event.eventId,
        eventId: event.eventId,
        title: event.title,
        description: event.description,
        category: event.category ?? "Event",
        location: event.location ?? "TBD",
        date: formatDate(event.eventDate),
    }));

    const loadEvents = useCallback(async (keyword = "") => {
        try {
            setLoading(true);
            const response = await searchEvents(keyword ? { keyword } : {});
            const list = normalizeEvents(response?.events ?? []);
            setEvents(list);
            setError(null);
        } catch (err) {
            const message = err.response?.data?.message || "Unable to load events.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">

                {/* --- Header --- */}
                <h1 className="text-4xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                    Discover All Events
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Browse upcoming tech, music, and social gatherings, and quickly search to find the one you need.
                </p>
                {error && (
                    <p className="mb-4 text-sm text-red-500">{error}</p>
                )}

                {/* --- Event Listing Component --- */}
                <EventCardList
                    data={events}
                    onSearch={loadEvents}
                    isLoading={loading}
                />
            </div>
        </div>
    );
}