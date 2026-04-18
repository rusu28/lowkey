import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Save, X } from 'lucide-react';
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

export function BlogAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('5');

  useEffect(() => {
    if (editId) {
      const stored = localStorage.getItem('news_posts');
      if (stored) {
        const posts: BlogPost[] = JSON.parse(stored);
        const post = posts.find((p) => p.id === editId);
        if (post) {
          setTitle(post.title);
          setExcerpt(post.excerpt);
          setContent(post.content);
          setTags(post.tags.join(', '));
          setReadTime(String(post.readTime));
        }
      }
    }
  }, [editId]);

  // Redirect if not organizer
  if (!user?.isOrganizer) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
            <p className="text-muted-foreground mb-4">You must be an organizer to access this page</p>
            <Link to="/news">
              <Button variant="outline">Back to News</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem('news_posts');
    const posts: BlogPost[] = stored ? JSON.parse(stored) : [];

    const postData: BlogPost = {
      id: editId || String(Date.now()),
      title,
      excerpt,
      content,
      author: user.name || 'Admin User',
      authorEmail: user.email,
      publishedAt: editId
        ? posts.find((p) => p.id === editId)?.publishedAt || new Date().toISOString()
        : new Date().toISOString(),
      readTime: parseInt(readTime) || 5,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (editId) {
      // Update existing post
      const updated = posts.map((p) => (p.id === editId ? postData : p));
      localStorage.setItem('news_posts', JSON.stringify(updated));
      toast.success('Post updated successfully');
    } else {
      // Create new post
      posts.unshift(postData);
      localStorage.setItem('news_posts', JSON.stringify(posts));
      toast.success('Post created successfully');
    }

    navigate('/news');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          <h1 className="text-3xl md:text-4xl">
            {editId ? 'Edit Post' : 'New Post'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 shadow-card space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
              className="h-12"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-semibold mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post"
              required
              rows={3}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be shown in the blog listing
            </p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              required
              rows={16}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Markdown support coming soon
            </p>
          </div>

          {/* Tags & Read Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tags" className="block text-sm font-semibold mb-2">
                Tags
              </label>
              <Input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tutorial, beginner, ml"
                className="h-12"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate tags with commas
              </p>
            </div>

            <div>
              <label htmlFor="readTime" className="block text-sm font-semibold mb-2">
                Read Time (minutes)
              </label>
              <Input
                id="readTime"
                type="number"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                min="1"
                max="60"
                className="h-12"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              <Save className="w-4 h-4 mr-2" />
              {editId ? 'Update Post' : 'Publish Post'}
            </Button>
            <Link to="/news">
              <Button type="button" variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
