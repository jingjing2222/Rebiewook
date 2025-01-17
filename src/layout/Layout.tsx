import Header from "@/layout/Header";
import { Outlet, ScrollRestoration } from "react-router";

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <ScrollRestoration />
            <h2>이곳은 footer입니다.</h2>
        </>
    );
}
