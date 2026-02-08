import Header from "@/layout/Header";
import "@/main.css";
import Footer from "@/layout/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "@/components/Modal/ModalContext";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ModalProvider>
        <Header />
        <main className="flex-1">
          <section className="page-shell py-6 md:py-8">
            <Outlet />
          </section>
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
}
