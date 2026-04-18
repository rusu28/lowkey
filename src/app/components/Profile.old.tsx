import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { GlassCard } from './ui/glass-card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Trophy, Award, Calendar, MapPin, Link as LinkIcon, Github, Twitter, TrendingUp, Target, Code } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Link } from 'react-router';
import { AnimatedCounter } from './ui/animated-counter';

export function Profile() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [userId]);

  // Mock user data
  const user = {
    id: userId,
    name: 'Alexandru Pop',
    username: '@alexpop',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandru',
    bio: 'AI/ML enthusiast | Kaggle Master | Love solving challenging problems with deep learning',
    location: 'Bucharest, Romania',
    website: 'https://alexpop.dev',
    github: 'alexpop',
    twitter: 'alexpop',
    joinDate: 'January 2025',
    stats: {
      rank: 142,
      totalScore: 15420,
      competitions: 45,
      badges: 12,
      wins: 8,
      topTen: 23,
    },
  };

  const badges = [
    { icon: Trophy, name: 'Top 10 Finish', description: 'Finished in top 10', unlocked: true },
    { icon: Target, name: '100% Accuracy', description: 'Perfect score', unlocked: true },
    { icon: Award, name: 'Fast Learner', description: 'Quick to master new topics', unlocked: true },
    { icon: TrendingUp, name: 'Trending Up', description: 'Consistent improvement', unlocked: true },
    { icon: Code, name: 'Code Master', description: 'Excellent code quality', unlocked: true },
    { icon: Trophy, name: '1st Place', description: 'Win a competition', unlocked: true },
    { icon: Trophy, name: 'Veteran', description: '50+ competitions', unlocked: false },
    { icon: Award, name: 'Team Player', description: 'Win as a team', unlocked: true },
  ];

  const recentActivity = [
    { type: 'competition', title: 'Placed #23 in Image Classification Challenge', date: '2 days ago' },
    { type: 'badge', title: 'Earned "Fast Learner" badge', date: '5 days ago' },
    { type: 'competition', title: 'Joined NLP Sentiment Analysis', date: '1 week ago' },
    { type: 'achievement', title: 'Reached Top 150 globally', date: '2 weeks ago' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-6 max-w-6xl space-y-8">
          <Skeleton className="h-64 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-96 rounded-2xl" />
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-48 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl space-y-8">
        {/* Profile Header */}
        <GlassCard className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <Avatar className="h-32 w-32 ring-4 ring-border">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-primary">
                  {user.name}
                </h1>
                <p className="text-muted-foreground">{user.username}</p>
              </div>
              <p className="text-foreground/90">{user.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinDate}
                </div>
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <LinkIcon className="w-4 h-4" />
                    {user.website.replace('https://', '')}
                  </a>
                )}
                {user.github && (
                  <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                    {user.github}
                  </a>
                )}
                {user.twitter && (
                  <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Twitter className="w-4 h-4" />
                    {user.twitter}
                  </a>
                )}
              </div>
            </div>
            <Button className="rounded-full bg-primary hover:bg-primary-dark ">
              Follow
            </Button>
          </div>
        </GlassCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <GlassCard hover className="p-4 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Rank</div>
            <div className="text-2xl font-bold text-primary">
              #<AnimatedCounter value={user.stats.rank} />
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Score</div>
            <div className="text-2xl font-bold text-secondary">
              <AnimatedCounter value={user.stats.totalScore} />
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Competitions</div>
            <div className="text-2xl font-bold text-accent">
              <AnimatedCounter value={user.stats.competitions} />
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Wins</div>
            <div className="text-2xl font-bold text-warning">
              <AnimatedCounter value={user.stats.wins} />
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Top 10</div>
            <div className="text-2xl font-bold text-success">
              <AnimatedCounter value={user.stats.topTen} />
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Badges</div>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={user.stats.badges} />
            </div>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Badges & Achievements</h2>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <GlassCard
                    key={badge.name}
                    hover={badge.unlocked}
                    className={`p-4 flex flex-col items-center justify-center text-center space-y-2 ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}
                    title={badge.description}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <badge.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium leading-tight">{badge.name}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <GlassCard className="divide-y divide-border/50">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'competition' ? 'bg-primary/10 text-primary' :
                        activity.type === 'badge' ? 'bg-secondary/10 text-secondary' :
                        'bg-accent/10 text-accent'
                      }`}>
                        {activity.type === 'competition' && <Trophy className="w-5 h-5" />}
                        {activity.type === 'badge' && <Award className="w-5 h-5" />}
                        {activity.type === 'achievement' && <TrendingUp className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </div>

            {/* Competition History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Competition History</h2>
                <Link to="/competitions">
                  <Button variant="outline" size="sm" className="rounded-full">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <GlassCard key={i} hover className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Competition {i}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Rank #23 • Score: 94.5%</p>
                      </div>
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
