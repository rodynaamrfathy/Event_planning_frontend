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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* --- Header --- */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Discover All Events
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Browse upcoming tech, music, and social gatherings, and quickly search to find the one you need.
                            </p>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}
                </div>

                {/* --- Event Listing Component --- */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <EventCardList
                        data={events}
                        onSearch={loadEvents}
                        isLoading={loading}
                    />
                </div>
            </div>
        </div>
    );
}