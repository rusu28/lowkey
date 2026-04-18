import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Plus, Calendar, Clock, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorEmail: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export function Blog() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('news_posts');
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      // Create some default posts
      const defaultPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Welcome to Lowkey AI Contests',
          excerpt: 'Introducing the next generation of AI competition platforms. Learn what makes us different and what to expect when we launch.',
          content: 'Full content here...',
          author: 'Admin User',
          authorEmail: 'admin@test.com',
          publishedAt: '2026-04-01T10:00:00Z',
          readTime: 5,
          tags: ['announcement', 'platform'],
        },
        {
          id: '2',
          title: 'How to Get Started with AI Competitions',
          excerpt: 'A comprehensive guide for beginners looking to dive into the world of machine learning competitions.',
          content: 'Full content here...',
          author: 'Admin User',
          authorEmail: 'admin@test.com',
          publishedAt: '2026-04-10T14:30:00Z',
          readTime: 8,
          tags: ['tutorial', 'beginner'],
        },
      ];
      localStorage.setItem('news_posts', JSON.stringify(defaultPosts));
      setPosts(defaultPosts);
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl mb-4">News</h1>
            <p className="text-lg text-muted-foreground">
              Insights, tutorials, and updates from the Lowkey AI team
            </p>
          </div>
          {user?.isOrganizer && (
            <Link to="/news/admin">
              <Button className="bg-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
          )}
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/news/${post.id}`}>
                <article className="bg-card border border-border rounded-lg p-8 shadow-card hover:shadow-md transition-all card-hover">
                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
