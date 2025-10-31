import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100">

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-lg animate-fadeIn">
          <h2 className="text-5xl font-bold mb-4">
            Plan, Organize & Celebrate Effortlessly 🎉
          </h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Manage events, track invites, and coordinate with ease.
          </p>

          <Link to="/signup">
            <Button className="bg-blue-600 text-white text-lg px-6 py-3 rounded-xl">
              Get Started
            </Button>
          </Link>
        </div>

        <img
          src="/images/event-promotion-sale.svg"
          className="hidden md:block w-full md:w-1/2 mt-10 md:mt-0 animate-fadeIn"
        />
      </section>

      {/* Features */}
      <section id="features" className="px-10 py-20 bg-white dark:bg-gray-950">
        <h3 className="text-3xl font-semibold text-center mb-12">Why Choose EventPlanner?</h3>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            ["Smart Scheduling", "Automatically manage events with real-time updates."],
            ["Invite & Collaborate", "Send invites, track RSVPs, and coordinate tasks."],
            ["All-in-One Dashboard", "View tasks & upcoming events in one place."],
          ].map(([title, desc]) => (
            <div key={title} className="p-8 rounded-2xl shadow bg-gray-50 dark:bg-gray-900">
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-10 py-20 bg-blue-50 dark:bg-blue-900/20 text-center">
        <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Have questions or feedback? We'd love to hear from you!
        </p>

        <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Send a Message
        </Button>
      </section>
    </div>
  );
}
