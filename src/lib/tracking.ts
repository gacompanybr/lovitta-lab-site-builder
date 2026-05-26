// GTM dataLayer tracking helpers (client-only, SSR-safe)

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const recent = new Map<string, number>();
const DEDUPE_MS = 800;

export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const key = event + "|" + JSON.stringify(params);
  const now = Date.now();
  const last = recent.get(key) ?? 0;
  if (now - last < DEDUPE_MS) return;
  recent.set(key, now);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    page_path: window.location.pathname + window.location.search,
    ...params,
  });
}

function findSection(el: Element | null): string {
  let cur: Element | null = el;
  while (cur) {
    if (cur.tagName === "SECTION" && cur.id) return cur.id;
    cur = cur.parentElement;
  }
  return "";
}

function getText(el: Element): string {
  return (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
}

const CTA_KEYWORDS = /(agendar|agende|marcar|solicitar|fale|contato|whatsapp|ver serviços|ver servi|cta)/i;
const EXAME_KEYWORDS = /(agendar.*exame|agende.*exame|marcar.*exame|exame)/i;

function handleClick(e: MouseEvent) {
  const target = e.target as Element | null;
  if (!target) return;
  const anchor = target.closest("a") as HTMLAnchorElement | null;
  const button = target.closest("button") as HTMLButtonElement | null;
  const el = anchor || button;
  if (!el) return;

  const text = getText(el);
  const section = findSection(el);
  const base = { button_text: text, section };

  if (anchor) {
    const href = anchor.getAttribute("href") || "";
    if (/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(href)) {
      pushEvent("clique_whatsapp", { ...base, link_url: href });
      if (EXAME_KEYWORDS.test(text)) pushEvent("agendar_exame", base);
      return;
    }
    if (href.startsWith("tel:")) {
      pushEvent("telefone_clique", { ...base, link_url: href });
      return;
    }
    if (/google\.[^/]+\/maps|maps\.google|maps\.app\.goo\.gl/i.test(href)) {
      pushEvent("abrir_maps", { ...base, link_url: href });
      return;
    }
  }

  if (EXAME_KEYWORDS.test(text)) {
    pushEvent("agendar_exame", base);
    return;
  }
  if (CTA_KEYWORDS.test(text)) {
    pushEvent("clique_cta", base);
  }
}

let installed = false;
export function installTracking() {
  if (typeof window === "undefined" || installed) return;
  installed = true;
  document.addEventListener("click", handleClick, { capture: true });
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view", page_path: path });
}
