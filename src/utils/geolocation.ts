export interface GeolocationResult {
  lang: "id" | "en";
  countryCode: string;
  countryName: string;
}

const COUNTRY_NAMES: Record<string, { id: string; en: string }> = {
  ID: { id: "Indonesia", en: "Indonesia" },
  US: { id: "Amerika Serikat", en: "United States" },
  SG: { id: "Singapura", en: "Singapore" },
  MY: { id: "Malaysia", en: "Malaysia" },
  AU: { id: "Australia", en: "Australia" },
  GB: { id: "Inggris", en: "United Kingdom" },
  JP: { id: "Jepang", en: "Japan" },
  SA: { id: "Arab Saudi", en: "Saudi Arabia" },
  AE: { id: "Uni Emirat Arab", en: "United Arab Emirates" },
};

export async function detectUserGeolocation(): Promise<GeolocationResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  // Strategy 1: api.country.is
  try {
    const res = await fetch("https://api.country.is", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      clearTimeout(timeoutId);
      const country = (data.country || "").toUpperCase();
      const isIndonesia = country === "ID";
      const nameObj = COUNTRY_NAMES[country];
      const countryName = nameObj ? nameObj.id : country || "Indonesia";
      return {
        lang: isIndonesia ? "id" : "en",
        countryCode: country || (isIndonesia ? "ID" : "US"),
        countryName,
      };
    }
  } catch {
    // Continue to fallback
  }

  // Strategy 2: ipapi.co
  try {
    const fallbackRes = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      clearTimeout(timeoutId);
      const country = (data.country_code || "").toUpperCase();
      const isIndonesia = country === "ID";
      return {
        lang: isIndonesia ? "id" : "en",
        countryCode: country || "ID",
        countryName: data.country_name || (isIndonesia ? "Indonesia" : country),
      };
    }
  } catch {
    // Fallback below
  } finally {
    clearTimeout(timeoutId);
  }

  // Fallback Strategy 3: Browser navigator locale
  const browserLang = (typeof navigator !== "undefined" && navigator.language) || "id";
  const isId = browserLang.toLowerCase().startsWith("id");
  return {
    lang: isId ? "id" : "en",
    countryCode: isId ? "ID" : "US",
    countryName: isId ? "Indonesia" : "Global",
  };
}
