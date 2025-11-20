import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css"
import EventDetailsPage from "./pages/ViewEvent.jsx";
import AllEventsPage from "./pages/AllEventsPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24 flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/events/all" element={<AllEventsPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
