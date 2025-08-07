import { useResults } from "@/content/ResultsContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Target, Award, Download } from "lucide-react";

const Summary = () => {
  const { results } = useResults();

  const resumeScore = results?.resume_score || 0;
  const technicalSkills = results?.extracted_skills || [];
  const flatSkills = results?.extracted_skills || [];
  const jobMatches = results?.top_jobs?.length || 0;
  const recommendedCourses = (results?.top_jobs || []).flatMap(job => job.recommended_courses || []);
  const resumeFeedback = results?.resume_feedback || "";

  const nextSteps = [
    `Apply to ${jobMatches >= 3 ? 3 : jobMatches} high-match jobs`,
    `Learn ${recommendedCourses.map((c) => c.skill).join(", ") || "new tech skills"}`,
    "Update resume using the feedback provided"
  ];

  const handleDownload = () => {
    const blob = new Blob([resumeFeedback], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume_feedback.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Career Summary</h1>
        <p className="text-xl text-muted-foreground">
          Your comprehensive AI-powered career analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 glass-card text-center">
          <Award className="h-8 w-8 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground">{resumeScore}</div>
          <div className="text-muted-foreground">Resume Score</div>
        </Card>

        <Card className="p-6 glass-card text-center">
          <Target className="h-8 w-8 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground">{jobMatches}</div>
          <div className="text-muted-foreground">Matched Jobs</div>
        </Card>

        <Card className="p-6 glass-card text-center">
          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground">{recommendedCourses.length}</div>
          <div className="text-muted-foreground">Recommended Courses</div>
        </Card>

        <Card className="p-6 glass-card text-center">
          <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
          <div className="text-lg font-bold text-foreground">Based on Analysis</div>
          <div className="text-muted-foreground">Career Level</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">Top Skills</h3>
          <div className="flex flex-col gap-2">
            {flatSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="skill-card w-fit">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">Key Strengths</h3>
          <ul className="space-y-2">
            {technicalSkills.length > 0 ? (
              technicalSkills.map((skill, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{skill}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No strengths identified yet.</li>
            )}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">Areas for Improvement</h3>
          {resumeFeedback ? (
            <p className="text-muted-foreground whitespace-pre-line">{resumeFeedback}</p>
          ) : (
            <p className="text-muted-foreground">No feedback available.</p>
          )}
        </Card>

        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recommended Next Steps</h3>
          <ul className="space-y-2">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6 glass-card">
        <h3 className="text-xl font-semibold text-foreground mb-4">Take Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={handleDownload} className="flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2">
            <Target className="h-4 w-4" />
            <span>View Jobs</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Browse Courses</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Summary;
