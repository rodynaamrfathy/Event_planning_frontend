import { index, route, type RouteConfig } from "@react-router/dev/routes";

const routes: RouteConfig = [
  index("routes/home.tsx"),       
  route("login", "routes/login.tsx"),   
  route("signup", "routes/signup.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
];

export default routes satisfies RouteConfig;
