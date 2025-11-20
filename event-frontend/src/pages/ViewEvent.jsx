import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                create event
            </h1>
        </div>
    );
}
