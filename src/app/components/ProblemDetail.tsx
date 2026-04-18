import { useParams, Link } from "react-router";
import { competitions } from "../data/competitions";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Upload, FileText, CheckCircle2, Circle, BookOpen } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuth } from "../context/AuthContext";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { format } from "date-fns";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";

export function ProblemDetail() {
  const { id, problemId } = useParams();
  const competition = competitions.find((c) => c.id === Number(id));
  const problem = competition?.problems.find((p) => p.id === Number(problemId));
  const { user, updateProblemScore } = useAuth();

  if (!competition || !problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl mb-2">Problem Not Found</h2>
          <p className="text-muted-foreground mb-4">The problem you're looking for doesn't exist.</p>
          <Link to="/competitions">
            <Button>View All Competitions</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getProblemScore = () => {
    if (!user) return null;
    return user.problemScores.find(
      s => s.competitionId === competition.id && s.problemId === problem.id
    );
  };

  const score = getProblemScore();
  const maxScore = problem.subtasks?.reduce((sum, st) => sum + st.points, 0) || 100;

  const handleSimulateSubmission = () => {
    if (!user) {
      toast.error("Please sign in to submit solutions");
      return;
    }

    if (!user.kaggleUsername) {
      toast.error("Please link your Kaggle account in Settings to submit solutions");
      return;
    }

    // Simulate a score (random between 60% and 100% of max score)
    const simulatedScore = Math.floor(Math.random() * (maxScore - maxScore * 0.6) + maxScore * 0.6);

    updateProblemScore(competition.id, problem.id, simulatedScore, maxScore);

    toast.success(`Submission scored ${simulatedScore}/${maxScore} points!`);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={`/competitions/${competition.id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to {competition.title}
          </Link>

          <Card className="p-8 md:p-12 mb-6 border-border/40">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl mb-4 tracking-tight">{problem.title}</h1>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="rounded-full">
                    {maxScore} points
                  </Badge>
                  {problem.subtasks && problem.subtasks.length > 0 && (
                    <Badge variant="secondary" className="rounded-full">
                      {problem.subtasks.length} subtasks
                    </Badge>
                  )}
                </div>
              </div>

              {score && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-right"
                >
                  {score.isComplete ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-2">
                      <CheckCircle2 size={14} className="mr-1" />
                      Complete
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="mb-2">
                      <Circle size={14} className="mr-1" />
                      Partial
                    </Badge>
                  )}
                  <div className="text-2xl font-semibold mb-1">
                    {score.score}/{score.maxScore}
                  </div>
                  <Progress value={(score.score / score.maxScore) * 100} className="h-2 w-32" />
                  {score.submissionDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(new Date(score.submissionDate), "MMM d, HH:mm")}
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            <Tabs defaultValue="problem" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="problem" className="gap-2">
                  <FileText size={16} />
                  Problem
                </TabsTrigger>
                <TabsTrigger value="submit" className="gap-2">
                  <Upload size={16} />
                  Submit
                </TabsTrigger>
                <TabsTrigger value="editorial" className="gap-2">
                  <BookOpen size={16} />
                  Editorial
                </TabsTrigger>
              </TabsList>

              <TabsContent value="problem" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <MarkdownRenderer content={problem.content} />
                </motion.div>

                {problem.subtasks && problem.subtasks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <h2 className="text-2xl mb-4">Subtasks</h2>
                    <div className="grid gap-4">
                      {problem.subtasks.map((subtask, index) => (
                        <motion.div
                          key={subtask.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        >
                          <Card className="p-6 border-border/40">
                            <div className="flex items-start gap-4">
                              <span className="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-sm font-semibold shrink-0">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-semibold">{subtask.name}</h3>
                                  <Badge variant="outline" className="rounded-full">
                                    {subtask.points} pts
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground">
                                  {subtask.description}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="submit" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card className="p-8 border-border/40 bg-muted/30">
                    <h2 className="text-2xl mb-4">Submit Your Solution</h2>
                    <p className="text-muted-foreground mb-6">
                      Upload your solution file or connect with Kaggle to submit directly to the competition.
                    </p>

                    {score && (
                      <div className="mb-6 p-4 bg-background rounded-xl border border-border/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Current Best Score</span>
                          <span className="text-muted-foreground">
                            {score.score} / {score.maxScore} points ({Math.round((score.score / score.maxScore) * 100)}%)
                          </span>
                        </div>
                        <Progress value={(score.score / score.maxScore) * 100} className="h-2" />
                      </div>
                    )}

                    <Button
                      onClick={handleSimulateSubmission}
                      size="lg"
                      className="gap-2 w-full md:w-auto"
                      disabled={!user?.kaggleUsername}
                    >
                      <Upload size={18} />
                      {user?.kaggleUsername ? "Submit Solution (Demo)" : "Link Kaggle to Submit"}
                    </Button>

                    {!user?.kaggleUsername && (
                      <p className="text-sm text-muted-foreground mt-4">
                        Please <Link to="/settings" className="text-primary hover:underline">link your Kaggle account</Link> to submit solutions.
                      </p>
                    )}
                  </Card>

                  <Card className="p-6 border-border/40">
                    <h3 className="text-lg font-semibold mb-3">Submission Guidelines</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Submissions are evaluated automatically</li>
                      <li>• You can submit multiple times - your best score counts</li>
                      <li>• Partial credit is awarded for subtasks</li>
                      <li>• Results are available immediately after submission</li>
                    </ul>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="editorial" className="space-y-6">
                {user ? (
                  problem.editorial ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-8 border-border/40">
                        <h2 className="text-2xl mb-6">Editorial</h2>
                        <MarkdownRenderer content={problem.editorial} />
                      </Card>
                    </motion.div>
                  ) : (
                    <Card className="p-12 text-center border-border/40">
                      <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-xl mb-2">Editorial Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        The editorial for this problem will be published after the competition ends.
                      </p>
                    </Card>
                  )
                ) : (
                  <Card className="p-12 text-center border-border/40">
                    <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-xl mb-2">Sign In to View Editorial</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Create an account or sign in to access detailed solutions and approaches.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Link to="/signup">
                        <Button>Sign Up</Button>
                      </Link>
                      <Link to="/signin">
                        <Button variant="outline">Sign In</Button>
                      </Link>
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
