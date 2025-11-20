import React from 'react';

const InviteCard = ({ data }) => {

    //  Placeholder functions for API integration
    const handleAccept = (inviteId) => {
        alert(`Accepted invitation ID: ${inviteId}`);
        // API CALL: PUT /api/invites/{inviteId} with status: accepted
    };

    const handleDecline = (inviteId) => {
        alert(`Declined invitation ID: ${inviteId}`);
        // API CALL: PUT /api/invites/{inviteId} with status: declined
    };

    return (
        <div className="space-y-4">
            {data.map((invite) => (
                <div
                    key={invite.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition duration-150 hover:shadow-md"
                >
                    {/* Left Section: Avatar, Sender, and Event */}
                    <div className="flex items-center">
                        {/* Avatar (Placeholder styling) */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 mr-4">
                            {/* use an <img src={invite.senderAvatarUrl} /> here */}
                            {/* For now, we'll use a generic icon/styling */}
                            <svg className="w-full h-full text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>

                        {/* Text Content */}
                        <div>
                            <p className="text-gray-900 dark:text-gray-100 font-medium">
                                From **{invite.senderName}**
                            </p>
                            <p className="text-sm text-indigo-600 dark:text-indigo-400">
                                {invite.eventName}
                            </p>
                        </div>
                    </div>

                    {/* Right Section: Action Buttons */}
                    <div className="flex space-x-2">
                        {/* Accept Button */}
                        <button
                            onClick={() => handleAccept(invite.id)}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                        >
                            Accept
                        </button>

                        {/* Decline Button (Lighter/Subtle style) */}
                        <button
                            onClick={() => handleDecline(invite.id)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InviteCard;