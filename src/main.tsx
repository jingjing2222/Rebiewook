import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "@/routes/Router";
import "@/main.css";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <Router />
            </CookiesProvider>
        </QueryClientProvider>
    </StrictMode>
);
