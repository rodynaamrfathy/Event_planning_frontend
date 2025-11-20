export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};
export const getUserName = () => {
    return localStorage.getItem("userName") || "";
};
