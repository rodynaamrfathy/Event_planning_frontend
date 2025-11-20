// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventTable from './EventTable';
import { eventData } from "../assets/fakedata"; // Adjust path as needed

export default function Dashboard() {
    const navigate = useNavigate();

    // 🔐 Auth check logic
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]); // Added 'navigate' to dependency array for best practice

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

            {/* --- Other Dashboard Sections --- */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-left">
                    Upcoming Events
                </h2>
                {/* Content for Upcoming events */}
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-left">
                    Invites
                </h2>
                {/* Content for Invites */}
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-left">
                    Organized by You
                </h2>
                {/* Content for Organized by You */}
            </div>
        </div>
    );
}