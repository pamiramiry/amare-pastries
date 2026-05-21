import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { PageSEO } from "./components/PageSEO";
import { JsonLd } from "./components/JsonLd";
import { Desktop } from "./screens/Desktop";
import { MenuPage } from "./screens/MenuPage/MenuPage";
import { SpecialOrderPage } from "./screens/SpecialOrderPage";
import { SpecialOrderConfirmationPage } from "./screens/SpecialOrderConfirmationPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <PageSEO />
      <JsonLd />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/special-orders" element={<SpecialOrderPage />} />
        <Route
          path="/special-orders/confirmation"
          element={<SpecialOrderConfirmationPage />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
