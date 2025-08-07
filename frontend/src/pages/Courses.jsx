import { useResults } from "@/content/ResultsContext";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Clock, Users } from "lucide-react";

const Courses = () => {
  const { results } = useResults();

  const recommendedCourses = (results?.top_jobs || [])
    .flatMap((job, jobIdx) =>
      (job.recommended_courses || []).map((course, courseIdx) => ({
        id: `${jobIdx}-${courseIdx}`,
        title: `${course.skill.charAt(0).toUpperCase() + course.skill.slice(1)} Course`,
        provider: "Udemy",
        link: course.course_url,
        skill: course.skill
      }))
    )
    .filter((value, index, self) =>
      index === self.findIndex((v) => v.title === value.title)
    );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Recommended Courses
        </h1>
        <p className="text-xl text-muted-foreground">
          Upskill with courses tailored to your career goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedCourses.map((course) => (
          <Card key={course.id} className="course-card">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {course.title}
                </h3>
                <p className="text-primary font-medium">{course.provider}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">—</div>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  —
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              Learn {course.skill} with hands-on projects and practical instruction.
            </p>

            <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>—</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>— students</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span className="font-medium">—</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="skill-card">
                {course.skill}
              </Badge>
            </div>

            <Button
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => window.open(course.link, "_blank")}
            >
              <span>Enroll Now</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {recommendedCourses.length > 0 && (
        <Card className="mt-8 p-6 glass-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Learning Path Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {recommendedCourses.length}
              </div>
              <div className="text-muted-foreground">Recommended Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">—</div>
              <div className="text-muted-foreground">Total Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">—</div>
              <div className="text-muted-foreground">Total Investment</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Courses;
