import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .upsert({ email, is_subscribed: true }, { onConflict: 'email' })
      .select('unsubscribe_token')
      .single<{ unsubscribe_token: string }>();

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    await supabase.functions.invoke('send-email', {
      body: {
        to: email,
        template: 'launch_announcement',
        firstName: email.split('@')[0],
        unsubscribeToken: data.unsubscribe_token,
      },
    }).catch(() => {
      // Function can be not deployed in local dev.
    });

    setIsSubscribed(true);
    setIsLoading(false);
    toast.success(t('newsletter.success'));
  };

  if (isSubscribed) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-card text-center max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-bold mb-2">{t('comingSoon.onTheList')}</h3>
        <p className="text-muted-foreground">
          {t('comingSoon.confirmationEmail')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-card max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6 email-input-focus">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center email-icon">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold">{t('comingSoon.getNotified')}</h3>
          <p className="text-sm text-muted-foreground">{t('comingSoon.firstToKnow')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="email-input-focus">
          <Input
            type="email"
            placeholder={t('comingSoon.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-primary hover:bg-primary-hover"
        >
          {isLoading ? t('comingSoon.subscribing') : t('comingSoon.notifyMe')}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {t('comingSoon.noSpam')}
        </p>
      </form>
    </div>
  );
}
