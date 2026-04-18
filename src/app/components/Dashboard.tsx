import { useAuth } from '../context/AuthContext';
import { GlassCard } from './ui/glass-card';
import { AnimatedCounter } from './ui/animated-counter';
import { Button } from './ui/button';
import { Trophy, Target, Award, TrendingUp, Calendar, Clock, Users, Code } from 'lucide-react';
import { Link } from 'react-router';
import { Skeleton } from './ui/skeleton';
import { useState, useEffect } from 'react';

export function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <GlassCard className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h2>
          <Link to="/signin">
            <Button className="rounded-full bg-primary hover:bg-primary-dark ">
              Sign In
            </Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  // Mock data
  const stats = {
    totalCompetitions: 12,
    activeCompetitions: 3,
    completedCompetitions: 9,
    totalScore: 8547,
    rank: 142,
    totalParticipants: 15420,
    badges: 7,
    streak: 14,
  };

  const recentCompetitions = [
    {
      id: '1',
      title: 'Image Classification Challenge',
      status: 'active',
      score: 0.94,
      rank: 23,
      endDate: '2026-04-20',
    },
    {
      id: '2',
      title: 'NLP Sentiment Analysis',
      status: 'active',
      score: 0.87,
      rank: 45,
      endDate: '2026-04-25',
    },
    {
      id: '3',
      title: 'Time Series Forecasting',
      status: 'completed',
      score: 0.91,
      rank: 18,
      endDate: '2026-04-05',
    },
  ];

  const badges = [
    { icon: Trophy, name: 'Top 10 Finish' },
    { icon: Target, name: '100% Accuracy' },
    { icon: Award, name: 'Fast Learner' },
    { icon: TrendingUp, name: 'Trending Up' },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-7xl space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary font-['Permanent_Marker']">
              Welcome back, {user.name}!
            </h1>
            <p className="text-muted-foreground mt-2">Track your progress and compete with the best</p>
          </div>
          <Link to="/competitions">
            <Button className="rounded-full bg-primary hover:bg-primary-dark   transition-all">
              Browse Competitions
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard hover glow className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Trophy className="w-8 h-8 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Competitions
              </span>
            </div>
            <div className="text-3xl font-bold">
              <AnimatedCounter value={stats.totalCompetitions} />
            </div>
            <div className="text-sm text-muted-foreground">
              {stats.activeCompetitions} active, {stats.completedCompetitions} completed
            </div>
          </GlassCard>

          <GlassCard hover glow className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Target className="w-8 h-8 text-secondary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Score
              </span>
            </div>
            <div className="text-3xl font-bold">
              <AnimatedCounter value={stats.totalScore} />
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-success" />
              +245 this week
            </div>
          </GlassCard>

          <GlassCard hover glow className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Award className="w-8 h-8 text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Global Rank
              </span>
            </div>
            <div className="text-3xl font-bold">
              #<AnimatedCounter value={stats.rank} />
            </div>
            <div className="text-sm text-muted-foreground">
              Top {Math.round((stats.rank / stats.totalParticipants) * 100)}% of all participants
            </div>
          </GlassCard>

          <GlassCard hover glow className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Calendar className="w-8 h-8 text-warning" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Current Streak
              </span>
            </div>
            <div className="text-3xl font-bold">
              <AnimatedCounter value={stats.streak} suffix=" days" />
            </div>
            <div className="text-sm text-muted-foreground">
              Keep it up! 🔥
            </div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Competitions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold">Recent Competitions</h2>
            <div className="space-y-4">
              {recentCompetitions.map((comp) => (
                <GlassCard key={comp.id} hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{comp.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Ends {new Date(comp.endDate).toLocaleDateString()}
                        </span>
                        {comp.status === 'active' && (
                          <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                    <Link to={`/competitions/${comp.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full">
                        View
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Score</div>
                      <div className="text-2xl font-bold text-primary">{(comp.score * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Rank</div>
                      <div className="text-2xl font-bold text-secondary">#{comp.rank}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Badges</h2>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <GlassCard
                    key={badge.name}
                    hover
                    className="p-4 flex flex-col items-center justify-center text-center space-y-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <badge.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium">{badge.name}</span>
                  </GlassCard>
                ))}
              </div>
            </div>

            <GlassCard className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Teams Joined
                  </span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Submissions
                  </span>
                  <span className="font-semibold">142</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Badges Earned
                  </span>
                  <span className="font-semibold">{stats.badges}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
