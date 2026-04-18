import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "../context/AuthContext";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { User, Link as LinkIcon, Unlink, ExternalLink, Settings as SettingsIcon, Camera, Save, Edit2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";

export function Settings() {
  const { user, linkKaggle, unlinkKaggle, updateProfile, setEmailSubscription } = useAuth();
  const [kaggleUsername, setKaggleUsername] = useState(user?.kaggleUsername || "");
  const [isLinking, setIsLinking] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileBio, setProfileBio] = useState(user?.bio || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="py-12 min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-muted-foreground">Please sign in to access settings.</p>
        </Card>
      </div>
    );
  }

  const handleLinkKaggle = async () => {
    if (!kaggleUsername.trim()) {
      toast.error("Please enter a Kaggle username");
      return;
    }

    setIsLinking(true);
    await linkKaggle(kaggleUsername.trim());
    toast.success("Kaggle account linked successfully!");
    setIsLinking(false);
  };

  const handleUnlinkKaggle = async () => {
    await unlinkKaggle();
    setKaggleUsername("");
    toast.success("Kaggle account unlinked");
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim()) {
      toast.error("Please enter a name");
      return;
    }

    await updateProfile({ name: profileName, bio: profileBio });
    toast.success("Profile updated successfully!");
    setIsEditingProfile(false);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        void updateProfile({ avatarUrl: base64String }).then(() => {
          toast.success("Avatar updated successfully!");
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubscriptionToggle = async (nextValue: boolean) => {
    const result = await setEmailSubscription(nextValue);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(nextValue ? "Subscribed to emails." : "Unsubscribed from emails.");
  };

  return (
    <div className="py-12 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <SettingsIcon size={32} />
              <h1 className="text-4xl">Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account settings and integrations
            </p>
          </div>

          {/* Profile Information */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <User size={24} />
              <h2 className="text-2xl">Profile Information</h2>
            </div>
            <Separator className="mb-6" />

            <div className="space-y-6">
              {/* Avatar Section - Featured */}
              <div className="flex items-center gap-6 p-6 bg-muted/50 rounded-2xl border border-border/40">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback className="text-3xl">{user.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Camera size={16} />
                    Change Avatar
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled className="mt-1" />
              </div>
              <div>
                <Label>Account Type</Label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                    {user.isOrganizer ? "Admin" : "User"}
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  disabled={!isEditingProfile}
                  placeholder="Tell us about yourself..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                {isEditingProfile ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setProfileName(user.name);
                        setProfileBio(user.bio || "");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveProfile}
                      className="gap-2"
                    >
                      <Save size={16} />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditProfile}
                    className="gap-2"
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl mb-1">Email Subscription</h2>
                <p className="text-sm text-muted-foreground">
                  Receive product updates and launch announcements. You can unsubscribe any time.
                </p>
              </div>
              <Switch
                checked={Boolean(user.isEmailSubscribed)}
                onCheckedChange={handleSubscriptionToggle}
              />
            </div>
          </Card>

          {/* Kaggle Integration */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <LinkIcon size={24} />
              <h2 className="text-2xl">Kaggle Integration</h2>
            </div>
            <Separator className="mb-6" />

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Link your Kaggle account to sync your competition submissions and track your scores automatically.
                This allows you to see your complete/partial scores for each problem directly on our platform.
              </p>

              {user.kaggleUsername ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <LinkIcon size={20} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Connected to Kaggle</p>
                        <p className="text-sm text-muted-foreground">
                          Username: <span className="font-mono">{user.kaggleUsername}</span>
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUnlinkKaggle}
                      className="gap-2"
                    >
                      <Unlink size={16} />
                      Unlink
                    </Button>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                    <ExternalLink size={16} className="mt-0.5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Visit your Kaggle profile at{" "}
                      <a
                        href={`https://www.kaggle.com/${user.kaggleUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        kaggle.com/{user.kaggleUsername}
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kaggle">Kaggle Username</Label>
                    <div className="flex gap-2">
                      <Input
                        id="kaggle"
                        placeholder="your-kaggle-username"
                        value={kaggleUsername}
                        onChange={(e) => setKaggleUsername(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleLinkKaggle();
                          }
                        }}
                      />
                      <Button
                        onClick={handleLinkKaggle}
                        disabled={isLinking || !kaggleUsername.trim()}
                        className="gap-2 min-w-[100px]"
                      >
                        <LinkIcon size={16} />
                        {isLinking ? "Linking..." : "Link"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter your Kaggle username (e.g., "johndoe" from kaggle.com/johndoe)
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                    <h3 className="font-medium mb-2">Benefits of linking Kaggle:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Automatically sync competition submissions</li>
                      <li>View complete/partial scores for each problem</li>
                      <li>Track your progress across multiple competitions</li>
                      <li>Compare your performance with other participants</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Score Simulation (Demo) */}
          {user.kaggleUsername && (
            <Card className="p-6 mt-6">
              <h2 className="text-2xl mb-4">Score Tracking Demo</h2>
              <Separator className="mb-6" />
              <p className="text-sm text-muted-foreground mb-4">
                In a real implementation, scores would be synced from Kaggle automatically.
                For now, you can simulate scores by viewing competition problems.
              </p>
              <div className="space-y-2">
                {user.problemScores.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No scores recorded yet. Join a competition and submit solutions!</p>
                ) : (
                  <div className="space-y-2">
                    {user.problemScores.map((score, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Competition {score.competitionId}, Problem {score.problemId}</p>
                          <p className="text-xs text-muted-foreground">
                            {score.isComplete ? "Complete" : "Partial"} - {score.score}/{score.maxScore} points
                          </p>
                        </div>
                        {score.submissionDate && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(score.submissionDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
