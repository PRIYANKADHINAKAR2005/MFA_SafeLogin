import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setLoggedIn(!!session);
    });
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    return () => subscription.unsubscribe();
  }, []);

  const canonical = useMemo(() => `${window.location.origin}/`, []);

  return (
    <div className="min-h-screen flex items-center justify-center cyber-theme matrix-bg cyber-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full cyber-pulse"></div>
          <div className="absolute top-40 right-40 w-2 h-2 bg-blue-500 rounded-full cyber-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-purple-500 rounded-full cyber-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full cyber-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-500 rounded-full cyber-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <Helmet>
        <title>Secure Login System – Home</title>
        <meta name="description" content="Home of the Secure Login System with Supabase authentication." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="text-center space-y-8 cyber-card cyber-border-glow cyber-float p-12 rounded-2xl relative z-10 max-w-2xl mx-4">
        {/* Header with glitch effect */}
        <div className="space-y-4">
          <h1 
            className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent cyber-glitch"
            data-text="SECURE LOGIN SYSTEM"
          >
            SECURE LOGIN SYSTEM
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full cyber-pulse"></div>
        </div>

        <p className="text-xl text-cyan-300 font-medium">
          Start building your secure experience with advanced encryption and cyber-themed interface.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {!loggedIn ? (
            <>
              <Button 
                asChild 
                className="cyber-button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/dashboard" aria-label="Go to dashboard" className="flex items-center space-x-2">
                  <span>🔐</span>
                  <span>EXPERIENCE ENCRYPTION</span>
                </Link>
              </Button>
              <Button 
                asChild 
                className="cyber-button bg-gradient-to-r from-purple-400 to-cyan-500 hover:from-purple-500 hover:to-cyan-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/auth" aria-label="Go to authentication page" className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>LOGIN / SIGN UP</span>
                </Link>
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
              aria-label="Sign out"
              className="cyber-button border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              SIGN OUT
            </Button>
          )}
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="cyber-card p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Secure Authentication</h3>
            <p className="text-gray-300 text-sm">Advanced encryption and secure login protocols</p>
          </div>

          <div className="cyber-card p-6 rounded-lg border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Lightning Fast</h3>
            <p className="text-gray-300 text-sm">Optimized performance and instant response times</p>
          </div>

          <div className="cyber-card p-6 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Cyber Protected</h3>
            <p className="text-gray-300 text-sm">State-of-the-art security and protection</p>
          </div>
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

export default Index;
