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
  Link,
} from "react-router";

function RouteErrorFallback() {
  return (
    <div className="page-shell py-16 text-center">
      <p className="text-xl font-semibold">페이지를 찾을 수 없어요.</p>
      <Link to="/" className="mt-3 inline-block text-primary underline underline-offset-4">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RouteErrorFallback />}>
      <Route index element={<ReviewListPage />} />
      <Route path="bookdetailes/:id" element={<BookDetailesPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="bookdetailes/:id/edit" element={<EditPage />} />
      <Route path="*" element={<RouteErrorFallback />} />
    </Route>,
  ),
  {
    basename: "/Rebiewook",
  },
);

export default function Router() {
  return <RouterProvider router={router} />;
}
