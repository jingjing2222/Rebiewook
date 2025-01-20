import Layout from "@/layout/Layout";
import BookDetailesPage from "@/routes/pages/BookDetailesPage";
import EditForm from "@/routes/pages/EditForm";
import Home from "@/routes/pages/Home";
import UploadForm from "@/routes/pages/UploadForm";
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
                element: <UploadForm />,
            },
            {
                path: "bookdetailes/:id/edit",
                element: <EditForm />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
