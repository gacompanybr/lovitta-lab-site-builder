// GTM dataLayer tracking helpers (client-only, SSR-safe)
// Only events configured in GTM: clique_whatsapp, telefone_clique, formulario_enviado

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
  window.dataLayer.push({ event, ...params });
}

function getText(el: Element): string {
  return (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
}

function handleClick(e: MouseEvent) {
  const target = e.target as Element | null;
  if (!target) return;
  const anchor = target.closest("a") as HTMLAnchorElement | null;
  if (!anchor) return;

  const href = anchor.getAttribute("href") || "";
  const text = getText(anchor);
  const page_path = window.location.pathname;

  if (/wa\.me|api\.whatsapp\.com|whatsapp\.com/i.test(href)) {
    pushEvent("clique_whatsapp", {
      button_text: text,
      page_path,
      link_url: href,
    });
    return;
  }

  if (href.startsWith("tel:")) {
    pushEvent("telefone_clique", {
      button_text: text,
      page_path,
      link_url: href,
    });
    return;
  }
}

let installed = false;
export function installTracking() {
  if (typeof window === "undefined" || installed) return;
  installed = true;
  // Use capture phase to ensure event fires before any navigation/redirect
  document.addEventListener("click", handleClick, { capture: true });
}

// No-op kept for backwards compatibility with existing imports
export function trackPageView(_path: string) {
  // page_view não está configurado no GTM atual; intencionalmente vazio
}
