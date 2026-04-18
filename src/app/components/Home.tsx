import { Link } from 'react-router';
import { Button } from './ui/button';
import { GlassCard } from './ui/glass-card';
import { AnimatedCounter } from './ui/animated-counter';
import { Trophy, Brain, Users, ArrowRight, Code, Target, Zap } from 'lucide-react';
import { competitions } from '../data/competitions';

export function Home() {
  const latestCompetitions = competitions.slice(0, 3);

  return (
    <div>
      {/* Hero Section - Clean and performant */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8">
              <span className="text-sm font-medium">Compete. Learn. Win.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              <span className="text-primary font-['Permanent_Marker']">Lowkey</span>
              <br />
              <span className="text-foreground">AI Contests</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join the ultimate platform for machine learning competitions.
              Sharpen your skills, compete with the best, and win amazing prizes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link to="/competitions">
                <Button size="lg" className="gap-2 rounded-full px-10 h-14 text-lg bg-primary hover:bg-primary-dark">
                  <Zap className="w-5 h-5" />
                  Explore Competitions
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="gap-2 rounded-full px-10 h-14 text-lg">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={15000} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={250} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Competitions</div>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  $<AnimatedCounter value={50000} />
                </div>
                <div className="text-sm text-muted-foreground">In Prizes</div>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={95} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
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
                description: 'Work on authentic problems with real datasets. Build models that matter and make an impact.',
              },
              {
                icon: Brain,
                title: 'Learn from the Best',
                description: 'Access detailed editorials and winning solutions. Understand advanced techniques.',
              },
              {
                icon: Trophy,
                title: 'Win Prizes',
                description: 'Compete for cash prizes, badges, and recognition. Climb the global leaderboard.',
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Join forces with other participants. Form teams and solve challenges together.',
              },
              {
                icon: Target,
                title: 'Skill Development',
                description: 'Improve your machine learning skills with hands-on practice and detailed analytics.',
              },
              {
                icon: ArrowRight,
                title: 'Global Rankings',
                description: 'See how you stack up against thousands of data scientists worldwide.',
              },
            ].map((feature, idx) => (
              <GlassCard key={idx} className="p-8 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Competitions */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Latest Challenges
              </span>
              <h2 className="text-4xl font-bold mb-4">Active Competitions</h2>
              <p className="text-xl text-muted-foreground">Join thousands competing right now</p>
            </div>
            <Link to="/competitions">
              <Button variant="outline" className="gap-2 rounded-full">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCompetitions.map((competition) => (
              <Link
                key={competition.id}
                to={`/competitions/${competition.id}`}
                className="group block"
              >
                <GlassCard className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-muted text-xs font-semibold">
                        {competition.difficulty}
                      </span>
                      {competition.prize !== 'Knowledge' && (
                        <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {competition.prize}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {competition.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {competition.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-sm pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{competition.participants.toLocaleString()}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-full">
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

      {/* How It Works */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Sign Up', description: 'Create your free account and gain access to all competitions.' },
              { step: '2', title: 'Choose Challenge', description: 'Browse competitions and pick one that matches your skill level.' },
              { step: '3', title: 'Submit & Win', description: 'Submit your solution, climb the leaderboard, and win prizes.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <GlassCard className="p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of data scientists improving their skills every day.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gap-2 rounded-full px-10 h-14 text-lg bg-primary hover:bg-primary-dark">
                  Sign Up Now - It's Free
                </Button>
              </Link>
              <Link to="/editorials">
                <Button size="lg" variant="outline" className="gap-2 rounded-full px-10 h-14 text-lg">
                  <Trophy className="w-5 h-5" />
                  View Editorials
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
