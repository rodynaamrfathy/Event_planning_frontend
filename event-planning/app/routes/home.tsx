import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to EventPlanner 🎉</h1>
      <p>Plan, organize, and manage events effortlessly.</p>
    </div>
  );
}

