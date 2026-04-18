import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Trash2, Save, Eye, EyeOff, Sparkles, Wand2, Code2, FileText, Award, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { motion, AnimatePresence } from "motion/react";

interface Problem {
  id: number;
  title: string;
  content: string;
}

interface Rule {
  title: string;
  description: string;
}

const predefinedRules: Rule[] = [
  { title: "Team Size", description: "Maximum 5 members per team" },
  { title: "Submissions", description: "Maximum 5 submissions per day" },
  { title: "External Data", description: "No external data allowed" },
  { title: "Code Sharing", description: "You may share code, but not predictions" },
];

export function AddCompetition() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    startDate: "",
    endDate: "",
    prize: "",
    tags: "",
    backgroundImage: "",
  });

  const [problems, setProblems] = useState<Problem[]>([
    { id: 1, title: "Problem 1", content: "" },
  ]);

  const [rules, setRules] = useState<Rule[]>([...predefinedRules]);
  const [metrics, setMetrics] = useState("");
  const [announcements, setAnnouncements] = useState("");
  const [editorial, setEditorial] = useState("");

  if (!user?.isOrganizer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl mb-2">Organizer Access Required</h2>
          <p className="text-muted-foreground mb-4">
            You need organizer permissions to add competitions.
          </p>
          <Button onClick={() => navigate("/competitions")}>
            Back to Competitions
          </Button>
        </Card>
      </div>
    );
  }

  const addProblem = () => {
    setProblems([
      ...problems,
      { id: problems.length + 1, title: `Problem ${problems.length + 1}`, content: "" },
    ]);
  };

  const removeProblem = (id: number) => {
    setProblems(problems.filter((p) => p.id !== id));
  };

  const updateProblem = (id: number, field: "title" | "content", value: string) => {
    setProblems(problems.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addRule = () => {
    setRules([...rules, { title: "", description: "" }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, field: "title" | "description", value: string) => {
    setRules(rules.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Competition data:", {
      ...formData,
      problems,
      rules,
      metrics,
      announcements,
      editorial,
    });
    toast.success("Competition created successfully!");
    navigate("/competitions");
  };

  return (
    <div className="py-12 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <motion.div
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Sparkles className="text-primary" size={32} />
                </motion.div>
                <h1 className="text-4xl">Add New Competition</h1>
              </motion.div>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Create a new AI/ML competition with advanced features
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className="gap-2 border-2 border-dashed"
              >
                {previewMode ? <EyeOff size={18} /> : <Eye size={18} />}
                {previewMode ? "Edit Mode" : "Preview Mode"}
              </Button>
            </motion.div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <TabsList className="grid w-full grid-cols-5 p-1.5 bg-muted/50 border-2 border-dashed rounded-lg">
                  <TabsTrigger value="basic" className="gap-2 data-[state=active]:bg-background">
                    <FileText size={16} />
                    <span className="hidden sm:inline">Basic Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="problems" className="gap-2 data-[state=active]:bg-background">
                    <Code2 size={16} />
                    <span className="hidden sm:inline">Problems</span>
                  </TabsTrigger>
                  <TabsTrigger value="rules" className="gap-2 data-[state=active]:bg-background">
                    <Award size={16} />
                    <span className="hidden sm:inline">Rules</span>
                  </TabsTrigger>
                  <TabsTrigger value="content" className="gap-2 data-[state=active]:bg-background">
                    <Wand2 size={16} />
                    <span className="hidden sm:inline">Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-background">
                    <Eye size={16} />
                    <span className="hidden sm:inline">Preview</span>
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              {/* Basic Information */}
              <TabsContent value="basic">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-6 space-y-4 border-2 border-dashed relative overflow-hidden">
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-tr-full" />
                  <div className="space-y-2">
                    <Label htmlFor="title">Competition Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., House Prices Prediction Challenge"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Textarea
                      id="shortDescription"
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Brief description for the competitions list page"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">
                      Full Description (Markdown/LaTeX supported) *
                    </Label>
                    <Textarea
                      id="fullDescription"
                      rows={8}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="# Competition Overview&#10;&#10;Detailed description with **markdown** and $\\LaTeX$ formulas...&#10;&#10;$$&#10;E = mc^2&#10;$$"
                      required
                    />
                    {formData.fullDescription && (
                      <div className="border rounded-lg p-4 bg-background">
                        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                        <MarkdownRenderer content={formData.fullDescription} />
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty *</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prize">Prize</Label>
                      <Input
                        id="prize"
                        value={formData.prize}
                        onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                        placeholder="e.g., $10,000 or Knowledge"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g., Regression, Feature Engineering, Ensemble"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backgroundImage">Background Image URL</Label>
                    <Input
                      id="backgroundImage"
                      type="url"
                      value={formData.backgroundImage}
                      onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </Card>
                </motion.div>
              </TabsContent>

              {/* Problems */}
              <TabsContent value="problems">
                <Card className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-1">Competition Problems</h3>
                      <p className="text-sm text-muted-foreground">
                        Add one or more problems for this competition
                      </p>
                    </div>
                    <Button type="button" onClick={addProblem} className="gap-2">
                      <Plus size={18} />
                      Add Problem
                    </Button>
                  </div>

                  {problems.map((problem, index) => (
                    <Card key={problem.id} className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4>Problem {index + 1}</h4>
                        {problems.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProblem(problem.id)}
                          >
                            <Trash2 size={18} className="text-destructive" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Problem Title</Label>
                        <Input
                          value={problem.title}
                          onChange={(e) => updateProblem(problem.id, "title", e.target.value)}
                          placeholder="e.g., Predict House Prices"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Problem Content (Markdown/LaTeX)</Label>
                        <Textarea
                          rows={10}
                          value={problem.content}
                          onChange={(e) => updateProblem(problem.id, "content", e.target.value)}
                          placeholder="# Problem Description&#10;&#10;Your task is to...&#10;&#10;## Evaluation&#10;&#10;$$&#10;RMSE = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2}&#10;$$"
                        />
                      </div>

                      {problem.content && (
                        <div className="border rounded-lg p-4 bg-background">
                          <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                          <MarkdownRenderer content={problem.content} />
                        </div>
                      )}
                    </Card>
                  ))}
                </Card>
              </TabsContent>

              {/* Rules & Metrics */}
              <TabsContent value="rules">
                <div className="space-y-6">
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-1">Competition Rules</h3>
                        <p className="text-sm text-muted-foreground">
                          Customize predefined rules or add your own
                        </p>
                      </div>
                      <Button type="button" onClick={addRule} size="sm" className="gap-2">
                        <Plus size={16} />
                        Add Rule
                      </Button>
                    </div>

                    {rules.map((rule, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1 grid md:grid-cols-2 gap-4">
                          <Input
                            value={rule.title}
                            onChange={(e) => updateRule(index, "title", e.target.value)}
                            placeholder="Rule title"
                          />
                          <Input
                            value={rule.description}
                            onChange={(e) => updateRule(index, "description", e.target.value)}
                            placeholder="Rule description"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRule(index)}
                        >
                          <Trash2 size={18} className="text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div>
                      <h3 className="mb-1">Evaluation Metrics</h3>
                      <p className="text-sm text-muted-foreground">
                        Describe how submissions will be evaluated (Markdown/LaTeX)
                      </p>
                    </div>

                    <Textarea
                      rows={8}
                      value={metrics}
                      onChange={(e) => setMetrics(e.target.value)}
                      placeholder="# Evaluation&#10;&#10;Submissions are evaluated using:&#10;&#10;$$&#10;Score = \\frac{TP + TN}{TP + TN + FP + FN}&#10;$$"
                    />

                    {metrics && (
                      <div className="border rounded-lg p-4 bg-background">
                        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                        <MarkdownRenderer content={metrics} />
                      </div>
                    )}
                  </Card>
                </div>
              </TabsContent>

              {/* Additional Content */}
              <TabsContent value="content">
                <div className="space-y-6">
                  <Card className="p-6 space-y-4">
                    <div>
                      <h3 className="mb-1">Announcements</h3>
                      <p className="text-sm text-muted-foreground">
                        Important updates for participants (Markdown)
                      </p>
                    </div>

                    <Textarea
                      rows={6}
                      value={announcements}
                      onChange={(e) => setAnnouncements(e.target.value)}
                      placeholder="## Launch Announcement&#10;&#10;Competition is now live! Good luck to all participants."
                    />
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div>
                      <h3 className="mb-1">Editorial (Optional)</h3>
                      <p className="text-sm text-muted-foreground">
                        Solution approaches and winning strategies (Markdown/LaTeX)
                      </p>
                    </div>

                    <Textarea
                      rows={10}
                      value={editorial}
                      onChange={(e) => setEditorial(e.target.value)}
                      placeholder="# Winning Solution&#10;&#10;## Approach&#10;&#10;The winning solution used...&#10;&#10;$$&#10;prediction = 0.5 \\times model_1 + 0.5 \\times model_2&#10;$$"
                    />

                    {editorial && (
                      <div className="border rounded-lg p-4 bg-background">
                        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                        <MarkdownRenderer content={editorial} />
                      </div>
                    )}
                  </Card>
                </div>
              </TabsContent>

              {/* Preview */}
              <TabsContent value="preview">
                <Card className="p-6">
                  <h3 className="text-2xl mb-4">Competition Preview</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-2">Title</h4>
                      <p className="text-2xl">{formData.title || "Untitled Competition"}</p>
                    </div>

                    <div>
                      <h4 className="mb-2">Short Description</h4>
                      <p className="text-muted-foreground">
                        {formData.shortDescription || "No description provided"}
                      </p>
                    </div>

                    {formData.fullDescription && (
                      <div>
                        <h4 className="mb-2">Full Description</h4>
                        <MarkdownRenderer content={formData.fullDescription} />
                      </div>
                    )}

                    <div>
                      <h4 className="mb-2">Problems ({problems.length})</h4>
                      {problems.map((p, i) => (
                        <div key={p.id} className="mb-2">
                          <strong>Problem {i + 1}:</strong> {p.title}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="mb-2">Rules ({rules.length})</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {rules.map((r, i) => (
                          <li key={i}>
                            <strong>{r.title}:</strong> {r.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4 justify-end mt-6">
              <Button type="button" variant="outline" onClick={() => navigate("/competitions")}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save size={18} />
                Create Competition
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
