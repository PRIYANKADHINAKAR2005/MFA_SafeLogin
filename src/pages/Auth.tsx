import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [biometricScan, setBiometricScan] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        navigate("/", { replace: true });
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const canonical = useMemo(() => `${window.location.origin}/auth`, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBiometricScan(true);

    // Simulate biometric scan
    setTimeout(() => {
      setBiometricScan(false);
    }, 2000);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        if (showMFA) {
          setOtpSent(true);
          toast({ title: "OTP Sent", description: "Please check your email for the verification code." });
        } else {
          toast({ title: "Signed in", description: "Welcome back!" });
          navigate("/", { replace: true });
        }
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl },
        });
        if (error) throw error;
        toast({
          title: "Check your email",
          description: "Confirm your address to finish sign up.",
        });
      }
    } catch (err: any) {
      toast({ title: "Authentication error", description: err.message || "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setLoading(false);
        toast({ title: "Success", description: "OTP verified successfully!" });
        navigate("/", { replace: true });
      }, 1500);
    }
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = () => {
    const generatedOTP = generateOTP();
    setOtpSent(true);
    toast({ title: "OTP Sent", description: `Your OTP is: ${generatedOTP} (Demo)` });
  };

  return (
    <main className="min-h-screen flex items-center justify-center cyber-theme matrix-bg cyber-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full cyber-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-500 rounded-full cyber-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full cyber-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 right-1/4 w-1 h-1 bg-cyan-400 rounded-full cyber-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      <Helmet>
        <title>{mode === "signin" ? "Login" : "Sign Up"} – Secure Login</title>
        <meta name="description" content="Authenticate to the Secure Login System using email and password." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className="w-full max-w-md cyber-card cyber-border-glow cyber-float scan-line p-8 rounded-xl relative z-10">
        {/* Header with glitch effect */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent cyber-glitch"
            data-text={mode === "signin" ? "SECURE LOGIN" : "CREATE ACCOUNT"}
          >
            {mode === "signin" ? "SECURE LOGIN" : "CREATE ACCOUNT"}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full cyber-pulse"></div>
        </div>

        {/* MFA Toggle */}
        {mode === "signin" && (
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 cyber-card border border-cyan-400/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full cyber-pulse"></div>
                <span className="text-cyan-400 font-semibold">Multi-Factor Authentication</span>
              </div>
              <button
                onClick={() => setShowMFA(!showMFA)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showMFA ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showMFA ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* OTP Section */}
        {showMFA && otpSent && (
          <div className="cyber-card p-6 mb-6 border border-blue-400/30">
            <h3 className="text-blue-400 font-semibold mb-4 text-center">🔐 Enter OTP</h3>
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[i] = e.target.value;
                      setOtp(newOtp.join(""));
                      if (e.target.value && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    className="w-12 h-12 text-center cyber-input bg-black/50 border-blue-400/50 text-white focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 rounded-lg"
                  />
                ))}
              </div>
              <Button
                type="submit"
                className="w-full cyber-button bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                disabled={otp.length !== 6 || loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </div>
        )}

        {/* Main Login Form */}
        {(!showMFA || !otpSent) && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-cyan-400 uppercase tracking-wider" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="cyber-input bg-black/50 border-cyan-400/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-cyan-400 uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="cyber-input bg-black/50 border-cyan-400/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Biometric Scan Animation */}
            {biometricScan && (
              <div className="cyber-card p-4 border border-green-400/30">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-green-400 font-semibold">Biometric Scan in Progress...</span>
                </div>
                <div className="mt-2 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full cyber-button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>PROCESSING...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {showMFA ? "SEND OTP" : (mode === "signin" ? "AUTHENTICATE" : "CREATE ACCOUNT")}
                </span>
              )}
            </Button>

            {showMFA && !otpSent && (
              <Button
                type="button"
                onClick={sendOTP}
                className="w-full cyber-button bg-gradient-to-r from-purple-400 to-cyan-500 hover:from-purple-500 hover:to-cyan-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                🔐 Send OTP
              </Button>
            )}
          </form>
        )}

        <div className="mt-6 text-center">
          <button 
            className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-300 font-medium"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Login"}
          </button>
        </div>

        {/* Security Features Display */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="cyber-card p-3 border border-green-400/30 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-black font-bold text-sm">🔒</span>
            </div>
            <span className="text-green-400 text-xs font-semibold">TLS/HTTPS</span>
          </div>
          <div className="cyber-card p-3 border border-blue-400/30 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-black font-bold text-sm">🔐</span>
            </div>
            <span className="text-blue-400 text-xs font-semibold">256-bit AES</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full cyber-pulse"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500 rounded-full cyber-pulse" style={{ animationDelay: '0.5s' }}></div>
      </section>
    </main>
  );
};

export default Auth;
