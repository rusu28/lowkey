import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { BookOpen, Trophy, Code, Users, Clock, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Editorials() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Access detailed competition editorials and learn from top performers.
              Sign in to unlock exclusive content.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signin">
                <Button className="rounded-lg bg-primary hover:bg-primary-hover">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="rounded-lg">
                  Create Account
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Try: <code className="px-2 py-1 bg-muted rounded">admin@test.com</code> or{' '}
              <code className="px-2 py-1 bg-muted rounded">user@test.com</code>
            </p>
          </div>
        </div>
      </div>
    );
  }
  const editorials = [
    {
      id: '1',
      competitionTitle: 'Image Classification Challenge',
      author: 'Alexandru Pop',
      date: '2026-04-05',
      difficulty: 'Intermediate',
      views: 1240,
      readTime: '12 min',
      excerpt: 'Learn how the winning solution achieved 98.5% accuracy using an ensemble of CNNs and vision transformers.',
      tags: ['Computer Vision', 'CNN', 'Transfer Learning'],
    },
    {
      id: '2',
      competitionTitle: 'NLP Sentiment Analysis',
      author: 'Maria Ionescu',
      date: '2026-04-01',
      difficulty: 'Advanced',
      views: 892,
      readTime: '15 min',
      excerpt: 'Deep dive into the BERT-based approach that dominated the leaderboard with advanced fine-tuning techniques.',
      tags: ['NLP', 'BERT', 'Transformers'],
    },
    {
      id: '3',
      competitionTitle: 'Time Series Forecasting',
      author: 'Andrei Stoica',
      date: '2026-03-28',
      difficulty: 'Beginner',
      views: 2150,
      readTime: '8 min',
      excerpt: 'A beginner-friendly guide to using LSTM networks for accurate time series predictions.',
      tags: ['Time Series', 'LSTM', 'RNN'],
    },
    {
      id: '4',
      competitionTitle: 'Object Detection in Urban Scenes',
      author: 'Elena Radu',
      date: '2026-03-20',
      difficulty: 'Advanced',
      views: 1567,
      readTime: '18 min',
      excerpt: 'Exploring YOLO v8 and its optimizations for real-time object detection in complex environments.',
      tags: ['Computer Vision', 'YOLO', 'Object Detection'],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Learn from Winners</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-primary font-['Permanent_Marker']">Editorials</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore detailed solutions and approaches from top performers in past competitions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">42+</div>
            <div className="text-sm text-muted-foreground">Editorials</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">28</div>
            <div className="text-sm text-muted-foreground">Contributors</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">15K+</div>
            <div className="text-sm text-muted-foreground">Readers</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Helpful</div>
          </GlassCard>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <Button variant="default" size="sm" className="rounded-full">
            All
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Computer Vision
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            NLP
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Time Series
          </Button>
        </div>

        {/* Editorials List */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {editorials.map((editorial) => (
            <GlassCard key={editorial.id} className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-muted text-xs font-semibold">
                        {editorial.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {editorial.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {editorial.views} views
                      </span>
                    </div>

                    <Link to={`/editorials/${editorial.id}`}>
                      <h3 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                        {editorial.competitionTitle}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground mb-4">
                      {editorial.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {editorial.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        By <span className="font-medium text-foreground">{editorial.author}</span> • {editorial.date}
                      </div>
                      <Link to={`/editorials/${editorial.id}`}>
                        <Button variant="ghost" size="sm" className="rounded-full gap-2">
                          Read Editorial
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <GlassCard className="p-12 text-center max-w-3xl mx-auto">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Want to Write an Editorial?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Share your winning solution and help others learn. Top editorials get featured and rewarded!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button className="gap-2 rounded-full px-8 bg-primary hover:bg-primary-dark">
                  <Code className="w-5 h-5" />
                  Submit Editorial
                </Button>
              </Link>
              <Link to="/competitions">
                <Button variant="outline" className="gap-2 rounded-full px-8">
                  Browse Competitions
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
