import React from 'react';
import { detailedEvents } from "../assets/fakedata";
import EventCardList from "./EventCardList.jsx";

export default function AllEventsPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">

                {/* --- Header --- */}
                <h1 className="text-4xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                    Discover All Events
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Browse and filter all upcoming tech, music, and social gatherings.
                </p>

                {/* --- Event Listing Component --- */}
                <EventCardList data={detailedEvents} />
            </div>
        </div>
    );
}