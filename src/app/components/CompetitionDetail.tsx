import { useParams, Link } from "react-router";
import { competitions } from "../data/competitions";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ExternalLink, Users, Calendar, Trophy, ArrowLeft, Lock, Clock, Play, CheckCircle2, Circle, Upload, UserPlus, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuth } from "../context/AuthContext";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { format, isPast, isFuture } from "date-fns";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import { useState } from "react";
import { JoinCompetitionDialog } from "./JoinCompetitionDialog";

export function CompetitionDetail() {
  const { id } = useParams();
  const competition = competitions.find((c) => c.id === Number(id));
  const { user, updateProblemScore } = useAuth();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  if (!competition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl mb-2">Competition Not Found</h2>
          <p className="text-muted-foreground mb-4">The competition you're looking for doesn't exist.</p>
          <Link to="/competitions">
            <Button>View All Competitions</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const hasStarted = isPast(new Date(competition.startDate));
  const hasEnded = isPast(new Date(competition.endDate));
  const canViewProblems = hasStarted && user;

  const handleJoin = () => {
    if (!user) {
      toast.error("Please sign in to join the competition");
      return;
    }
    toast.success("Joined competition successfully!");
  };

  const getProblemScore = (problemId: number) => {
    if (!user) return null;
    return user.problemScores.find(
      s => s.competitionId === competition.id && s.problemId === problemId
    );
  };

  const handleSimulateSubmission = (problemId: number) => {
    if (!user) {
      toast.error("Please sign in to submit solutions");
      return;
    }

    if (!user.kaggleUsername) {
      toast.error("Please link your Kaggle account in Settings to submit solutions");
      return;
    }

    // Calculate total points from subtasks
    const problem = competition.problems.find(p => p.id === problemId);
    if (!problem) return;

    const maxScore = problem.subtasks?.reduce((sum, st) => sum + st.points, 0) || 100;

    // Simulate a score (random between 60% and 100% of max score)
    const simulatedScore = Math.floor(Math.random() * (maxScore - maxScore * 0.6) + maxScore * 0.6);

    updateProblemScore(competition.id, problemId, simulatedScore, maxScore);

    toast.success(`Submission scored ${simulatedScore}/${maxScore} points!`);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Back Button */}
        <Link to="/competitions" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Competitions
        </Link>

        {/* Header with Background */}
        {competition.backgroundImage && (
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-6">
            <img
              src={competition.backgroundImage}
              alt={competition.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl text-white text-center px-4">
                {competition.title}
              </h1>
            </div>
          </div>
        )}

        {/* Info Card */}
        <Card className="p-8 md:p-12 mb-6 border-border/40">
          {!competition.backgroundImage && (
            <h1 className="text-4xl md:text-5xl mb-6 tracking-tight">{competition.title}</h1>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="outline" className="rounded-full">{competition.difficulty}</Badge>
            <Badge variant={
              competition.status === "ongoing" ? "default" :
              competition.status === "upcoming" ? "secondary" : "outline"
            } className="rounded-full">
              {competition.status.toUpperCase()}
            </Badge>
            {competition.prize !== "Knowledge" && (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                <Trophy size={12} className="mr-1" />
                {competition.prize}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{competition.participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>
                {format(new Date(competition.startDate), "MMM d, yyyy")} - {format(new Date(competition.endDate), "MMM d, yyyy")}
              </span>
            </div>
            {competition.duration && (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{competition.duration}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {competition.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-muted rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Join Button */}
          {competition.status !== "ended" && (
            <Button size="lg" className="gap-2 rounded-full px-8" onClick={() => setJoinDialogOpen(true)}>
              <Play size={18} />
              {hasStarted ? "Join Competition" : "Register for Competition"}
            </Button>
          )}
        </Card>

        {/* Content Tabs */}
        <Card className="p-8 border-border/40">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className={`grid w-full ${competition.isTeamCompetition ? 'grid-cols-6' : 'grid-cols-5'} mb-8 bg-muted/50 p-1 rounded-2xl`}>
              <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
              <TabsTrigger value="problems" className="rounded-xl gap-2">
                Problems
                {!canViewProblems && <Lock size={14} />}
              </TabsTrigger>
              {competition.isTeamCompetition && (
                <TabsTrigger value="teams" className="rounded-xl">
                  Teams
                </TabsTrigger>
              )}
              <TabsTrigger value="rules" className="rounded-xl">Rules</TabsTrigger>
              <TabsTrigger value="announcements" className="rounded-xl gap-2">
                Announcements
                {competition.announcements.length > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {competition.announcements.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="editorial" className="rounded-xl gap-2">
                Editorial
                {!user && <Lock size={14} />}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl mb-4">About This Competition</h2>
                <MarkdownRenderer content={competition.fullDescription} />
              </div>

              {competition.organizerNotes && (
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="mb-2">Organizer Notes</h3>
                  <MarkdownRenderer content={competition.organizerNotes} />
                </div>
              )}

              <div>
                <h3 className="text-xl mb-3">Evaluation Metrics</h3>
                <MarkdownRenderer content={competition.metrics} />
              </div>
            </TabsContent>

            <TabsContent value="problems" className="space-y-4">
              {canViewProblems ? (
                <div className="grid gap-4">
                  {competition.problems.map((problem, index) => {
                    const score = getProblemScore(problem.id);
                    const maxScore = problem.subtasks?.reduce((sum, st) => sum + st.points, 0) || 100;

                    return (
                      <Link
                        key={problem.id}
                        to={`/competitions/${competition.id}/problems/${problem.id}`}
                        className="block group"
                      >
                        <Card className="p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-border/40 hover:border-border">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <span className="w-10 h-10 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-sm font-semibold shrink-0">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <h3 className="text-xl mb-2 group-hover:text-primary transition-colors duration-200">
                                  {problem.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {problem.content.substring(0, 150)}...
                                </p>

                                {problem.subtasks && problem.subtasks.length > 0 && (
                                  <div className="flex items-center gap-2 mt-3">
                                    <span className="text-xs text-muted-foreground">
                                      {problem.subtasks.length} subtasks · {maxScore} points
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              {score && (
                                <>
                                  {score.isComplete ? (
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                      <CheckCircle2 size={12} className="mr-1" />
                                      Complete
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary">
                                      <Circle size={12} className="mr-1" />
                                      Partial
                                    </Badge>
                                  )}
                                  <div className="text-sm text-muted-foreground">
                                    {score.score}/{score.maxScore}
                                  </div>
                                  <Progress value={(score.score / score.maxScore) * 100} className="h-1.5 w-24" />
                                </>
                              )}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                    <Lock size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl mb-2">
                    {!user ? "Sign In Required" : "Competition Not Started"}
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {!user
                      ? "Please sign in to view competition problems."
                      : `This competition starts on ${format(new Date(competition.startDate), "MMMM d, yyyy")}.`}
                  </p>
                  {!user && (
                    <div className="flex gap-3 justify-center">
                      <Link to="/signup">
                        <Button>Sign Up</Button>
                      </Link>
                      <Link to="/signin">
                        <Button variant="outline">Sign In</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {competition.isTeamCompetition && (
              <TabsContent value="teams" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl">Teams & Invites</h2>
                  <p className="text-muted-foreground">
                    This is a team competition with {competition.minTeamSize}-{competition.maxTeamSize} members per team.
                  </p>
                </div>

                {/* Mock Teams List */}
                <div className="space-y-4">
                  <h3 className="text-xl">Top Teams</h3>
                  <div className="grid gap-4">
                    {[
                      { id: 1, name: "ML Masters", members: 4, score: 982, rank: 1 },
                      { id: 2, name: "Data Wizards", members: 3, score: 954, rank: 2 },
                      { id: 3, name: "AI Ninjas", members: 5, score: 931, rank: 3 },
                      { id: 4, name: "Code Crushers", members: 2, score: 915, rank: 4 },
                      { id: 5, name: "Neural Network", members: 4, score: 892, rank: 5 },
                    ].map((team) => (
                      <Card key={team.id} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full font-bold">
                              #{team.rank}
                            </div>
                            <div>
                              <h4 className="font-semibold">{team.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users size={14} />
                                <span>{team.members} members</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{team.score} pts</div>
                            <div className="text-sm text-muted-foreground">Total Score</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Pending Invites - Only shown if user is logged in */}
                {user && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl">Pending Invites</h3>
                      <Badge variant="secondary">2 pending</Badge>
                    </div>
                    <div className="grid gap-4">
                      {[
                        { id: 1, teamName: "Data Wizards", from: "john_doe", date: "2026-04-08" },
                        { id: 2, teamName: "AI Ninjas", from: "jane_smith", date: "2026-04-07" },
                      ].map((invite) => (
                        <Card key={invite.id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <Mail size={20} className="mt-1 text-muted-foreground" />
                              <div>
                                <h4 className="font-semibold mb-1">
                                  Invitation to join "{invite.teamName}"
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  From <span className="font-medium">{invite.from}</span> · {format(new Date(invite.date), "MMM d, yyyy")}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Decline
                              </Button>
                              <Button size="sm">
                                Accept
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            )}

            <TabsContent value="rules" className="space-y-4">
              <MarkdownRenderer content={competition.rules} />
            </TabsContent>

            <TabsContent value="announcements" className="space-y-4">
              {competition.announcements.length > 0 ? (
                <div className="space-y-4">
                  {competition.announcements.map((announcement) => (
                    <Card key={announcement.id} className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3>{announcement.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(announcement.date), "MMM d, yyyy")}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{announcement.content}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No announcements yet.
                </div>
              )}
            </TabsContent>

            <TabsContent value="editorial" className="space-y-4">
              {user ? (
                competition.editorial ? (
                  <div>
                    <h2 className="text-2xl mb-4">Editorial & Winning Solutions</h2>
                    <MarkdownRenderer content={competition.editorial} />
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Editorial will be published after the competition ends.
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                    <Lock size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl mb-2">Sign In to View Editorial</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Create an account or sign in to access detailed solutions and winning approaches.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link to="/signup">
                      <Button>Sign Up</Button>
                    </Link>
                    <Link to="/signin">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Join Competition Dialog */}
        <JoinCompetitionDialog
          open={joinDialogOpen}
          onOpenChange={setJoinDialogOpen}
          competition={{
            id: competition.id,
            title: competition.title,
            isTeamCompetition: competition.isTeamCompetition,
            minTeamSize: competition.minTeamSize,
            maxTeamSize: competition.maxTeamSize,
          }}
        />
      </div>
    </div>
  );
}