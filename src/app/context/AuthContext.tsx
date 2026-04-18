import React, { createContext, useContext, useEffect, useState } from "react";
import { TeamInvite } from "../data/competitions";
import { supabase } from "../lib/supabase";

export interface ProblemScore {
  competitionId: number;
  problemId: number;
  score: number;
  maxScore: number;
  isComplete: boolean;
  submissionDate?: string;
}

export interface UserTeam {
  competitionId: number;
  teamId: number;
  role: "leader" | "member";
}

type Role = "admin" | "user";

interface User {
  id: string;
  name: string;
  firstName: string;
  username: string;
  email: string;
  role: Role;
  isOrganizer: boolean;
  isEmailSubscribed: boolean;
  kaggleUsername?: string;
  problemScores: ProblemScore[];
  avatarUrl?: string;
  bio?: string;
  teams: UserTeam[];
  streak?: number;
  activeDays?: number;
  joinedDate?: string;
  lastActive?: string;
  unsubscribeToken?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signUp: (
    firstName: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<{ error?: string; requiresEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  linkKaggle: (kaggleUsername: string) => Promise<void>;
  unlinkKaggle: () => Promise<void>;
  updateProblemScore: (
    competitionId: number,
    problemId: number,
    score: number,
    maxScore: number,
  ) => void;
  updateProfile: (updates: Partial<Pick<User, "name" | "avatarUrl" | "bio">>) => Promise<void>;
  setEmailSubscription: (subscribed: boolean) => Promise<{ error?: string }>;
  teamInvites: TeamInvite[];
  sendTeamInvite: (teamId: number, teamName: string, toUserId: string, competitionId: number) => void;
  acceptTeamInvite: (inviteId: number) => void;
  rejectTeamInvite: (inviteId: number) => void;
  createTeam: (competitionId: number, teamName: string) => number;
  joinTeam: (competitionId: number, teamId: number) => void;
  leaveTeam: (competitionId: number) => void;
}

type ProfileRow = {
  id: string;
  email: string;
  first_name: string;
  username: string;
  role: Role;
  is_email_subscribed: boolean;
  unsubscribe_token: string;
  avatar_url: string | null;
  bio: string | null;
  kaggle_username: string | null;
  created_at: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getUserDataKey(userId: string) {
  return `user_local_data:${userId}`;
}

function readUserLocalData(userId: string) {
  const raw = localStorage.getItem(getUserDataKey(userId));
  if (!raw) return { problemScores: [] as ProblemScore[], teams: [] as UserTeam[] };
  try {
    const parsed = JSON.parse(raw);
    return {
      problemScores: Array.isArray(parsed.problemScores) ? parsed.problemScores : [],
      teams: Array.isArray(parsed.teams) ? parsed.teams : [],
    };
  } catch {
    return { problemScores: [], teams: [] };
  }
}

function writeUserLocalData(userId: string, payload: { problemScores: ProblemScore[]; teams: UserTeam[] }) {
  localStorage.setItem(getUserDataKey(userId), JSON.stringify(payload));
}

function profileToUser(profile: ProfileRow): User {
  const local = readUserLocalData(profile.id);
  return {
    id: profile.id,
    name: profile.first_name,
    firstName: profile.first_name,
    username: profile.username,
    email: profile.email,
    role: profile.role,
    isOrganizer: profile.role === "admin",
    isEmailSubscribed: profile.is_email_subscribed,
    unsubscribeToken: profile.unsubscribe_token,
    avatarUrl: profile.avatar_url || undefined,
    bio: profile.bio || undefined,
    kaggleUsername: profile.kaggle_username || undefined,
    problemScores: local.problemScores,
    teams: local.teams,
    joinedDate: profile.created_at,
    lastActive: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);

  const refreshUserFromSession = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const sessionUser = sessionData.session?.user;

    if (!sessionUser) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sessionUser.id)
      .single<ProfileRow>();

    if (error || !profile) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setUser(profileToUser(profile));

    const provider = sessionUser.app_metadata?.provider;
    const sentKey = `oauth_welcome_sent:${sessionUser.id}`;
    if (provider === "google" && !localStorage.getItem(sentKey)) {
      localStorage.setItem(sentKey, "1");
      void supabase.functions
        .invoke("send-oauth-welcome", {
          body: {
            userId: sessionUser.id,
            email: profile.email,
            firstName: profile.first_name || profile.username,
            unsubscribeToken: profile.unsubscribe_token,
          },
        })
        .catch(() => {
          // optional in local development
        });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      await refreshUserFromSession();
      if (!isMounted) return;
    };

    initialize();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      void refreshUserFromSession();
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    const { data } = await supabase.auth.getUser();
    if (!data.user?.email_confirmed_at) {
      await supabase.auth.signOut();
      return { error: "Confirm your email before signing in." };
    }

    return {};
  };

  const signInWithGoogle = async () => {
    const redirectTo = `${window.location.origin}/signin`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) return { error: error.message };
    return {};
  };

