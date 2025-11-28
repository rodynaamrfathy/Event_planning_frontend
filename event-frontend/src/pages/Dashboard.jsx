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
    fetchInvitedEvents,
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
    const [respondingInvitationId, setRespondingInvitationId] = useState(null);

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

                // Filter to only show pending invitations and ensure eventId is present
                setInvitations(
                    invitationsRes
                        .filter((invite) => invite.status === "Pending" && invite.event?.eventId)
                        .map((invite) => ({
                            id: invite.invitationId,
                            eventId: invite.event.eventId, // Ensure eventId exists
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

    const handleInvitationResponse = async (invitationId, status, eventId) => {
        if (!eventId) {
            alert("Error: Event ID is missing. Please try again.");
            return;
        }

        // Set loading state for this specific invitation
        setRespondingInvitationId(invitationId);

        try {
            // Step 1: Respond to the invitation
            await respondToInvitationApi(invitationId, status);
            
            // Remove the invitation from the list immediately for better UX
            setInvitations((prev) =>
                prev.filter((invite) => invite.id !== invitationId)
            );

            // Step 2: When accepting, create a registration so it shows in "Your Events"
            if (status === "Accepted") {
                try {
                    // The backend adds user as EventAttendee, but we need a Registration for "Your Events" table
                    // Create registration with "Going" status
                    await respondToEventApi(eventId, "Going");
                    
                    // Reload registrations to show the new event in "Your Events"
                    const registrationsRes = await fetchUserRegistrations();
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
                } catch (registrationErr) {
                    // If registration fails, still show success for invitation acceptance
                    console.error("Failed to create registration after accepting invite:", registrationErr);
                    // The user is still added as attendee by the backend, so this is not critical
                    // But we should inform them
                    alert("Invitation accepted! However, there was an issue adding it to your events list. Please refresh the page.");
                }
            }
            // For rejection, we just remove it from the list - no additional action needed
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || "Unable to update invitation. Please try again.";
            alert(errorMessage);
            // Don't remove from list if there was an error - it will stay visible
        } finally {
            setRespondingInvitationId(null);
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-10">
            {/* Header Section */}
            <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                
                {/* Title + Subtitle */}
                <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Dashboard
                </h1>

                {/* New Event Button (now beside Dashboard) */}
                <button
                    onClick={handleCreateEvent}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-150 shadow-md hover:shadow-lg flex items-center gap-2 text-sm sm:text-base"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Event
                </button>
                </div>

                {/* Subtitle moved down on large screens */}
                <p className="text-gray-600 dark:text-gray-400 mt-3 sm:mt-0">
                Welcome back! Here's what's happening.
                </p>

            </div>
            </div>


            {/* ---  events Section --- */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Your Events
                    </h2>
                </div>
                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <EventTable data={registrations} onStatusChange={handleStatusUpdate} loading={loading} />
                </div>
            </div>

            {/* --- Upcoming Events Section (Card List) --- */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Upcoming Events
                    </h2>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <EventCardList data={upcomingEvents} isLoading={loading} />
                </div>

                {/* 2. Add the "See More" button */}
                <div className="text-center mt-6">
                    <button
                        onClick={handleSeeMore}
                        className="px-6 py-3 text-md font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition duration-150 shadow-md hover:shadow-lg"
                    >
                        See All Upcoming Events
                    </button>
                </div>
            </div>

            <div className="mb-8">
                {/* Content for Invites */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                            <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Invites
                        </h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <InviteCard 
                            data={invitations} 
                            onRespond={handleInvitationResponse}
                            respondingInvitationId={respondingInvitationId}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Events Organized by You
                    </h2>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <ActionsTable 
                        data={organizedEvents} 
                        onDelete={(deletedId) => {
                            setOrganizedEvents((prev) => prev.filter((event) => event.id !== deletedId));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}