import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Lenis a besoin de SA feuille de style (html.lenis { height: auto }, etc.)
// pour ne pas entrer en conflit avec le calcul de hauteur natif du navigateur.
// Sans, le scroll smooth gratte sur les pages longues (Portfolio notamment).
import "lenis/dist/lenis.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
