import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import type { Lang } from "./i18n/dictionaries";
import "./index.css";
import { PROPOSAL } from "./lib/mode";

if (PROPOSAL) document.documentElement.classList.add("proposal");

const lang: Lang = window.location.pathname.startsWith("/en") ? "en" : "it";
const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
);

// le pagine sono prerenderizzate (npm run build): si idrata l'HTML esistente
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
