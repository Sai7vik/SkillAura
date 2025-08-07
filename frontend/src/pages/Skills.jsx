import { useResults } from "@/content/ResultsContext";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Skills = () => {
  const { results } = useResults();
  const technicalSkills = results?.extracted_skills || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Your Skills Analysis
        </h1>
        <p className="text-xl text-muted-foreground">
          AI-extracted skills from your resume
        </p>
      </div>

      <Card className="p-6 glass-card">
        <h3 className="text-xl font-semibold text-foreground mb-4">Technical Skills</h3>
        {technicalSkills.length > 0 ? (
          <div className="flex flex-col gap-3">
            {technicalSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="skill-card w-fit">
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No technical skills found.</p>
        )}
      </Card>

      <Card className="mt-8 p-6 glass-card">
        <h3 className="text-xl font-semibold text-foreground mb-4">Skills Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {technicalSkills.length}
            </div>
            <div className="text-muted-foreground">Technical Skills</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Skills;
