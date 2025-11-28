import apiClient from "./apiClient.js";

export const fetchOrganizedEvents = async () => {
    const { data } = await apiClient.get("/events/organized");
    return data ?? [];
};

export const fetchInvitedEvents = async () => {
    const { data } = await apiClient.get("/events/invited");
    return data ?? [];
};

export const fetchUserInvitations = async () => {
    const { data } = await apiClient.get("/invitations/my-invitations");
    return data?.invitations ?? [];
};

export const respondToInvitation = async (invitationId, status) => {
    const { data } = await apiClient.patch(`/invitations/${invitationId}/respond`, {
        status,
    });
    return data;
};

export const fetchUserRegistrations = async () => {
    const { data } = await apiClient.get("/registrations/users/get-registrations");
    return data ?? [];
};

export const respondToEvent = async (eventId, responseStatus) => {
    const { data } = await apiClient.post(`/registrations/${eventId}/respond`, {
        responseStatus,
    });
    return data;
};

export const searchEvents = async (params = {}) => {
    const { data } = await apiClient.get("/search/events", {
        params,
    });
    return data;
};

export const createEvent = async (payload) => {
    const { data } = await apiClient.post("/events", payload);
    return data;
};

export const inviteUserToEvent = async (eventId, recipientId, roleInEvent = "attendee") => {
    const { data } = await apiClient.post(`/events/${eventId}/invite`, {
        recipientId,
        roleInEvent,
    });
    return data;
};

export const fetchEventById = async (eventId) => {
    const { data } = await apiClient.get(`/events/${eventId}`);
    return data;
};

export const deleteEvent = async (eventId) => {
    const { data } = await apiClient.delete(`/events/${eventId}`);
    return data;
};

export const updateEvent = async (eventId, payload) => {
    const { data } = await apiClient.put(`/events/${eventId}`, payload);
    return data;
};

