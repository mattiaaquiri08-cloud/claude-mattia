import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { PhoneMockup } from "./components/PhoneMockup";
import type { Lang } from "./i18n/dictionaries";
import "./index.css";
import { PROPOSAL } from "./lib/mode";

if (PROPOSAL) document.documentElement.classList.add("proposal");

const params = new URLSearchParams(window.location.search);
const inFrame = params.has("frame");
if (inFrame) document.documentElement.classList.add("in-frame");

// proposta aperta da computer: il sito si mostra dentro un telefono (?desktop per la versione larga)
const showPhone =
  PROPOSAL && !inFrame && !params.has("desktop") && window.matchMedia("(min-width: 900px) and (pointer: fine)").matches;

const lang: Lang = window.location.pathname.startsWith("/en") ? "en" : "it";
const root = document.getElementById("root")!;
const app = <StrictMode>{showPhone ? <PhoneMockup /> : <App lang={lang} />}</StrictMode>;

// le pagine sono prerenderizzate (npm run build): si idrata l'HTML esistente
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
