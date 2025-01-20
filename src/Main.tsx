import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "@/routes/Router";
import "@/main.css";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CookiesProvider>
            <Router />
        </CookiesProvider>
    </StrictMode>
);
