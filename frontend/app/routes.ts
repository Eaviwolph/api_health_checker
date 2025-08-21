import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/home/home.tsx"),
    route("/create", "routes/createNewEndpoint/createNewEndpoint.tsx"),
    route("/history/:id", "routes/history/history.tsx"),
] satisfies RouteConfig;
