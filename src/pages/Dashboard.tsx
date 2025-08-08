import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [typedText, setTypedText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showEncryption, setShowEncryption] = useState(false);

  const steps = [
    "Initializing Secure Protocols...",
    "Establishing Encrypted Connection...",
    "Loading Security Modules...",
    "System Ready for Authentication..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsTyping(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  useEffect(() => {
    setIsTyping(true);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTypedText(text);
    if (text) {
      // Simulate encryption using base64 and SHA256-like hash
      const base64 = btoa(text);
      const hash = Array.from(text).map(char => char.charCodeAt(0).toString(16)).join('').substring(0, 32);
      setEncryptedText(`${base64.substring(0, 8)}...${hash.substring(0, 8)}`);
    } else {
      setEncryptedText("");
    }
  };

  const simulateEncryption = () => {
    setShowEncryption(true);
    setTimeout(() => setShowEncryption(false), 3000);
  };

  return (
    <div className="min-h-screen cyber-theme matrix-bg cyber-grid relative overflow-hidden">
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
        <title>Cyber Dashboard – Encryption Simulation</title>
        <meta name="description" content="Experience encryption simulation and learn about secure authentication." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent cyber-glitch mb-4"
            data-text="CYBER DASHBOARD"
          >
            CYBER DASHBOARD
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full cyber-pulse"></div>
        </div>

        {/* Terminal-style typing intro */}
        {isTyping && (
          <div className="cyber-card p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full cyber-pulse"></div>
              <span className="text-green-400 font-mono">Terminal</span>
            </div>
            <div className="font-mono text-cyan-400">
              {steps.slice(0, currentStep + 1).map((step, index) => (
                <div key={index} className="mb-2">
                  <span className="text-green-400">$</span> {step}
                  {index === currentStep && <span className="animate-pulse">|</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Encryption Simulation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="cyber-card cyber-border-glow p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">🔐 Encryption Simulation</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-cyan-400 font-semibold mb-2">Enter Your Message:</label>
                <input
                  type="text"
                  value={typedText}
                  onChange={handleTextChange}
                  placeholder="Type anything to see encryption..."
                  className="w-full cyber-input bg-black/50 border-cyan-400/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 p-3 rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Plaintext Card */}
                <div className="cyber-card p-4 border border-cyan-400/30">
                  <h3 className="text-cyan-400 font-semibold mb-2">Plaintext</h3>
                  <div className="bg-black/50 p-3 rounded font-mono text-sm text-gray-300 min-h-[60px] flex items-center">
                    {typedText || "Enter text above..."}
                  </div>
                </div>

                {/* Encrypted Card */}
                <div className="cyber-card p-4 border border-blue-400/30">
                  <h3 className="text-blue-400 font-semibold mb-2">Encrypted</h3>
                  <div className="bg-black/50 p-3 rounded font-mono text-sm text-gray-300 min-h-[60px] flex items-center">
                    {encryptedText || "Encrypted output will appear here..."}
                  </div>
                </div>
              </div>

              <Button
                onClick={simulateEncryption}
                className="w-full cyber-button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                🔒 Simulate Encryption
              </Button>
            </div>
          </div>

          {/* Educational Section */}
          <div className="cyber-card cyber-border-glow p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">📚 Security Education</h2>
            <div className="space-y-6">
              <div className="cyber-card p-4 border border-purple-400/30">
                <h3 className="text-purple-400 font-semibold mb-2">🔐 Encryption</h3>
                <p className="text-gray-300 text-sm">
                  Encryption transforms readable data into an unreadable format using complex algorithms. 
                  This ensures that even if data is intercepted, it cannot be understood without the proper key.
                </p>
              </div>

              <div className="cyber-card p-4 border border-green-400/30">
                <h3 className="text-green-400 font-semibold mb-2">🔑 Hashing</h3>
                <p className="text-gray-300 text-sm">
                  Hashing creates a unique, fixed-length string from any input. It's a one-way process - 
                  you can't reverse a hash to get the original data, making it perfect for password storage.
                </p>
              </div>

              <div className="cyber-card p-4 border border-yellow-400/30">
                <h3 className="text-yellow-400 font-semibold mb-2">🔐 MFA (Multi-Factor Authentication)</h3>
                <p className="text-gray-300 text-sm">
                  MFA adds an extra layer of security by requiring multiple forms of verification: 
                  something you know (password), something you have (phone), or something you are (fingerprint).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transport Simulation */}
        {showEncryption && (
          <div className="cyber-card cyber-border-glow p-8 mb-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">🌐 Secure Transport Simulation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="cyber-card p-4 border border-cyan-400/30 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-black font-bold">1</span>
                </div>
                <h3 className="text-cyan-400 font-semibold mb-2">Input</h3>
                <p className="text-gray-300 text-sm">Your original message</p>
              </div>

              <div className="cyber-card p-4 border border-blue-400/30 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center relative z-10">
                  <span className="text-black font-bold">2</span>
                </div>
                <h3 className="text-blue-400 font-semibold mb-2 relative z-10">Encrypted</h3>
                <p className="text-gray-300 text-sm relative z-10">Data transformed for security</p>
              </div>

              <div className="cyber-card p-4 border border-green-400/30 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-black font-bold">3</span>
                </div>
                <h3 className="text-green-400 font-semibold mb-2">Transport</h3>
                <p className="text-gray-300 text-sm">Secure transmission via HTTPS/TLS</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 bg-green-400/20 border border-green-400/50 px-4 py-2 rounded-lg">
                <span className="text-green-400">🔒</span>
                <span className="text-green-400 font-semibold">TLS/HTTPS Secured</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center">
          <Button 
            asChild 
            className="cyber-button bg-gradient-to-r from-purple-400 to-cyan-500 hover:from-purple-500 hover:to-cyan-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
          >
            <Link to="/auth" className="flex items-center space-x-2">
              <span>🚀</span>
              <span>PROCEED TO SECURE LOGIN</span>
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

export default Dashboard;
