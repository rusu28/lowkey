import { useState } from 'react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Bell, Trophy, Users, Calendar, Award, Check, Trash2, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: string;
  type: 'competition' | 'team' | 'achievement' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'competition',
      title: 'Competition Ending Soon',
      message: 'Image Classification Challenge ends in 2 days',
      time: '2 hours ago',
      read: false,
      link: '/competitions/1',
    },
    {
      id: '2',
      type: 'achievement',
      title: 'New Badge Unlocked!',
      message: 'You earned the "Fast Learner" badge',
      time: '1 day ago',
      read: false,
    },
    {
      id: '3',
      type: 'team',
      title: 'Team Invitation',
      message: 'You have been invited to join Team Alpha',
      time: '2 days ago',
      read: false,
    },
    {
      id: '4',
      type: 'competition',
      title: 'New Competition Available',
      message: 'NLP Sentiment Analysis is now open for registration',
      time: '3 days ago',
      read: true,
      link: '/competitions/2',
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Submission Reminder',
      message: 'Don\'t forget to submit your solution for Time Series Forecasting',
      time: '4 days ago',
      read: true,
      link: '/competitions/3',
    },
  ]);

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <GlassCard className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view notifications</h2>
          <Link to="/signin">
            <Button className="rounded-full bg-primary hover:bg-primary-dark ">
              Sign In
            </Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'competition':
        return <Trophy className="w-5 h-5" />;
      case 'team':
        return <Users className="w-5 h-5" />;
      case 'achievement':
        return <Award className="w-5 h-5" />;
      case 'reminder':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary font-['Permanent_Marker']">
              Notifications
            </h1>
            <p className="text-muted-foreground mt-2">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="rounded-full"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              disabled={notifications.length === 0}
              className="rounded-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all
            </Button>
            <Link to="/settings">
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <GlassCard className="p-12 text-center space-y-4">
            <Bell className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
            <div>
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <GlassCard
                key={notification.id}
                hover
                className={`p-5 transition-all ${!notification.read ? 'ring-2 ring-primary/30' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'competition' ? 'bg-primary/10 text-primary' :
                      notification.type === 'team' ? 'bg-secondary/10 text-secondary' :
                      notification.type === 'achievement' ? 'bg-accent/10 text-accent' :
                      'bg-warning/10 text-warning'
                    }`}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-foreground/70'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                            className="rounded-full h-8 w-8"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNotification(notification.id)}
                          className="rounded-full h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {notification.link && (
                      <Link to={notification.link}>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Notification Preferences */}
        <GlassCard className="p-6">
          <h3 className="font-semibold text-lg mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Competition Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about competition deadlines and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Team Invitations</p>
                <p className="text-sm text-muted-foreground">Receive notifications for team invitations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Achievements & Badges</p>
                <p className="text-sm text-muted-foreground">Get notified when you earn new badges</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
