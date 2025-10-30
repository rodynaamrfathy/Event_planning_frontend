import React from "react";
import { Button } from "../components/button";
import { motion } from "framer-motion";
import { CalendarDays, Users, Sparkles, Phone, Mail } from "lucide-react";
import { Link } from "react-router";


export default function EventPlannerLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            Plan, Organize & Celebrate Effortlessly 🎉
          </h2>
          <p className="text-lg mb-6 text-gray-600">
            EventPlanner helps you manage events, track invites, and coordinate with ease.
            Whether it’s a wedding, conference, or birthday, we’ve got you covered.
          </p>
          <Link to="/signup">
            <Button className="bg-blue-600 text-white text-lg px-6 py-3 rounded-xl">
                Get Started
            </Button>
          </Link>
        </motion.div>

        <motion.img
        src="/images/event-promotion-sale.svg"
        alt="Event Planning Illustration"
        className="hidden md:block w-full md:w-1/2 mt-10 md:mt-0"
        />

      </section>

      {/* Features */}
      <section id="features" className="px-10 py-20 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-12">Why Choose EventPlanner?</h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
            <CalendarDays className="text-blue-600 mb-4 w-10 h-10" />
            <h4 className="text-xl font-semibold mb-2">Smart Scheduling</h4>
            <p className="text-gray-600">Automatically manage and sync all your events with real-time updates.</p>
          </div>
          <div className="p-8 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
            <Users className="text-blue-600 mb-4 w-10 h-10" />
            <h4 className="text-xl font-semibold mb-2">Invite & Collaborate</h4>
            <p className="text-gray-600">Send invites, track RSVPs, and coordinate tasks with your team or guests.</p>
          </div>
          <div className="p-8 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
            <Sparkles className="text-blue-600 mb-4 w-10 h-10" />
            <h4 className="text-xl font-semibold mb-2">All-in-One Dashboard</h4>
            <p className="text-gray-600">View your events, upcoming tasks, and invites all in one sleek dashboard.</p>
          </div>
        </div>
      </section>

    {/* Contact Section */}
      <section
        id="contact"
        className="px-10 py-20 bg-blue-50 border-t border-gray-200 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
          <p className="text-gray-600 mb-8">
            Have questions, feedback, or need help organizing your event?  
            We’d love to hear from you!
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Mail className="text-blue-600 w-6 h-6" />
              <span>support@eventplanner.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Phone className="text-blue-600 w-6 h-6" />
              <span>+20 123456789</span>
            </div>
          </div>

          <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Send a Message
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
