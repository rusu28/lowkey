import { Link } from "react-router";
import { Logo } from "./Logo";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground mt-2">{t("footer.description")}</p>
          </div>

          <nav className="flex flex-wrap gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              {t("nav.home")}
            </Link>
            <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">
              News
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              {t("nav.contact")}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              {t("legal.terms")}
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              {t("legal.privacy")}
            </Link>
          </nav>
        </div>

        <div className="border-t border-border/40 mt-8 pt-6 text-sm text-muted-foreground">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
