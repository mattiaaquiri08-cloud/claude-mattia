import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { dictionaries, type Lang } from "./i18n/dictionaries";

export function render(lang: Lang) {
  const html = renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>,
  );
  return { html, meta: dictionaries[lang].meta };
}
