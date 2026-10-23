import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

// ---- page title, meta tags and Google Fonts (replaces the old route head) ----
const title = "Shubham weds Meetanshi – Wedding Invitation";
const description = "Join us on 3rd December 2026 in Indore";
document.title = title;

const meta = (attr: "name" | "property", key: string, content: string) => {
  const m = document.createElement("meta");
  m.setAttribute(attr, key);
  m.content = content;
  document.head.appendChild(m);
};
meta("name", "description", description);
meta("property", "og:title", title);
meta("property", "og:description", description);
meta("property", "og:type", "website");
meta("name", "viewport", "width=device-width, initial-scale=1");

const fonts = document.createElement("link");
fonts.rel = "stylesheet";
fonts.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Great+Vibes&family=Noto+Serif+Devanagari:wght@500;600&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap";
document.head.appendChild(fonts);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
