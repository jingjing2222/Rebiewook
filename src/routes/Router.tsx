import Layout from "@/layout/Layout";
import Home from "@/routes/pages/Home";
import Test from "@/routes/pages/Test";
import TestDetail from "@/routes/pages/TestDetails";
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
            {
                path: "test",
                element: <Test />,
                children: [
                    {
                        path: ":testId",
                        element: <TestDetail />,
                    },
                ],
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
