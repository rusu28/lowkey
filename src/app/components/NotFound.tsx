import { Link } from "react-router";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-muted/30">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl mb-4" style={{ fontFamily: "'Permanent Marker', cursive" }}>
          404
        </h1>
        <h2 className="text-2xl md:text-3xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <Home size={18} />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}