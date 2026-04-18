import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Users, User, Shuffle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

interface JoinCompetitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competition: {
    id: number;
    title: string;
    isTeamCompetition: boolean;
    minTeamSize: number;
    maxTeamSize: number;
  };
}

export function JoinCompetitionDialog({
  open,
  onOpenChange,
  competition,
}: JoinCompetitionDialogProps) {
  const { user, createTeam, joinTeam } = useAuth();
  const [joinMode, setJoinMode] = useState<"solo" | "create" | "random">("solo");
  const [teamName, setTeamName] = useState("");

  const handleJoin = () => {
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    if (competition.isTeamCompetition) {
      if (joinMode === "solo") {
        if (competition.minTeamSize > 1) {
          toast.error(`This competition requires teams of ${competition.minTeamSize}-${competition.maxTeamSize} members`);
          return;
        }
        // Join as solo
        const teamId = createTeam(competition.id, `${user.name}'s Team`);
        toast.success("Joined competition as solo participant!");
      } else if (joinMode === "create") {
        if (!teamName.trim()) {
          toast.error("Please enter a team name");
          return;
        }
        // Create team
        const teamId = createTeam(competition.id, teamName);
        toast.success(`Team "${teamName}" created! You can now invite members.`);
      } else if (joinMode === "random") {
        // Join random team
        // In a real app, this would find an open team or create a waiting list
        const randomTeamId = Math.floor(Math.random() * 1000);
        joinTeam(competition.id, randomTeamId);
        toast.success("Joined a random team! Check the Teams tab to see your teammates.");
      }
    } else {
      // Individual competition
      toast.success("Joined competition successfully!");
    }

    onOpenChange(false);
  };

  if (!competition.isTeamCompetition) {
    // Simple join for individual competitions
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join {competition.title}</DialogTitle>
            <DialogDescription>
              This is an individual competition. You'll compete on your own.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you ready to participate in this competition?
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleJoin}>Join Competition</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Team competition join dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Join {competition.title}</DialogTitle>
          <DialogDescription>
            This is a team competition ({competition.minTeamSize}-{competition.maxTeamSize} members).
            Choose how you want to participate.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <RadioGroup value={joinMode} onValueChange={(v) => setJoinMode(v as any)}>
            {/* Solo Option - Only if min team size is 1 */}
            {competition.minTeamSize === 1 && (
              <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="solo" id="solo" className="mt-1" />
                <Label htmlFor="solo" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <User size={18} />
                    <span className="font-semibold">Compete Solo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Participate individually without a team
                  </p>
                </Label>
              </div>
            )}

            {/* Create Team Option */}
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="create" id="create" className="mt-1" />
              <Label htmlFor="create" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={18} />
                  <span className="font-semibold">Create New Team</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Start your own team and invite members
                </p>
                {joinMode === "create" && (
                  <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                    <Label htmlFor="teamName" className="text-sm">Team Name</Label>
                    <Input
                      id="teamName"
                      placeholder="Enter your team name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                )}
              </Label>
            </div>

            {/* Join Random Team Option */}
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="random" id="random" className="mt-1" />
              <Label htmlFor="random" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <Shuffle size={18} />
                  <span className="font-semibold">Join Random Team</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get matched with other participants looking for teams
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Note: You might not get a team immediately, but we'll do our best to match you!
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleJoin}>
            {joinMode === "solo" && "Join Solo"}
            {joinMode === "create" && "Create Team & Join"}
            {joinMode === "random" && "Find Team"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
