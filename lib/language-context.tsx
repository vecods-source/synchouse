"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const defaultContextValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: translations.en,
  isRTL: false,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

// Custom hook to safely read localStorage with SSR support
function useLanguageStore() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener("language-change", callback);
    return () => {
      window.removeEventListener("storage", callback);
      window.removeEventListener("language-change", callback);
    };
  }, []);

  const getSnapshot = useCallback((): Language => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "de" || saved === "ar")) {
      return saved;
    }
    return "en";
  }, []);

  const getServerSnapshot = useCallback((): Language => {
    return "en"; // Always return English for SSR
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useLanguageStore();
  const [, forceUpdate] = useState({});

  // Apply document styles when language changes
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;

    if (language === "ar") {
      document.body.style.fontFamily = "var(--font-arabic), sans-serif";
    } else {
      document.body.style.fontFamily = "";
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem("language", lang);
    window.dispatchEvent(new Event("language-change"));
    forceUpdate({});
  }, []);

  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
