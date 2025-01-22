import Layout from "@/layout/Layout";
import BookDetailesPage from "@/routes/pages/BookDetailesPage";
import { EditPage } from "@/routes/pages/EditPage";
import Home from "@/routes/pages/Home";
import { UploadPage } from "@/routes/pages/UploadPage";

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
            {
                path: "upload",
                element: <UploadPage />,
            },
            {
                path: "bookdetailes/:id/edit",
                element: <EditPage />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
