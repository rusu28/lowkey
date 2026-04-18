import { Link } from 'react-router';
import { Button } from './ui/button';
import { Countdown } from './Countdown';
import { NewsletterSignup } from './NewsletterSignup';
import { Rocket, Users, Target, BarChart3 } from 'lucide-react';
import { useLaunch } from '../context/LaunchContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export function ComingSoon() {
  const { launchDate, toggleLaunch } = useLaunch();
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Controls */}
      {user?.isOrganizer && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={toggleLaunch}
            variant="outline"
            size="sm"
            className="bg-card shadow-lg border-2 border-primary"
          >
            <Rocket className="w-4 h-4 mr-2" />
            {t('comingSoon.launchNow')}
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-12">
            {/* Logo & Title */}
            <div className="space-y-6 fade-in">
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="font-['Permanent_Marker'] text-primary">{t('comingSoon.title')}</span>
                <br />
                <span className="text-foreground">{t('comingSoon.subtitle')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground max-w-2xl mx-auto">
                {t('comingSoon.description')}
              </p>
              <p className="text-lg text-muted-foreground">
                {t('comingSoon.community')}
              </p>
            </div>

            {/* Countdown */}
            <div className="space-y-6 fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">
                {t('comingSoon.launchingIn')}
              </div>
              <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto backdrop-blur-sm">
                <Countdown targetDate={launchDate} />
              </div>
              <div className="text-sm text-muted-foreground">
                {t('comingSoon.launchDate')}
              </div>
            </div>

            {/* Newsletter */}
            <div className="fade-in" style={{ animationDelay: '0.4s' }}>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('comingSoon.whatsComingTitle')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-8 shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t('comingSoon.kaggleTitle')}</h3>
              <p className="text-muted-foreground text-sm">{t('comingSoon.kaggleDesc')}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t('comingSoon.competitionsTitle')}</h3>
              <p className="text-muted-foreground text-sm">{t('comingSoon.competitionsDesc')}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t('comingSoon.communityTitle')}</h3>
              <p className="text-muted-foreground text-sm">{t('comingSoon.communityDesc')}</p>
            </div>
          </div>

          {/* Current Platform Note */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card max-w-3xl mx-auto">
            <p className="text-muted-foreground text-sm text-center leading-relaxed">
              {t('comingSoon.currentNote')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('comingSoon.copyright')}
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">
                {t('nav.news')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
