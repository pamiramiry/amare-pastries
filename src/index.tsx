import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Desktop } from "./screens/Desktop";
import { MenuPage } from "./screens/MenuPage/MenuPage";
import { SpecialOrderPage } from "./screens/SpecialOrderPage";
import { SpecialOrderConfirmationPage } from "./screens/SpecialOrderConfirmationPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
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
