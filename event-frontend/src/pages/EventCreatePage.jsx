import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVENT_CATEGORIES, FILTERABLE_CATEGORIES } from '../constants/EventCategories';
import { createEvent, inviteUserToEvent } from "../services/eventService.js";

export default function EventCreatePage() {
    const navigate = useNavigate();
    const currentUserName = localStorage.getItem("userName") || "You";

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dateTime: '',
        location: '',
        guests: '',
        hostedBy: currentUserName,
        category: EVENT_CATEGORIES.SOCIAL,
    });

    // Handler for all standard text/date/select inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Helper to format the time (e.g., '14:30' -> '02:30 PM')
    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hour, minute] = timeString.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };

    // Handler for the Save action
    const handleSave = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.dateTime || !formData.location) {
            alert('Please fill out all required fields.');
            return;
        }

        // Format data
        const [datePart, timePart] = formData.dateTime.split('T');
        const dateObj = new Date(datePart);
        const readableDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const readableTime = formatTime(timePart);

        try {
            const payload = {
                title: formData.title,
                eventDate: formData.dateTime,
                location: formData.location,
                description: formData.description,
            };

            const response = await createEvent(payload);
            const createdEvent = response?.event;

            // If guests were provided, send invitations.
            // Expecting a comma-separated list of numeric user IDs for now, e.g. "1, 2, 3".
            if (createdEvent?.eventId && formData.guests.trim()) {
                const raw = formData.guests.split(",");
                const ids = raw
                    .map((token) => token.trim())
                    .filter((token) => token.length > 0)
                    .map((token) => Number(token))
                    .filter((id) => Number.isFinite(id) && id > 0);

                // Fire invitations sequentially; errors are surfaced via alert but don't block navigation.
                for (const recipientId of ids) {
                    try {
                        await inviteUserToEvent(createdEvent.eventId, recipientId, "attendee");
                    } catch (inviteError) {
                        // Optional: log but keep going for other guests
                        console.error("Failed to invite guest", recipientId, inviteError);
                    }
                }
            }

            if (createdEvent?.eventId) {
                navigate(`/events/${createdEvent.eventId}`);
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            const message =
                error.response?.data?.message || "Failed to create event. Please try again.";
            alert(message);
        }
    };

    // Handler for the Cancel action
    const handleCancel = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 md:p-10">
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                    Create Event
                </h1>

                <form onSubmit={handleSave} className="space-y-6">

                    {/* Event Title and Description inputs (unchanged) */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                        <input
                            type="text" name="title" id="title" value={formData.title} onChange={handleChange}
                            placeholder="e.g., Summer Music Festival"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            name="description" id="description" rows="4" value={formData.description} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>

                    {/* Hosted By (Read Only) */}
                    <div>
                        <label htmlFor="hostedBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Hosted By (Your User ID)
                        </label>
                        <input
                            type="text"
                            name="hostedBy"
                            id="hostedBy"
                            value={formData.hostedBy}
                            // 💡 Make this field read-only and slightly subdued
                            readOnly
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    {/* Category Select Input */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                            required
                        >
                            {/* Use ALL categories except 'All' itself */}
                            {[...FILTERABLE_CATEGORIES, EVENT_CATEGORIES.ALL].filter(c => c !== EVENT_CATEGORIES.ALL).map(cat => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Date & Time Input */}
                    <div>
                        <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date & Time</label>
                        <input
                            type="datetime-local" name="dateTime" id="dateTime" value={formData.dateTime} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>

                    {/* Location and Guests inputs */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input
                            type="text" name="location" id="location" value={formData.location} onChange={handleChange}
                            placeholder="Enter location or address"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Add Guests (user IDs, comma separated)
                        </label>
                        <input
                            type="text" name="guests" id="guests" value={formData.guests} onChange={handleChange}
                            placeholder="e.g. 12, 34, 56"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}