import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, inviteUserToEvent } from "../services/eventService.js";
import apiClient from "../services/apiClient.js";

export default function EditEventPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inviting, setInviting] = useState(false);
    const [error, setError] = useState(null);
    const [inviteUserId, setInviteUserId] = useState('');
    const [inviteRole, setInviteRole] = useState('attendee');

    useEffect(() => {
        const loadEventData = async () => {
            if (!id) {
                setError("Event ID is required");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const [eventData, invitationsData] = await Promise.all([
                    fetchEventById(id),
                    apiClient.get(`/invitations/event/${id}`).then(res => res.data || [])
                ]);
                
                setEvent(eventData);
                setInvitations(invitationsData);
                setError(null);
            } catch (err) {
                const message = err.response?.data?.error || err.response?.data?.message || "Failed to load event data.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadEventData();
    }, [id]);

    const handleInviteUser = async (e) => {
        e.preventDefault();

        if (!inviteUserId.trim()) {
            alert('Please enter a user ID.');
            return;
        }

        const userId = Number(inviteUserId.trim());
        if (!Number.isFinite(userId) || userId <= 0) {
            alert('Please enter a valid user ID (numeric).');
            return;
        }

        try {
            setInviting(true);
            const response = await inviteUserToEvent(id, userId, inviteRole);
            
            // Reload invitations to show the new one
            const invitationsRes = await apiClient.get(`/invitations/event/${id}`).then(res => res.data || []);
            setInvitations(invitationsRes);
            
            setInviteUserId('');
            alert('User invited successfully!');
        } catch (err) {
            const message = err.response?.data?.error || err.response?.data?.message || "Failed to invite user. Please try again.";
            alert(message);
        } finally {
            setInviting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading event...</p>
                </div>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Event Not Found</h2>
                    <p className="text-red-500 dark:text-red-400 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 font-medium"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2 transition duration-150"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Invite Users to Event
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage invitations for this event
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details (Read Only) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Event Details Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Event Details
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                        Event Title
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{event?.title || "—"}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                        Description
                                    </label>
                                    <p className="text-gray-700 dark:text-gray-300">{event?.description || "No description provided."}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                            Date
                                        </label>
                                        <p className="text-gray-900 dark:text-gray-100">{formatDate(event?.eventDate)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                            Time
                                        </label>
                                        <p className="text-gray-900 dark:text-gray-100">{formatTime(event?.eventDate)}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                        Location
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">{event?.location || "Location TBD"}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                        Organizer
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">{event?.organizer?.name || "—"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Existing Invitations */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Existing Invitations ({invitations.length})
                            </h2>

                            {invitations.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                    No invitations sent yet. Invite users using the form on the right.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {invitations.map((invitation) => (
                                        <div
                                            key={invitation.invitationId}
                                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                    {invitation.recipient?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {invitation.recipient?.name || `User ID: ${invitation.recipientId}`}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Role: <span className="font-medium">{invitation.roleInEvent || 'attendee'}</span> • 
                                                        Status: <span className={`font-medium ${
                                                            invitation.status === 'Accepted' ? 'text-green-600 dark:text-green-400' :
                                                            invitation.status === 'Rejected' ? 'text-red-600 dark:text-red-400' :
                                                            'text-yellow-600 dark:text-yellow-400'
                                                        }`}>
                                                            {invitation.status}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Invite Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Invite User
                            </h2>

                            <form onSubmit={handleInviteUser} className="space-y-6">
                                <div>
                                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        User ID
                                    </label>
                                    <input
                                        type="number"
                                        id="userId"
                                        value={inviteUserId}
                                        onChange={(e) => setInviteUserId(e.target.value)}
                                        placeholder="Enter user ID"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                        required
                                        min="1"
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Enter the numeric ID of the user you want to invite
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                    >
                                        <option value="attendee">Attendee</option>
                                        <option value="collaborator">Collaborator</option>
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Choose the role for this user in the event
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={inviting || !inviteUserId.trim()}
                                    className="w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                                >
                                    {inviting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending Invitation...
                                        </span>
                                    ) : (
                                        "Send Invitation"
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Only the organizer can invite users</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Invited users will receive a notification</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
