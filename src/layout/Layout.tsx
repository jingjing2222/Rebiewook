import Header from "@/layout/Header";
import "@/main.css";
import Footer from "@/layout/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "@/components/Modal/ModalContext";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ModalProvider>
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
}
