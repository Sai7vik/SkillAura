import { useResults } from "@/content/ResultsContext";

import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

const Feedback = () => {
  const { results } = useResults();
  const feedbackText = results?.resume_feedback || "No feedback available.";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Resume Feedback
        </h1>
        <p className="text-xl text-muted-foreground">
          AI-powered analysis of your resume
        </p>
      </div>

      <Card className="p-6 glass-card mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Suggestions & Feedback
        </h3>
        <div className="prose max-w-none prose-p:text-muted-foreground prose-li:text-muted-foreground prose-ul:list-disc prose-ul:pl-5">
          <ReactMarkdown>{feedbackText}</ReactMarkdown>
        </div>
      </Card>
    </div>
  );
};

export default Feedback;
