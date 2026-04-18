import { Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { GlassCard } from "./ui/glass-card";
import { competitions } from "../data/competitions";
import { Search, Users, Calendar, Trophy, Plus, X, Filter, ArrowUpDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

export function CompetitionsList() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");

  let filteredCompetitions = competitions.filter((comp) => {
    const matchesSearch =
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "All" || comp.difficulty === selectedDifficulty;
    const matchesStatus =
      selectedStatus === "All" || comp.status === selectedStatus;
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  // Sorting
  filteredCompetitions = [...filteredCompetitions].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    if (sortBy === 'oldest') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    if (sortBy === 'popular') return b.participants - a.participants;
    if (sortBy === 'prize') return (b.prize === 'Knowledge' ? 0 : 1) - (a.prize === 'Knowledge' ? 0 : 1);
    return 0;
  });

  return (
    <div className="py-12 min-h-screen relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/40 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Explore Challenges</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              <span className="text-primary font-['Permanent_Marker']">All Competitions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse through {competitions.length}+ AI and machine learning challenges
            </p>
          </div>
          {user?.isOrganizer && (
            <Link to="/competitions/add">
              <Button className="gap-2 rounded-full px-6 h-12 bg-primary hover:bg-primary-dark transition-colors">
                <Plus size={18} />
                Add Competition
              </Button>
            </Link>
          )}
        </div>

        {/* Filters Section */}
        <GlassCard className="p-6 mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search competitions by title or description..."
              className="pl-14 pr-12 h-14 glass border-border/40 rounded-2xl transition-all duration-200 focus:ring-2 focus:ring-primary/20 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Difficulty Filter */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Filter size={14} />
                <span>Difficulty</span>
              </div>
              <div className="inline-flex glass rounded-2xl p-1.5 w-full">
                {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex-1 ${
                      selectedDifficulty === difficulty
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Calendar size={14} />
                <span>Status</span>
              </div>
              <div className="inline-flex glass rounded-2xl p-1.5 w-full">
                {["All", "upcoming", "ongoing", "ended"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize flex-1 ${
                      selectedStatus === status
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <ArrowUpDown size={14} />
                <span>Sort By</span>
              </div>
              <div className="inline-flex glass rounded-2xl p-1.5 w-full">
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'popular', label: 'Popular' },
                  { value: 'prize', label: 'Prize' },
                ].map((sort) => (
                  <button
                    key={sort.value}
                    onClick={() => setSortBy(sort.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex-1 ${
                      sortBy === sort.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count & Clear */}
          <AnimatePresence>
            {(selectedDifficulty !== "All" || selectedStatus !== "All" || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between text-sm pt-2"
              >
                <span className="text-muted-foreground font-medium">
                  {filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? 's' : ''} found
                </span>
                <button
                  onClick={() => {
                    setSelectedDifficulty("All");
                    setSelectedStatus("All");
                    setSearchQuery("");
                    setSortBy("newest");
                  }}
                  className="text-primary hover:underline transition-all duration-200 font-medium flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {filteredCompetitions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard className="p-20 text-center">
                <Search size={64} className="mx-auto mb-6 text-muted-foreground opacity-40" />
                <h3 className="text-2xl font-bold mb-2">No competitions found</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedDifficulty("All");
                    setSelectedStatus("All");
                    setSearchQuery("");
                    setSortBy("newest");
                  }}
                  className="rounded-full"
                >
                  Reset Filters
                </Button>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {filteredCompetitions.map((competition, index) => (
                <motion.div
                  key={competition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={`/competitions/${competition.id}`}
                    className="group block h-full"
                  >
                    <GlassCard className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                      {competition.backgroundImage && (
                        <div className="h-56 overflow-hidden bg-muted relative">
                          <img
                            src={competition.backgroundImage}
                            alt={competition.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="text-xs px-3 py-1.5 glass rounded-full font-semibold backdrop-blur-md">
                              {competition.difficulty}
                            </span>
                            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-md ${
                              competition.status === "ongoing"
                                ? "bg-success/90 text-white"
                                : competition.status === "upcoming"
                                ? "bg-primary/90 text-white"
                                : "glass"
                            }`}>
                              {competition.status}
                            </span>
                          </div>
                          {competition.prize !== "Knowledge" && (
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1.5 bg-warning text-warning-foreground rounded-full font-semibold text-xs flex items-center gap-1.5">
                                <Trophy size={12} />
                                {competition.prize}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-8 space-y-5">
                        <div>
                          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {competition.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                            {competition.shortDescription}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {competition.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1.5 glass rounded-full hover:bg-primary/10 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                          {competition.tags.length > 4 && (
                            <span className="text-xs px-3 py-1.5 text-muted-foreground font-medium">
                              +{competition.tags.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm pt-5 border-t border-border/40">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users size={16} />
                            <span className="font-medium">{competition.participants.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar size={16} />
                            <span className="font-medium">{format(new Date(competition.endDate), "MMM d, yyyy")}</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
