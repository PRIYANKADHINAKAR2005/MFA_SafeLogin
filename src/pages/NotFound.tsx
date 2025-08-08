import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center cyber-theme matrix-bg cyber-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full cyber-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-500 rounded-full cyber-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full cyber-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 right-1/4 w-1 h-1 bg-cyan-400 rounded-full cyber-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      <div className="text-center space-y-8 cyber-card cyber-border-glow cyber-float p-12 rounded-2xl relative z-10 max-w-md mx-4">
        {/* Header with glitch effect */}
        <div className="space-y-4">
          <h1 
            className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent cyber-glitch"
            data-text="404"
          >
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full cyber-pulse"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 uppercase tracking-wider">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg">
            The page you're looking for doesn't exist in our secure network.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Button 
            asChild 
            className="cyber-button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Link to="/" className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>RETURN TO HOME</span>
            </Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 w-3 h-3 bg-cyan-400 rounded-full cyber-pulse"></div>
        <div className="absolute bottom-6 left-6 w-3 h-3 bg-blue-500 rounded-full cyber-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-6 left-6 w-2 h-2 bg-purple-500 rounded-full cyber-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 right-6 w-2 h-2 bg-cyan-400 rounded-full cyber-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};

export default NotFound;
