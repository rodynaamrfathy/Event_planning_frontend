import React from 'react';

const InviteCard = ({ data = [], onRespond, respondingInvitationId = null }) => {
    const handleResponse = (invite, status) => {
        if (respondingInvitationId === invite.id) return; // Prevent double-clicks
        onRespond?.(invite.id, status, invite.eventId);
    };

    return (
        <div className="space-y-4">
            {data.length === 0 && (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        No invitations waiting for you right now.
                    </p>
                </div>
            )}
            {data.map((invite) => (
                <div
                    key={invite.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                >
                    {/* Left Section: Avatar, Sender, and Event */}
                    <div className="flex items-center flex-1 mb-4 sm:mb-0">
                        {/* Avatar (Placeholder styling) */}
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 mr-4 flex items-center justify-center shadow-md">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-1">
                                From {invite.senderName}
                            </p>
                            <p className="text-base font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                                {invite.eventName}
                            </p>
                            {invite.eventDate && (
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Happening {invite.eventDate}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Action Buttons */}
                    <div className="flex gap-3 w-full sm:w-auto">
                        {/* Accept Button */}
                        <button
                            onClick={() => handleResponse(invite, "Accepted")}
                            disabled={respondingInvitationId === invite.id}
                            className="flex-1 sm:flex-none px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {respondingInvitationId === invite.id ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </span>
                            ) : (
                                "✓ Accept"
                            )}
                        </button>

                        {/* Decline Button (Lighter/Subtle style) */}
                        <button
                            onClick={() => handleResponse(invite, "Rejected")}
                            disabled={respondingInvitationId === invite.id}
                            className="flex-1 sm:flex-none px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {respondingInvitationId === invite.id ? "Processing..." : "✕ Decline"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InviteCard;