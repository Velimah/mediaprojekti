import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HtmlProvider } from "./contexts/HtmlContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HtmlProvider>
      <App />
    </HtmlProvider>
  </React.StrictMode>
);
