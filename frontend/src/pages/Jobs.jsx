import { useResults } from "@/content/ResultsContext";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const Jobs = () => {
  const { results } = useResults();
  const jobRecommendations = results?.top_jobs || [];

  const getMatchColor = (match) => {
    const value = parseInt(match.replace("%", ""));
    if (value >= 90) return "text-green-600";
    if (value >= 80) return "text-blue-600";
    if (value >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Job Recommendations
        </h1>
        <p className="text-xl text-muted-foreground">
          AI-matched opportunities based on your skills
        </p>
      </div>

      <div className="space-y-6">
        {jobRecommendations.map((job, index) => (
          <Card key={index} className="job-card">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {job.title}
                </h3>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getMatchColor(job.match)}`}>
                  {job.match}
                </div>
                <div className="text-sm text-muted-foreground">Match</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              Skills matched for this job:
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.expected_skills?.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="skill-card">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                className="flex items-center space-x-2"
                onClick={() => window.open(job.url, "_blank")}
              >
                <span>View Job</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
