import Header from "@/layout/Header";
import "@/main.css";
import Footer from "@/layout/Footer";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <html lang="en">
            <body className={`flex flex-col min-h-screen`}>
                <Header />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </body>
        </html>
    );
}
