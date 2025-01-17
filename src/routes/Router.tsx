import Layout from "@/layout/Layout";
import Home from "@/routes/pages/Home";
import ObjectDetails from "@/routes/pages/ObjectP/ObjectDetails";
import ObjectP from "@/routes/pages/ObjectP/ObjectP";
import Test from "@/routes/pages/Test/Test";
import TestDetail from "@/routes/pages/Test/TestDetails";
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
            {
                path: "objectp",
                element: <ObjectP />,
            },
            {
                path: "objectp/:ObjectPId",
                element: <ObjectDetails />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
