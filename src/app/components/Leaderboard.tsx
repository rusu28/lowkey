import { useState, useEffect } from 'react';
import { GlassCard } from './ui/glass-card';
import { AnimatedCounter } from './ui/animated-counter';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';

interface LeaderboardEntry {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  avatarUrl?: string;
  score: number;
  competitions: number;
  badges: number;
  country: string;
}

export function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [filter]);

  // Mock data
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      previousRank: 2,
      name: 'Alexandru Pop',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandru',
      score: 15420,
      competitions: 45,
      badges: 12,
      country: 'RO',
    },
    {
      id: '2',
      rank: 2,
      previousRank: 1,
      name: 'Maria Ionescu',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      score: 14875,
      competitions: 42,
      badges: 11,
      country: 'RO',
    },
    {
      id: '3',
      rank: 3,
      previousRank: 3,
      name: 'Andrei Stoica',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrei',
      score: 13920,
      competitions: 38,
      badges: 10,
      country: 'RO',
    },
    ...Array.from({ length: 17 }, (_, i) => ({
      id: `${i + 4}`,
      rank: i + 4,
      previousRank: i + 4 + (Math.random() > 0.5 ? 1 : -1),
      name: `User ${i + 4}`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i + 4}`,
      score: 13000 - i * 500,
      competitions: 35 - i,
      badges: 9 - Math.floor(i / 2),
      country: 'RO',
    })),
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) {
      return (
        <div className="flex items-center gap-1 text-success text-xs">
          <TrendingUp className="w-3 h-3" />
          +{change}
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center gap-1 text-destructive text-xs">
          <TrendingDown className="w-3 h-3" />
          {change}
        </div>
      );
    }
    return <div className="text-xs text-muted-foreground">-</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-6 max-w-6xl space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-primary font-['Permanent_Marker']">
            Global Leaderboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Compete with the best AI practitioners from around the world
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="rounded-full"
          >
            All Time
          </Button>
          <Button
            variant={filter === 'month' ? 'default' : 'outline'}
            onClick={() => setFilter('month')}
            className="rounded-full"
          >
            This Month
          </Button>
          <Button
            variant={filter === 'week' ? 'default' : 'outline'}
            onClick={() => setFilter('week')}
            className="rounded-full"
          >
            This Week
          </Button>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {leaderboardData.slice(0, 3).map((entry, idx) => (
            <GlassCard
              key={entry.id}
              hover
              glow={idx === 0}
              className={`p-6 text-center space-y-4 ${idx === 0 ? 'md:order-2 md:-mt-6' : idx === 1 ? 'md:order-1' : 'md:order-3'}`}
            >
              <div className="flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              <Link to={`/profile/${entry.id}`}>
                <Avatar className={`h-20 w-20 mx-auto ring-4 ${idx === 0 ? 'ring-yellow-500' : idx === 1 ? 'ring-gray-400' : 'ring-amber-600'}`}>
                  <AvatarImage src={entry.avatarUrl} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {entry.name[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h3 className="font-bold text-lg">{entry.name}</h3>
                <p className="text-sm text-muted-foreground">Rank #{entry.rank}</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  <AnimatedCounter value={entry.score} />
                </div>
                <p className="text-xs text-muted-foreground">{entry.competitions} competitions</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <GlassCard className="p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Rank</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Change</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">User</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Score</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Competitions</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <span className={`font-semibold ${entry.rank <= 3 ? 'text-lg' : ''}`}>
                          #{entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getRankChange(entry.rank, entry.previousRank)}
                    </td>
                    <td className="py-4 px-4">
                      <Link to={`/profile/${entry.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={entry.avatarUrl} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {entry.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{entry.name}</div>
                          <div className="text-xs text-muted-foreground">{entry.country}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-primary">
                        {entry.score.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-muted-foreground">
                      {entry.competitions}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="font-medium">{entry.badges}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
