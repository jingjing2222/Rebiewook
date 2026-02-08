import Layout from "@/layout/Layout";
import BookDetailesPage from "@/pages/BookDetailesPage";
import { EditPage } from "@/pages/EditPage";
import ReviewListPage from "@/pages/ReviewListPage";

import { UploadPage } from "@/pages/UploadPage";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ReviewListPage />} />
      <Route path="bookdetailes/:id" element={<BookDetailesPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="bookdetailes/:id/edit" element={<EditPage />} />
    </Route>,
  ),
  {
    basename: "/Rebiewook",
  },
);

export default function Router() {
  return <RouterProvider router={router} />;
}
