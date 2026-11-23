const UTM_STORAGE_KEY = "ruangMADINA_utm";
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type UtmParams = Partial<Record<(typeof TRACKED_PARAMS)[number], string>>;

type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

let isInitialized = false;

/**
 * Captures UTM parameters and fbclid from the landing URL and persists them in sessionStorage
 * so attribution survives navigation/tab switches during the session.
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const search = new URLSearchParams(window.location.search);
  const captured: UtmParams = {};

  for (const key of TRACKED_PARAMS) {
    const val = search.get(key)?.trim();
    if (val) {
      captured[key] = val;
    }
  }

  if (Object.keys(captured).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // Ignore storage quota/privacy mode errors
    }
    return captured;
  }

  return getStoredUtmParams();
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

/**
 * Initializes Meta Pixel (fbevents.js) and fires PageView when VITE_META_PIXEL_ID is configured.
 */
export function initMetaPixel(): void {
  if (typeof window === "undefined") return;

  captureUtmParams();

  const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();
  if (!pixelId || isInitialized) return;

  if (!window.fbq) {
    const fbq: FbqFunction = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue?.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
  isInitialized = true;
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params && Object.keys(params).length > 0) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}

export interface WhatsAppLeadPayload {
  source: string;
  category?: string;
  intentTier?: "high" | "general";
  detail?: string;
}

/**
 * Fires a Meta Pixel `Lead` standard event enriched with CTA source, category, and UTM params.
 */
export function trackWhatsAppLead({
  source,
  category,
  intentTier = "general",
  detail,
}: WhatsAppLeadPayload): void {
  const utm = getStoredUtmParams();
  trackMetaEvent("Lead", {
    content_name: source,
    ...(category ? { content_category: category } : {}),
    intent_tier: intentTier,
    ...(detail ? { detail } : {}),
    ...utm,
  });
}

/**
 * Builds a WhatsApp URL and appends a subtle [Ref: ...] tag when UTM parameters are present
 * so sales/CS can identify which ad campaign or creative generated the chat.
 */
export function buildWhatsAppUrl(baseUrl: string, message: string): string {
  const utm = getStoredUtmParams();
  const refParts = [utm.utm_source, utm.utm_campaign, utm.utm_content].filter(Boolean);
  const fullMessage =
    refParts.length > 0 ? `${message}\n\n[Ref: ${refParts.join(" / ")}]` : message;

  return `${baseUrl}?text=${encodeURIComponent(fullMessage)}`;
}

