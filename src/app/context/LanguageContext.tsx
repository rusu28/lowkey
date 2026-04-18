import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import english from "../i18n/english";
import ro from "../i18n/ro";

type Language = "ro" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ro,
  en: english,
};

function detectDeviceLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("ro") ? "ro" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    if (stored === "ro" || stored === "en") return stored;
    return detectDeviceLanguage();
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => translations[language][key] || key,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
