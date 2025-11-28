// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventTable from './EventTable';
import ActionsTable from "./ActionsTable.jsx";
import InviteCard from "./InviteCard.jsx";
import EventCardList from "./EventCardList.jsx";
import {
    fetchOrganizedEvents,
    fetchUserRegistrations,
    fetchUserInvitations,
    searchEvents,
    respondToEvent as respondToEventApi,
    respondToInvitation as respondToInvitationApi,
} from "../services/eventService.js";

export default function Dashboard() {
    const navigate = useNavigate();

    // Auth check logic
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    const [registrations, setRegistrations] = useState([]);
    const [organizedEvents, setOrganizedEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Format helpers
    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const normalizeStatus = (status) => {
        if (!status) return "maybe";
        const normalized = status.replace(/\s/gi, "").toLowerCase();
        if (normalized === "notgoing") return "not going";
        return normalized;
    };

    const apiStatusFromUi = (status) => {
        switch (status) {
            case "going":
                return "Going";
            case "maybe":
                return "Maybe";
            case "not going":
                return "NotGoing";
            default:
                return "Maybe";
        }
    };

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const [
                    registrationsRes,
                    organizedRes,
                    invitationsRes,
                    searchRes,
                ] = await Promise.all([
                    fetchUserRegistrations(),
                    fetchOrganizedEvents(),
                    fetchUserInvitations(),
                    searchEvents(),
                ]);

                setRegistrations(
                    registrationsRes.map((registration) => ({
                        registrationId: registration.registrationId,
                        eventId: registration.event?.eventId ?? registration.eventId,
                        event: registration.event?.title ?? "Untitled Event",
                        date: formatDate(registration.event?.eventDate),
                        time: "—",
                        status: normalizeStatus(registration.responseStatus ?? "Maybe"),
                    }))
                );

                setOrganizedEvents(
                    organizedRes.map((event) => ({
                        id: event.eventId,
                        event: event.title,
                        date: formatDate(event.eventDate),
                        time: "—",
                        status: "Active",
                    }))
                );

                setInvitations(
                    invitationsRes.map((invite) => ({
                        id: invite.invitationId,
                        senderName: invite.sender?.name ?? "Organizer",
                        eventName: invite.event?.title ?? "Event",
                        eventDate: formatDate(invite.event?.eventDate),
                        status: invite.status,
                    }))
                );

                const events = searchRes?.events ?? [];
                setUpcomingEvents(events.slice(0, 4).map((event) => ({
                    id: event.eventId,
                    eventId: event.eventId,
                    title: event.title,
                    description: event.description ?? "No description provided.",
                    category: event.category ?? "Event",
                    location: event.location ?? "TBD",
                    date: formatDate(event.eventDate),
                })));
                setError(null);
            } catch (err) {
                const message =
                    err.response?.data?.message || "Unable to load dashboard data.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        loadDashboard();
    }, [navigate]);

    const handleStatusUpdate = async (item, nextStatus) => {
        const apiStatus = apiStatusFromUi(nextStatus);
        try {
            await respondToEventApi(item.eventId, apiStatus);
            setRegistrations((prev) =>
                prev.map((registration) =>
                    registration.eventId === item.eventId
                        ? { ...registration, status: nextStatus }
                        : registration
                )
            );
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update status.");
        }
    };

    const handleInvitationResponse = async (invitationId, status) => {
        try {
            await respondToInvitationApi(invitationId, status);
            setInvitations((prev) =>
                prev.filter((invite) => invite.id !== invitationId)
            );
        } catch (err) {
            alert(err.response?.data?.message || "Unable to update invitation.");
        }
    };

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
                {error && (
                    <p className="text-sm text-red-500 mb-4">{error}</p>
                )}
                <EventTable data={registrations} onStatusChange={handleStatusUpdate} loading={loading} />
            </div>

            {/* --- Upcoming Events Section (Card List) --- */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-6 text-left text-gray-800 dark:text-gray-100">
                    Upcoming Events
                </h2>
                <EventCardList data={upcomingEvents} isLoading={loading} />

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
                    <InviteCard data={invitations} onRespond={handleInvitationResponse} />
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-100">
                    Events Organized by You
                </h2>
                <ActionsTable data={organizedEvents} />
            </div>
        </div>
    );
}