import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const { t } = useLanguage();

  function calculateTimeLeft(): TimeLeft {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: t('common.days'), value: timeLeft.days },
    { label: t('common.hours'), value: timeLeft.hours },
    { label: t('common.minutes'), value: timeLeft.minutes },
    { label: t('common.seconds'), value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="relative">
          {/* Card */}
          <div className="relative bg-card border-2 border-border rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-card">
            {/* Value with animation */}
            <div className="text-4xl md:text-6xl font-bold text-primary font-mono tabular-nums tracking-tight countdown-number">
              {String(unit.value).padStart(2, '0')}
            </div>

            {/* Label */}
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-2 font-semibold">
              {unit.label}
            </div>

            {/* Separator dots (except for last item) */}
            {index < timeUnits.length - 1 && (
              <div className="hidden md:flex absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 flex-col gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="w-2 h-2 rounded-full bg-primary/40" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
