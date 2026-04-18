import { useLanguage } from "../context/LanguageContext";

export function Terms() {
  const { t } = useLanguage();
  return (
    <div className="py-12 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl mb-6">{t("legal.terms")}</h1>
        <div className="space-y-4 text-muted-foreground">
          <p>{t("terms.intro")}</p>
          <p>{t("terms.account")}</p>
          <p>{t("terms.content")}</p>
          <p>{t("terms.liability")}</p>
          <p>{t("terms.contact")}</p>
        </div>
      </div>
    </div>
  );
}
