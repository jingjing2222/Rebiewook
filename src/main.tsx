import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "@/routes/Router";
import "@/main.css";
import { CookiesProvider } from "react-cookie";
import { ModalProvider } from "@/components/Modal/ModalContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CookiesProvider>
            <ModalProvider>
                <Router />
            </ModalProvider>
        </CookiesProvider>
    </StrictMode>
);
