import Layout from "@/layout/Layout";
import BookDetailesPage from "@/routes/pages/BookDetailesPage";
import Home from "@/routes/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "bookdetailes/:id",
                element: <BookDetailesPage />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
