import { useLanguage } from "../context/LanguageContext";

export function Privacy() {
  const { t } = useLanguage();
  return (
    <div className="py-12 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl mb-6">{t("legal.privacy")}</h1>
        <div className="space-y-4 text-muted-foreground">
          <p>{t("privacy.intro")}</p>
          <p>{t("privacy.collection")}</p>
          <p>{t("privacy.usage")}</p>
          <p>{t("privacy.unsubscribe")}</p>
          <p>{t("privacy.contact")}</p>
        </div>
      </div>
    </div>
  );
}