  const signUp = async (firstName: string, username: string, email: string, password: string) => {
    const normalizedUsername = username.trim().toLowerCase();

    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", normalizedUsername)
      .maybeSingle();

    if (existingUsername) {
      return { error: "Username already taken." };
    }

    const redirectUrl = `${window.location.origin}/signin`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName.trim(),
          username: normalizedUsername,
        },
      },
    });

    if (error) return { error: error.message };
    return { requiresEmailConfirmation: true };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUserAndLocalData = (next: User) => {
    setUser(next);
    writeUserLocalData(next.id, {
      problemScores: next.problemScores,
      teams: next.teams,
    });
  };

  const linkKaggle = async (kaggleUsername: string) => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ kaggle_username: kaggleUsername.trim() })
      .eq("id", user.id);
    setUser({ ...user, kaggleUsername: kaggleUsername.trim() });
  };

  const unlinkKaggle = async () => {
    if (!user) return;
    await supabase.from("profiles").update({ kaggle_username: null }).eq("id", user.id);
    setUser({ ...user, kaggleUsername: undefined });
  };

  const updateProblemScore = (competitionId: number, problemId: number, score: number, maxScore: number) => {
    if (!user) return;
    const existingScoreIndex = user.problemScores.findIndex(
      (s) => s.competitionId === competitionId && s.problemId === problemId,
    );

    const newScore: ProblemScore = {
      competitionId,
      problemId,
      score,
      maxScore,
      isComplete: score >= maxScore,
      submissionDate: new Date().toISOString(),
    };

    const updatedScores = [...user.problemScores];
    if (existingScoreIndex >= 0) updatedScores[existingScoreIndex] = newScore;
    else updatedScores.push(newScore);

    updateUserAndLocalData({ ...user, problemScores: updatedScores });
  };

  const updateProfile = async (updates: Partial<Pick<User, "name" | "avatarUrl" | "bio">>) => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({
        first_name: updates.name ?? user.name,
        avatar_url: updates.avatarUrl ?? user.avatarUrl ?? null,
        bio: updates.bio ?? user.bio ?? null,
      })
      .eq("id", user.id);

    setUser({
      ...user,
      name: updates.name ?? user.name,
      firstName: updates.name ?? user.firstName,
      avatarUrl: updates.avatarUrl ?? user.avatarUrl,
      bio: updates.bio ?? user.bio,
    });
  };

  const setEmailSubscription = async (subscribed: boolean) => {
    if (!user) return { error: "Not authenticated." };
    const { error } = await supabase
      .from("profiles")
      .update({ is_email_subscribed: subscribed })
      .eq("id", user.id);

    if (error) return { error: error.message };
    setUser({ ...user, isEmailSubscribed: subscribed });
    return {};
  };

  const sendTeamInvite = (teamId: number, teamName: string, toUserId: string, competitionId: number) => {
    const invite: TeamInvite = {
      id: teamInvites.length + 1,
      teamId,
      teamName,
      fromUserId: user?.id || "",
      fromUsername: user?.name || "Unknown",
      toUserId,
      competitionId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setTeamInvites((prev) => [...prev, invite]);
  };

  const acceptTeamInvite = (inviteId: number) => {
    if (!user) return;
    const invite = teamInvites.find((i) => i.id === inviteId);
    if (!invite) return;
    updateUserAndLocalData({
      ...user,
      teams: [...user.teams, { competitionId: invite.competitionId, teamId: invite.teamId, role: "member" }],
    });
    setTeamInvites((prev) => prev.filter((i) => i.id !== inviteId));
  };

  const rejectTeamInvite = (inviteId: number) => {
    setTeamInvites((prev) => prev.filter((i) => i.id !== inviteId));
  };

  const createTeam = (competitionId: number, _teamName: string) => {
    if (!user) return 0;
    const teamId = Date.now();
    updateUserAndLocalData({
      ...user,
      teams: [...user.teams, { competitionId, teamId, role: "leader" }],
    });
    return teamId;
  };

  const joinTeam = (competitionId: number, teamId: number) => {
    if (!user) return;
    updateUserAndLocalData({
      ...user,
      teams: [...user.teams, { competitionId, teamId, role: "member" }],
    });
  };

  const leaveTeam = (competitionId: number) => {
    if (!user) return;
    updateUserAndLocalData({
      ...user,
      teams: user.teams.filter((t) => t.competitionId !== competitionId),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signInWithGoogle,
        signUp,
        signOut,
        linkKaggle,
        unlinkKaggle,
        updateProblemScore,
        updateProfile,
        setEmailSubscription,
        teamInvites,
        sendTeamInvite,
        acceptTeamInvite,
        rejectTeamInvite,
        createTeam,
        joinTeam,
        leaveTeam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
