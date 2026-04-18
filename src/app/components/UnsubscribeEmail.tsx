import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";

export function UnsubscribeEmail() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const token = useMemo(() => params.get("p"), [params]);

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      setStatus("working");

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ is_email_subscribed: false })
        .eq("unsubscribe_token", token);

      const { error: newsletterError } = await supabase
        .from("newsletter_subscriptions")
        .update({ is_subscribed: false })
        .eq("unsubscribe_token", token);

      if (profileError && newsletterError) {
        setStatus("error");
        return;
      }

      setStatus("done");
    };

    void run();
  }, [token]);

  return (
    <div className="py-12 min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full p-8 text-center space-y-4">
        <h1 className="text-3xl">Email Preferences</h1>
        {!token && <p className="text-muted-foreground">Missing unsubscribe token.</p>}
        {status === "working" && <p className="text-muted-foreground">Updating preferences...</p>}
        {status === "done" && <p className="text-muted-foreground">You have been unsubscribed successfully.</p>}
        {status === "error" && <p className="text-destructive">Could not update subscription for this token.</p>}
        <div className="pt-2">
          <Button asChild>
            <a href="/">Go to Home</a>
          </Button>
        </div>
      </Card>
    </div>
  );
}
