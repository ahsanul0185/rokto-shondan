import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { DonorContextProvider } from "./contexts/DonorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DonorContextProvider>
        <App />
      </DonorContextProvider>
    </BrowserRouter>
  </StrictMode>
);
