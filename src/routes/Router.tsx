import Layout from "@/layout/Layout";
import Home from "@/routes/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
