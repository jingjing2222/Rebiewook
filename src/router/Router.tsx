import Layout from "@/layout/Layout";
import BookDetailesPage from "@/pages/BookDetailesPage";
import { EditPage } from "@/pages/EditPage";
import { Home } from "@/pages/Home";
import ReviewListPage from "@/pages/ReviewListPage";

import { UploadPage } from "@/pages/UploadPage";
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
                path: "reviewlistpage",
                element: <ReviewListPage />,
            },
            {
                path: "/bookdetailes/:id",
                element: <BookDetailesPage />,
            },
            {
                path: "/upload",
                element: <UploadPage />,
            },
            {
                path: "/bookdetailes/:id/edit",
                element: <EditPage />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
