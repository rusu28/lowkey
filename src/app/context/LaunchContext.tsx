import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

interface LaunchContextType {
  isLaunched: boolean;
  launchDate: Date;
  toggleLaunch: () => Promise<void>;
  canAccessFullSite: boolean;
  isLoading: boolean;
}

const LaunchContext = createContext<LaunchContextType | undefined>(undefined);

export function LaunchProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isLaunched, setIsLaunched] = useState(false);
  const [launchDate, setLaunchDate] = useState(new Date("2026-06-07T00:00:00Z"));
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = Boolean(user?.isOrganizer);
  const canAccessFullSite = isLaunched || isAdmin;

  const fetchLaunchSettings = async () => {
    const { data } = await supabase
      .from("launch_settings")
      .select("is_launched, launch_date")
      .eq("id", 1)
      .single<{ is_launched: boolean; launch_date: string }>();

    if (data) {
      setIsLaunched(data.is_launched);
      setLaunchDate(new Date(data.launch_date));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    void fetchLaunchSettings();

    const channel = supabase
      .channel("launch_settings_updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "launch_settings", filter: "id=eq.1" },
        () => {
          void fetchLaunchSettings();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const toggleLaunch = async () => {
    if (!isAdmin) return;

    const { error } = await supabase
      .from("launch_settings")
      .update({
        is_launched: !isLaunched,
        updated_by: user?.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (!error) {
      setIsLaunched((prev) => !prev);
    }
  };

  return (
    <LaunchContext.Provider value={{ isLaunched, launchDate, toggleLaunch, canAccessFullSite, isLoading }}>
      {children}
    </LaunchContext.Provider>
  );
}

export function useLaunch() {
  const context = useContext(LaunchContext);
  if (!context) throw new Error("useLaunch must be used within LaunchProvider");
  return context;
}
