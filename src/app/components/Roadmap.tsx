import { Card } from "./ui/card";

export function Roadmap() {
  return (
    <div className="py-12 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl mb-6">
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2em" }}>
                Coming
              </span>{" "}
              <span style={{ fontFamily: "'Righteous', cursive", fontSize: "1.1em" }}>
                SOON
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're working on a comprehensive learning roadmap to help you master AI and machine
              learning. Stay tuned!
            </p>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl mb-4">What to Expect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our AI Learning Roadmap will include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Beginner to advanced learning paths</li>
                <li>Curated resources and tutorials</li>
                <li>Hands-on projects and exercises</li>
                <li>Interview preparation materials</li>
                <li>Career guidance in AI/ML</li>
                <li>Recommended courses and books</li>
              </ul>
              <p className="pt-4">
                In the meantime, start with our competitions to practice your skills!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
