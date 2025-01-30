import Header from "@/layout/Header";
import "@/main.css";
import Footer from "@/layout/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "@/Modal/ModalContext";

export default function Layout() {
    return (
        <html lang="en">
            <body className={`flex flex-col min-h-screen`}>
                <ModalProvider>
                    <Header />
                    <main className="flex-grow">
                        <Outlet />
                    </main>
                    <Footer />
                </ModalProvider>
            </body>
        </html>
    );
}
