import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { GlassCard } from './ui/glass-card';
import { AnimatedCounter } from './ui/animated-counter';
import { Trophy, Brain, Users, ArrowRight, Sparkles, Code, Target, Zap, Award, TrendingUp, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { competitions } from '../data/competitions';

export function Home() {
  const [scrollY, setScrollY] = useState(0);
  const latestCompetitions = competitions.slice(0, 3);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax & Floating Shapes */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite_2s]"
            style={{ transform: `translateY(${scrollY * 0.12}px)` }}
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/40 mb-8 animate-[slide-in-up_0.6s_ease-out]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Compete. Learn. Win.</span>
            </div>

            {/* Main Headline with Gradient */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight animate-[slide-in-up_0.8s_ease-out]">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite] bg-[length:200%_auto]">
                Lowkey
              </span>
              <br />
              <span className="text-foreground">AI Contests</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-[slide-in-up_1s_ease-out]">
              Join the ultimate platform for machine learning competitions.
              Sharpen your skills, compete with the best, and win amazing prizes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-16 animate-[slide-in-up_1.2s_ease-out]">
              <Link to="/competitions">
                <Button
                  size="lg"
                  className="gap-2 rounded-full px-10 h-14 text-lg bg-gradient-to-r from-primary to-secondary shadow-glow hover-lift transition-all"
                >
                  <Zap className="w-5 h-5" />
                  Explore Competitions
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-full px-10 h-14 text-lg hover-scale transition-all glass"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-[scale-in_1.4s_ease-out]">
              <GlassCard hover className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={15000} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </GlassCard>
              <GlassCard hover className="p-6 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">
                  <AnimatedCounter value={250} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Competitions</div>
              </GlassCard>
              <GlassCard hover className="p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  $<AnimatedCounter value={50000} />
                </div>
                <div className="text-sm text-muted-foreground">In Prizes</div>
              </GlassCard>
              <GlassCard hover className="p-6 text-center">
                <div className="text-4xl font-bold text-warning mb-2">
                  <AnimatedCounter value={95} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section with Glassmorphism */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              Why Choose Us
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Everything you need to excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A competitive platform designed for AI enthusiasts of all levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Real-World Challenges',
                description: 'Work on authentic problems with real datasets. Build models that matter and make an impact in the AI community.',
                color: 'from-primary to-blue-500',
              },
              {
                icon: Brain,
                title: 'Learn from the Best',
                description: 'Access detailed editorials and winning solutions. Understand advanced techniques used by top performers.',
                color: 'from-secondary to-purple-500',
              },
              {
                icon: Trophy,
                title: 'Win Prizes',
                description: 'Compete for cash prizes, badges, and recognition. Climb the global leaderboard and showcase your skills.',
                color: 'from-accent to-cyan-500',
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Join forces with other participants. Form teams, share knowledge, and solve challenges together.',
                color: 'from-warning to-orange-500',
              },
              {
                icon: Target,
                title: 'Skill Development',
                description: 'Improve your machine learning skills with hands-on practice. Track your progress with detailed analytics.',
                color: 'from-success to-green-500',
              },
              {
                icon: TrendingUp,
                title: 'Global Rankings',
                description: 'See how you stack up against thousands of data scientists worldwide. Build your professional reputation.',
                color: 'from-destructive to-red-500',
              },
            ].map((feature, idx) => (
              <GlassCard
                key={idx}
                hover
                className="p-8 group cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Competitions with Enhanced Cards */}
      <section className="py-32 bg-muted/20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Latest Challenges
              </span>
              <h2 className="text-5xl font-bold mb-4">Active Competitions</h2>
              <p className="text-xl text-muted-foreground">Join thousands competing right now</p>
            </div>
            <Link to="/competitions">
              <Button variant="outline" className="gap-2 rounded-full hover-scale transition-all">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCompetitions.map((competition, idx) => (
              <Link
                key={competition.id}
                to={`/competitions/${competition.id}`}
                className="group block"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <GlassCard hover glow className="overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-${1550000000000 + idx}?w=600&h=400&fit=crop`}
                      alt={competition.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 rounded-full glass text-xs font-semibold">
                        {competition.difficulty}
                      </span>
                      {competition.prize !== 'Knowledge' && (
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-warning to-orange-500 text-white text-xs font-semibold flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {competition.prize}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {competition.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                      {competition.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{competition.participants.toLocaleString()}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                        Join Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Animation */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              Simple Process
            </span>
            <h2 className="text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Sign Up', description: 'Create your free account in seconds and gain access to all competitions and resources.' },
              { step: '2', title: 'Choose Challenge', description: 'Browse our competitions and pick one that matches your interests and skill level.' },
              { step: '3', title: 'Submit & Win', description: 'Submit your solution, climb the leaderboard, and win prizes while learning from the best.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white shadow-glow animate-[glow-pulse_2s_ease-in-out_infinite]">
                    {item.step}
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <GlassCard className="p-16 text-center max-w-4xl mx-auto">
            <Award className="w-16 h-16 mx-auto mb-8 text-primary" />
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of data scientists and machine learning engineers improving their skills every day.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="gap-2 rounded-full px-10 h-14 text-lg bg-gradient-to-r from-primary to-secondary shadow-glow hover-lift transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Sign Up Now - It's Free
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-full px-10 h-14 text-lg hover-scale transition-all"
                >
                  <Trophy className="w-5 h-5" />
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
