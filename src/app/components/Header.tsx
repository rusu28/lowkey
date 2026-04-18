import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, X, Moon, Sun, Bell, Globe } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLaunch } from "../context/LaunchContext";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Logo } from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type NavItem = { to: string; label: string; show: boolean; startsWith?: boolean };

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { canAccessFullSite } = useLaunch();
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string, startsWith?: boolean) =>
    startsWith ? location.pathname.startsWith(path) : location.pathname === path;

  const navItems: NavItem[] = [
    { to: "/", label: t("nav.home"), show: true },
    { to: "/news", label: "News", show: true, startsWith: true },
    { to: "/competitions", label: t("nav.competitions"), show: canAccessFullSite, startsWith: true },
    { to: "/dashboard", label: t("nav.dashboard"), show: canAccessFullSite && Boolean(user) },
    { to: "/contact", label: t("nav.contact"), show: true },
    { to: "/faq", label: t("nav.faq"), show: canAccessFullSite },
  ];

  const visibleNavItems = navItems.filter((item) => item.show);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Logo size="sm" />

          <nav className="hidden lg:flex items-center gap-6">
            {visibleNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-all duration-200 relative ${
                  isActive(item.to, item.startsWith) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive(item.to, item.startsWith) && (
                  <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full transition-colors" aria-label="Language">
                  <Globe size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("ro")} className="cursor-pointer">
                  Romana {language === "ro" ? "✓" : ""}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                  English {language === "en" ? "✓" : ""}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full transition-colors">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {user && (
              <Button variant="ghost" size="icon" asChild className="rounded-full transition-colors relative">
                <Link to="/notifications">
                  <Bell size={18} />
                </Link>
              </Button>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 rounded-full h-10 px-4 transition-colors">
                    <Avatar className="h-7 w-7 ring-2 ring-border">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl w-56">
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user.id}`} className="cursor-pointer">
                      {t("nav.myProfile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      {t("nav.settings")}
                    </Link>
                  </DropdownMenuItem>
                  {canAccessFullSite && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        {t("nav.dashboard")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.isOrganizer && (
                    <DropdownMenuItem asChild>
                      <Link to="/competitions/add" className="cursor-pointer">
                        {t("nav.addCompetition")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    {t("nav.signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-sm rounded-full transition-colors">
                    {t("nav.signIn")}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="text-sm rounded-full bg-primary hover:bg-primary-dark transition-colors">
                    {t("nav.signUp")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-full hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/40">
            <nav className="flex flex-col gap-1">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    isActive(item.to, item.startsWith)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center justify-between px-4 py-3 mt-2 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Globe size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => setLanguage("ro")} className="cursor-pointer">
                        Romana {language === "ro" ? "✓" : ""}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                        English {language === "en" ? "✓" : ""}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {user ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-lg">
                      {t("nav.settings")}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full rounded-lg text-destructive hover:bg-destructive/10"
                    onClick={async () => {
                      await handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t("nav.signOut")}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full rounded-lg">
                      {t("nav.signIn")}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-lg bg-primary hover:bg-primary-dark">{t("nav.signUp")}</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
