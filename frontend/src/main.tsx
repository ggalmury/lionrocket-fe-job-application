import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import QueryProvider from "@/lib/providers/QueryProvider";
import ToastProvider from "@/lib/providers/ToastProvider";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/global.css";

import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <ToastProvider />
        <App />
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
