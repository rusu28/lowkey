import { useState } from 'react';
import { GlassCard } from './ui/glass-card';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      category: 'Getting Started',
      question: 'How do I create an account on Lowkey AI Contests?',
      answer: 'Click on the "Sign Up" button in the top right corner of the homepage. Fill in your email, create a password, and verify your account through the email we send you. Once verified, you can start participating in competitions!',
    },
    {
      category: 'Getting Started',
      question: 'What kind of competitions are available?',
      answer: 'We offer various types of AI/ML competitions including image classification, NLP tasks, time series forecasting, reinforcement learning challenges, and more. Each competition has different difficulty levels ranging from beginner to advanced.',
    },
    {
      category: 'Getting Started',
      question: 'Do I need to be an expert to participate?',
      answer: 'No! We have competitions for all skill levels. Many competitions are specifically designed for beginners and include tutorials and starter code to help you learn.',
    },
    {
      category: 'Competitions',
      question: 'How do I join a competition?',
      answer: 'Navigate to the Competitions page, find a competition that interests you, and click "Join Competition". You can participate solo or create/join a team depending on the competition rules.',
    },
    {
      category: 'Competitions',
      question: 'Can I participate in multiple competitions at once?',
      answer: 'Yes! You can participate in as many active competitions as you like. Just make sure you can manage your time effectively to submit quality solutions.',
    },
    {
      category: 'Competitions',
      question: 'When can I access the competition problems?',
      answer: 'Competition problems become visible only after the competition start date. Before that, you can see the competition description, rules, and timeline.',
    },
    {
      category: 'Competitions',
      question: 'How are submissions evaluated?',
      answer: 'Each competition has its own evaluation metric (accuracy, F1 score, RMSE, etc.). Your submission is tested against a private test set, and you\'ll receive a score. The leaderboard shows your ranking among all participants.',
    },
    {
      category: 'Teams',
      question: 'How do teams work?',
      answer: 'For team competitions, you can either create your own team (1-5 members) or join an existing one. Team members can collaborate on solutions and share submissions. The team\'s best submission counts for the final ranking.',
    },
    {
      category: 'Teams',
      question: 'Can I leave a team after joining?',
      answer: 'Yes, you can leave a team before the competition deadline. However, make sure to communicate with your team members first, as this might affect their strategy.',
    },
    {
      category: 'Submissions',
      question: 'How many submissions can I make?',
      answer: 'This varies by competition. Most competitions allow 5-10 submissions per day. Check the competition rules for specific limits.',
    },
    {
      category: 'Submissions',
      question: 'What file formats are accepted for submissions?',
      answer: 'Most competitions accept CSV files for predictions. Some may also accept Jupyter notebooks or Python scripts. Always check the submission guidelines for each competition.',
    },
    {
      category: 'Scoring',
      question: 'How is the leaderboard calculated?',
      answer: 'The leaderboard ranks participants based on their best submission score. Scores are calculated using the competition\'s evaluation metric against a public test set during the competition, and a private test set for final rankings.',
    },
    {
      category: 'Scoring',
      question: 'What are badges and achievements?',
      answer: 'Badges are rewards you earn for accomplishments like finishing in the top 10, achieving perfect accuracy, or maintaining a streak. They showcase your skills and progress on your profile.',
    },
    {
      category: 'Account',
      question: 'Can I integrate my Kaggle account?',
      answer: 'Yes! Go to Settings and connect your Kaggle account. This allows us to sync your competition results and display your Kaggle achievements.',
    },
    {
      category: 'Account',
      question: 'How do I change my email or password?',
      answer: 'Go to Settings, then navigate to the Account section. You can update your email, password, and other account details there.',
    },
    {
      category: 'Technical',
      question: 'What programming languages can I use?',
      answer: 'You can use any programming language you prefer (Python, R, Julia, etc.). However, Python is the most commonly used and has the best library support for AI/ML tasks.',
    },
    {
      category: 'Technical',
      question: 'Do you provide computational resources?',
      answer: 'Currently, participants need to use their own computational resources. We recommend using free GPU resources from Google Colab or Kaggle Kernels for training models.',
    },
  ];

  const categories = ['all', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-primary font-['Permanent_Marker']">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about Lowkey AI Contests
          </p>
        </div>

        {/* Search */}
        <GlassCard className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </GlassCard>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFAQ.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <p className="text-muted-foreground">No questions found matching your search.</p>
            </GlassCard>
          ) : (
            filteredFAQ.map((item, index) => (
              <GlassCard key={index} hover className="overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-lg mt-2">{item.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 text-muted-foreground border-t border-border/30">
                    {item.answer}
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <GlassCard className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Still have questions?</h3>
          <p className="text-muted-foreground">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <Button className="rounded-full bg-primary hover:bg-primary-dark " asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
