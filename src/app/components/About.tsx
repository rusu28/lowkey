import { Link } from 'react-router';
import { Button } from './ui/button';
import { Rocket, Users, Trophy, Target } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl">
              <span className="font-['Permanent_Marker'] text-primary">Lowkey</span>
              <br />
              <span className="text-foreground">AI Contests</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              The ultimate platform for AI and machine learning competitions
            </p>
          </div>
        </div>
      </section>

      {/* About Website Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl">About the Platform</h2>
              <p className="text-lg text-muted-foreground">
                Built for AI enthusiasts, by AI enthusiasts
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <div className="bg-card border border-border rounded-lg p-8 shadow-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To create the most engaging and educational AI competition platform where
                  data scientists and machine learning engineers can challenge themselves,
                  learn from others, and grow their skills through real-world problems.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 shadow-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">What We Offer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A comprehensive platform featuring competitive challenges, team
                  collaboration tools, detailed editorials from top performers,
                  Kaggle integration, achievement badges, and a vibrant global community.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 shadow-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join thousands of AI enthusiasts from around the world. Collaborate
                  on teams, share knowledge, and participate in a supportive environment
                  where everyone can learn and improve together.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 shadow-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Competitive & Fun</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're a beginner or an expert, our competitions are designed
                  to be both challenging and enjoyable. Earn badges, track your progress,
                  and compete against the best in the field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Account CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-card border border-border rounded-lg p-12 shadow-card text-center">
            <h2 className="text-3xl md:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create your account today and be among the first to access competitions,
              connect with the community, and start building your AI skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="h-12 px-8 bg-primary hover:bg-primary-hover">
                  Create Account
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" className="h-12 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Free to join • No credit card required • Start competing immediately
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
