import Header from "@/layout/Header";
import { Outlet, ScrollRestoration } from "react-router";

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <ScrollRestoration />
            <h2 className="border-2 text-center">형정이 이거 보고 힘내~~</h2>
        </>
    );
}
