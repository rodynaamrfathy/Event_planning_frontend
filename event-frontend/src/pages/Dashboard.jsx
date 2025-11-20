// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventTable from './EventTable';
import {eventData, inviteData, upcomingEventData} from "../assets/fakedata";
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

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Welcome to your Dashboard
            </h1>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
                This is your main dashboard. Add your events, see analytics, and manage your account.
            </p>

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
                {/* Render the new EventCardList component */}
                <EventCardList data={upcomingEventData} />
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