import { useParams, Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Calendar, Clock, User, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

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

export function BlogPost() {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('news_posts');
    if (stored) {
      const posts: BlogPost[] = JSON.parse(stored);
      const foundPost = posts.find((p) => p.id === postId);
      setPost(foundPost || null);
    }
  }, [postId]);

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const stored = localStorage.getItem('news_posts');
    if (stored) {
      const posts: BlogPost[] = JSON.parse(stored);
      const filtered = posts.filter((p) => p.id !== postId);
      localStorage.setItem('news_posts', JSON.stringify(filtered));
      toast.success('Post deleted successfully');
      navigate('/news');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
            <p className="text-muted-foreground">Post not found</p>
            <Link to="/news" className="mt-4 inline-block">
              <Button variant="outline">Back to News</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link to="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        {/* Article */}
        <article className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-card">
          {/* Tags */}
          <div className="flex gap-2 mb-6">
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
          <h1 className="text-4xl md:text-5xl mb-6">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 mb-8 border-b border-border">
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

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </div>
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Admin Actions */}
          {user?.isOrganizer && (
            <div className="flex gap-4 mt-12 pt-8 border-t border-border">
              <Link to={`/news/admin?edit=${post.id}`}>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Post
                </Button>
              </Link>
              <Button variant="outline" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Post
              </Button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
