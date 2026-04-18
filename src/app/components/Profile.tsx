import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Trophy, Award, Calendar, MapPin, Link as LinkIcon, Github, Twitter, Flame, Target, Code, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [userId]);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view profiles</h2>
          <Link to="/signin">
            <Button className="rounded-lg bg-primary hover:bg-primary-hover">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock user data - in production would fetch by userId
  const user = {
    ...currentUser,
    location: 'Bucharest, Romania',
    website: 'https://example.com',
    github: 'username',
    twitter: 'username',
  };

  const activityData = generateActivityData(user.activeDays || 0);

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-48 bg-muted rounded-lg" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-6 max-w-7xl space-y-6">
        {/* Profile Header Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-card">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 ring-4 ring-border">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                {user.kaggleUsername && (
                  <a
                    href={`https://kaggle.com/${user.kaggleUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
                  >
                    <Trophy className="w-4 h-4" />
                    @{user.kaggleUsername}
                  </a>
                )}
              </div>
              {user.bio && <p className="text-foreground/90">{user.bio}</p>}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </div>
                )}
                {user.joinedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                )}
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                    <LinkIcon className="w-4 h-4" />
                    {user.website.replace('https://', '')}
                  </a>
                )}
                {user.github && (
                  <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                    <Github className="w-4 h-4" />
                    {user.github}
                  </a>
                )}
                {user.twitter && (
                  <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                    <Twitter className="w-4 h-4" />
                    {user.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kaggle-Style Streak and Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Streak Card */}
          <div className="bg-card border border-border rounded-lg p-6 text-center shadow-card">
            <Flame className={`w-8 h-8 mx-auto mb-2 ${(user.streak || 0) > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
            <div className="text-3xl font-bold text-foreground mb-1">{user.streak || 0}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>

          {/* Active Days */}
          <div className="bg-card border border-border rounded-lg p-6 text-center shadow-card">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold text-foreground mb-1">{user.activeDays || 0}</div>
            <div className="text-sm text-muted-foreground">Active Days</div>
          </div>

          {/* Competitions */}
          <div className="bg-card border border-border rounded-lg p-6 text-center shadow-card">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold text-foreground mb-1">{user.problemScores?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Competitions</div>
          </div>

          {/* Teams */}
          <div className="bg-card border border-border rounded-lg p-6 text-center shadow-card">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold text-foreground mb-1">{user.teams?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Teams</div>
          </div>
        </div>

        {/* Activity Heatmap - Kaggle Style */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <h3 className="font-semibold text-lg mb-4">Activity</h3>
          <div className="overflow-x-auto">
            <div className="inline-flex flex-col gap-1">
              <div className="flex gap-1 text-xs text-muted-foreground mb-2">
                <span className="w-8">Mon</span>
              </div>
              <div className="flex gap-1">
                {activityData.slice(0, Math.min(52, activityData.length)).map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {week.map((day, dayIdx) => (
                      <div
                        key={dayIdx}
                        className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)}`}
                        title={`${day.count} activities on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted" />
                <div className="w-3 h-3 rounded-sm bg-primary/20" />
                <div className="w-3 h-3 rounded-sm bg-primary/40" />
                <div className="w-3 h-3 rounded-sm bg-primary/60" />
                <div className="w-3 h-3 rounded-sm bg-primary" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <h3 className="font-semibold text-lg mb-4">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Trophy, name: 'Competition Master', count: user.problemScores?.length || 0, threshold: 10 },
              { icon: Target, name: 'Precision Expert', count: 5, threshold: 5 },
              { icon: Code, name: 'Code Quality', count: 3, threshold: 3 },
              { icon: Flame, name: 'Streak Keeper', count: user.streak || 0, threshold: 7 },
              { icon: Award, name: 'Top Performer', count: 2, threshold: 1 },
              { icon: TrendingUp, name: 'Rapid Learner', count: 4, threshold: 3 },
            ].map((badge) => {
              const unlocked = badge.count >= badge.threshold;
              return (
                <div
                  key={badge.name}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    unlocked
                      ? 'border-primary/20 bg-primary/5 hover:bg-primary/10'
                      : 'border-border bg-muted/50 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium mb-1">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {unlocked ? `${badge.count}/${badge.threshold}` : `${badge.count}/${badge.threshold}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'competition', text: 'Submitted solution to Image Classification', time: '2 hours ago' },
              { type: 'badge', text: 'Earned "Competition Master" badge', time: '1 day ago' },
              { type: 'team', text: 'Joined Team Alpha for NLP Challenge', time: '3 days ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'competition' && <Trophy className="w-4 h-4 text-primary" />}
                  {activity.type === 'badge' && <Award className="w-4 h-4 text-primary" />}
                  {activity.type === 'team' && <Users className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function generateActivityData(activeDays: number) {
  const weeks = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364); // 52 weeks

  for (let week = 0; week < 52; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + week * 7 + day);

      const count = Math.random() < (activeDays / 365) ? Math.floor(Math.random() * 5) : 0;
      weekData.push({
        date: date.toISOString().split('T')[0],
        count,
      });
    }
    weeks.push(weekData);
  }
  return weeks;
}

function getActivityColor(count: number): string {
  if (count === 0) return 'bg-muted';
  if (count === 1) return 'bg-primary/20';
  if (count === 2) return 'bg-primary/40';
  if (count === 3) return 'bg-primary/60';
  return 'bg-primary';
}
