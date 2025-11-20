// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventTable from './EventTable';
import {eventData, inviteData, detailedEvents} from "../assets/fakedata";
import { actionsTableData } from "../assets/fakedata";
import ActionsTable from "./ActionsTable.jsx";
import InviteCard from "./InviteCard.jsx";
import EventCardList from "./EventCardList.jsx";

export default function Dashboard() {
    const navigate = useNavigate();

    // Auth check logic
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    // 💡 Slice the array to get only the first 2 events for the dashboard snippet
    const eventsSnippet = detailedEvents.slice(0, 2);

    // Function to navigate to the full events page
    const handleSeeMore = () => {
        navigate("/events/all");
    };

    const handleCreateEvent = () => {
        navigate("/eventcreate");
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">
            <div className="flex justify-between items-center mb-6">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Dashboard
                </h1>

                {/* Button */}
                <button onClick={handleCreateEvent}
                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md">
                    + New Event
                </button>
            </div>

            {/* ---  events Section --- */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-100">
                    Your Events
                </h2>
                <EventTable data={eventData} />
            </div>

            {/* --- Upcoming Events Section (Card List) --- */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-6 text-left text-gray-800 dark:text-gray-100">
                    Upcoming Events
                </h2>
                {/* 1. Pass the sliced array (only 2 events) */}
                <EventCardList data={eventsSnippet} />

                {/* 2. Add the "See More" button */}
                <div className="text-center mt-6">
                    <button
                        onClick={handleSeeMore}
                        className="px-6 py-2 text-md font-medium text-indigo-600 dark:text-indigo-400 bg-transparent border border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition duration-150"
                    >
                        See All Upcoming Events
                    </button>
                </div>
            </div>

            <div className="mb-8">
                {/* Content for Invites */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-100">
                        Invites
                    </h2>
                    {/* Render the InviteCard component here */}
                    <InviteCard data={inviteData} />
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-100">
                    Events Organized by You
                </h2>
                <ActionsTable data={actionsTableData} />
            </div>
        </div>
    );
}