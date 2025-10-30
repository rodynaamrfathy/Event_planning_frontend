import type { Route } from "./+types/home";
import EventPlannerLandingPage from "./EventPlannerLandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EventPlanner | Organize Your Events Effortlessly" },
    { name: "description", content: "EventPlanner helps you plan, organize, and manage events effortlessly in one platform." },
  ];
}

export default function Home() {
  return (
    <div className="font-inter">
      <EventPlannerLandingPage />
    </div>
  );
}
