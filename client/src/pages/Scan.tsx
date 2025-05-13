import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { FaceScanner } from "@/components/FaceScanner";
import { PaymentProcess } from "@/components/PaymentProcess";
import { LivenessDetection } from "@/components/LivenessDetection";
import { Card } from "@/components/ui/card";
import { 
  CreditCard, 
  Scan, 
  Shield, 
  ChevronRight, 
  Fingerprint, 
  CheckCircle2,
  Lock,
  ArrowRight
} from "lucide-react";

enum ScanStage {
  INITIAL,
  SCANNING,
  PAYMENT
}

// Additional PaymentProcess component to enhance the styling
const EnhancedPaymentProcess = () => {
  return (
    <div className="rounded-2xl overflow-hidden border border-secondary/30 shadow-xl bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Animated border highlight */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-border-flow"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-border-flow-vertical"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-border-flow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-border-flow-vertical" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Payment header */}
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Payment Details</h3>
              <p className="text-sm text-foreground opacity-70">Secure transaction to verified recipient</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Verified
          </div>
        </div>
      </div>

      {/* Recipient info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">JD</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-foreground">John Doe</h4>
            <p className="text-sm text-foreground opacity-70">Recipient ID: #8294-FC23</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Frequent Contact</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">Verified ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment amount */}
      <div className="p-6 border-b border-border">
        <label className="block text-sm font-medium text-foreground opacity-80 mb-2">Payment Amount</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-foreground opacity-70">$</div>
          <input 
            type="text" 
            className="w-full p-4 pl-8 text-2xl font-bold bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none text-foreground"
            defaultValue="250.00"
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-foreground opacity-70">
          <span>Fee: $2.50</span>
          <span>Total: $252.50</span>
        </div>
      </div>

      {/* Payment options */}
      <div className="p-6 border-b border-border">
        <label className="block text-sm font-medium text-foreground opacity-80 mb-3">Payment Method</label>
        <div className="grid grid-cols-3 gap-3">
          {["Credit Card", "Bank Account", "Crypto"].map((method, i) => (
            <div 
              key={method} 
              className={`p-3 rounded-xl border ${i === 0 ? 'border-primary bg-primary/5' : 'border-border bg-muted/20'} text-center cursor-pointer transition-all hover:border-primary/50`}
            >
              <span className="text-sm font-medium text-foreground">{method}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm button */}
      <div className="p-6">
        <button className="w-full relative group overflow-hidden">
          {/* Button visual layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity animate-pulse-slow rounded-xl"></div>
          
          {/* Button content */}
          <div className="relative z-10 py-4 px-6 flex items-center justify-center gap-2 text-white font-medium text-lg">
            Confirm Payment
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </div>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
        </button>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-foreground opacity-70 text-sm">
          <Lock className="w-4 h-4" />
          <span>Protected by SecureGuard™</span>
        </div>
      </div>
    </div>
  );
};

const ScanPage = () => {
  const [stage, setStage] = useState<ScanStage>(ScanStage.INITIAL);
  const [animateIn, setAnimateIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scannerRef = useRef(null);

  // Handle mouse movement for interactive gradients
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth),
        y: (e.clientY / window.innerHeight)
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation sequences
  useEffect(() => {
    setAnimateIn(true);
    
    // Scroll to top when stage changes
    if (stage !== ScanStage.INITIAL) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [stage]);

  const handleStartScan = () => {
    setAnimateIn(false);
    
    // Delay the state change to allow exit animation
    setTimeout(() => {
      setStage(ScanStage.SCANNING);
      setAnimateIn(true);
    }, 300);
  };

  const handleScanComplete = () => {
    setAnimateIn(false);
    
    // Delay the state change to allow exit animation
    setTimeout(() => {
      setStage(ScanStage.PAYMENT);
      setAnimateIn(true);
    }, 300);
  };

  // Dynamic gradient styling based on mouse position
  const backgroundGradientStyle = {
    backgroundImage: `radial-gradient(
      circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
      rgba(var(--primary-rgb), 0.15),
      rgba(var(--secondary-rgb), 0.05) 30%, 
      rgba(var(--background-rgb), 0.02) 70%
    )`
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 min-h-[80vh] flex flex-col relative">
        {/* Adaptive interactive background */}
        <div 
          className="fixed inset-0 -z-10 opacity-80 transition-opacity duration-1000"
          style={backgroundGradientStyle}
        />
        
        {/* Animated particle network background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Dynamic grid lines that pulse with stage changes */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={`h-${i}`}
                x1="0" 
                y1={i * 8} 
                x2="100" 
                y2={i * 8 + (mousePosition.y * 5 - 2.5)} 
                stroke={`hsl(${(i * 30) % 360}, 70%, 50%)`} 
                strokeWidth="0.15"
                strokeDasharray="0.5,3"
                strokeOpacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={`v-${i}`}
                x1={i * 8 + (mousePosition.x * 5 - 2.5)} 
                y1="0" 
                x2={i * 8} 
                y2="100" 
                stroke={`hsl(${(i * 30 + 60) % 360}, 70%, 50%)`} 
                strokeWidth="0.15"
                strokeDasharray="0.5,3"
                strokeOpacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
            
            {/* Floating node points */}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle 
                key={`node-${i}`}
                cx={25 + (i * 3) % 50} 
                cy={20 + (i * 7) % 60} 
                r="0.5"
                fill={`hsl(${(i * 40) % 360}, 80%, 60%)`}
                className="animate-float"
                style={{ 
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${10 + i % 5}s`
                }}
              />
            ))}
            
            {/* Connection lines between nodes that appear based on proximity */}
            {stage === ScanStage.SCANNING && Array.from({ length: 8 }).map((_, i) => (
              <path 
                key={`connection-${i}`}
                d={`M${25 + (i * 5) % 40},${30 + (i * 3) % 30} Q${50 + (mousePosition.x * 10)},${50 + (mousePosition.y * 10)} ${60 + (i * 3) % 25},${60 + (i * 4) % 35}`}
                stroke={`hsl(${(i * 40 + 120) % 360}, 80%, 60%)`}
                strokeWidth="0.2"
                strokeDasharray="0.5,2"
                strokeOpacity="0.4"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </svg>
        </div>

        {/* Flowing gradient shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-radial from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl animate-morph opacity-60"
            style={{ transformOrigin: 'center center' }}
          />
          <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gradient-radial from-accent/10 via-primary/5 to-transparent rounded-full blur-3xl animate-morphReverse opacity-60"
            style={{ animationDelay: '2s', transformOrigin: 'bottom left' }}
          />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent rounded-full blur-3xl animate-float opacity-60"
            style={{ animationDuration: '15s' }}
          />
        </div>

        {/* Interactive title section with glowing effect */}
        <div className={`max-w-2xl mx-auto mb-10 text-center relative transition-all duration-700 transform ${animateIn ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-conic from-primary via-secondary to-accent to-primary rounded-full blur-xl opacity-70 animate-spin-slow"></div>
            <div className="relative z-10 bg-background/80 backdrop-blur-sm rounded-full px-8 py-3 border border-secondary/20">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                {stage === ScanStage.PAYMENT 
                  ? "Complete Payment" 
                  : stage === ScanStage.SCANNING
                  ? "Identifying User"
                  : "Biometric Payment"
                }
              </h1>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto relative">
            <span className="absolute -left-6 top-1/2 h-px w-4 bg-gradient-to-r from-transparent to-primary/50"></span>
            {stage === ScanStage.INITIAL 
              ? "Experience the future of payments with facial recognition technology." 
              : stage === ScanStage.SCANNING 
                ? "Our AI is analyzing and verifying the recipient's identity." 
                : "Recipient verified. Securely complete your transaction."
            }
            <span className="absolute -right-6 top-1/2 h-px w-4 bg-gradient-to-l from-transparent to-primary/50"></span>
          </p>
        </div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6 transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`lg:col-span-${stage === ScanStage.PAYMENT ? "2" : "3"}`}>
            {stage === ScanStage.INITIAL ? (
              <Card className="p-8 bg-gradient-to-br from-background via-background/95 to-background/90 border border-secondary/20 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-primary/10 rounded-2xl overflow-hidden relative group">
                {/* Subtle animated highlight effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-secondary/10 to-primary/0 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
                
                {/* Glowing orb animation */}
                <div className="mb-10 relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-conic from-primary via-secondary to-accent mx-auto flex items-center justify-center relative overflow-hidden group transition-all duration-500 hover:scale-105">
                    {/* Ripple animations */}
                    <div className="absolute inset-0 bg-primary/10 scale-0 rounded-full animate-ripple"></div>
                    <div className="absolute inset-0 bg-accent/10 scale-0 rounded-full animate-ripple" style={{ animationDelay: "1s" }}></div>
                    <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full animate-ripple" style={{ animationDelay: "2s" }}></div>
                    
                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-full bg-gradient-radial from-background via-background/90 to-background/80 flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Scan 
                        className="h-16 w-16 text-primary/90 drop-shadow-[0_0_6px_rgba(var(--primary-rgb),0.5)] animate-pulse-slow" 
                      />
                    </div>
                    
                    {/* Rotating highlight */}
                    <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-secondary/50 to-transparent animate-spin-slow"></div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Ready for Biometric Payment</h2>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Our advanced facial recognition system instantly identifies payment recipients for seamless transactions
                  </p>
                </div>
                
                {/* Animated button with hover effects */}
                <button 
                  onClick={handleStartScan}
                  className="group w-full py-4 px-6 rounded-xl font-medium relative overflow-hidden transition-all duration-300"
                >
                  {/* Button background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity animate-pulse-slow"></div>
                  <div className="absolute inset-[1px] bg-gradient-to-br from-background/95 to-background/70 rounded-[9px] group-hover:opacity-0 transition-opacity"></div>
                  
                  {/* Button text layers */}
                  <span className="relative z-10 flex items-center justify-center gap-3 font-medium text-lg group-hover:text-white transition-colors duration-300 text-primary">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:text-white transition-colors duration-300">
                      Begin Face Scan
                    </span>
                    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                </button>
              </Card>
            ) : (
              <div className="relative">
                {/* Background highlight effect for scanner */}
                <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 rounded-3xl -z-10 transform rotate-1 scale-105 blur-lg animate-pulse-slow"></div>
                
                {/* Scanner with interactive border effect */}
                <div ref={scannerRef} className="rounded-2xl overflow-hidden border border-secondary/30 shadow-xl shadow-primary/5 relative">
                  {/* Animated border highlight that moves around the scanner */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-border-flow"></div>
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-border-flow-vertical"></div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-border-flow" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-border-flow-vertical" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <FaceScanner 
                    onScanComplete={handleScanComplete}
                    scanningText={stage === ScanStage.SCANNING ? "Analyzing Biometric Data" : "Identity Verified"}
                    showLivenessDetection={true}
                  />
                  
                  {/* Subtle corner scan effect */}
                  {stage === ScanStage.SCANNING && (
                    <>
                      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                        <div className="absolute top-0 left-0 w-8 h-px bg-primary animate-scan-corner"></div>
                        <div className="absolute top-0 left-0 w-px h-8 bg-primary animate-scan-corner"></div>
                      </div>
                      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                        <div className="absolute top-0 right-0 w-8 h-px bg-secondary animate-scan-corner" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute top-0 right-0 w-px h-8 bg-secondary animate-scan-corner" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                        <div className="absolute bottom-0 left-0 w-8 h-px bg-accent animate-scan-corner" style={{ animationDelay: '0.4s' }}></div>
                        <div className="absolute bottom-0 left-0 w-px h-8 bg-accent animate-scan-corner" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-8 h-px bg-primary animate-scan-corner" style={{ animationDelay: '0.6s' }}></div>
                        <div className="absolute bottom-0 right-0 w-px h-8 bg-primary animate-scan-corner" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {stage === ScanStage.SCANNING && (
              <div className="mt-8 animate-fade-up">
                <LivenessDetection />
                
                {/* Additional animated liveness indicators */}
                <div className="mt-4 p-4 rounded-xl border border-secondary/20 bg-gradient-to-br from-background to-background/80 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute inset-0 -z-10">
                    {/* Animated scan lines */}
                    <div className="w-full h-2 bg-gradient-to-r from-transparent via-secondary/20 to-transparent absolute top-0 animate-scan-line"></div>
                    <div className="w-full h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent absolute top-0 animate-scan-line" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Analyzing Biometric Markers
                  </h3>
                  
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {["Face Geometry", "Depth Analysis", "Eye Movement", "Micro Expressions"].map((item, i) => (
                      <div 
                        key={item} 
                        className="text-xs text-center p-2 rounded-lg border border-primary/10 bg-secondary/5"
                        style={{ 
                          animationDelay: `${i * 0.2}s`,
                          opacity: 0,
                          animation: 'fadeIn 0.5s forwards',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className={`lg:col-span-${stage === ScanStage.PAYMENT ? "3" : "2"}`}>
            {stage === ScanStage.PAYMENT ? (
              <div className="animate-fade-left">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl -z-10 transform -rotate-1 scale-105 blur-lg animate-pulse-slow"></div>
                <EnhancedPaymentProcess />
              </div>
            ) : (
              <div className="space-y-6">
                {/* How it Works card with glass morphism effect */}
                <Card className="overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md shadow-lg relative group hover:border-primary/20 transition-all duration-300">
                  {/* Animated gradient border */}
                  <div className="absolute inset-px rounded-2xl overflow-hidden z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-conic from-primary via-secondary to-accent to-primary animate-spin-slow blur-xl opacity-20"></div>
                  </div>
                  
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/5">
                        <Fingerprint className="w-5 h-5 text-primary" />
                      </div>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">How It Works</span>
                    </h3>
                    
                    <ul className="space-y-5">
                      {[
                        {
                          title: "Biometric Verification",
                          desc: "Advanced facial scanning identifies the recipient instantly",
                          delay: 0
                        },
                        {
                          title: "Secure Authentication",
                          desc: "Liveness detection prevents spoofing attempts",
                          delay: 0.2
                        },
                        {
                          title: "Seamless Transaction",
                          desc: "Complete the payment with encrypted confirmation",
                          delay: 0.4
                        }
                      ].map((item, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-4 group/item relative"
                          style={{ 
                            opacity: 10,
                            animation: 'fadeIn 0.5s forwards',
                            animationDelay: `${item.delay + 0.3}s`
                          }}
                        >
                          {/* Animated step indicator */}
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center relative group-hover/item:scale-110 transition-transform duration-300">
                              <div className="absolute inset-0 rounded-full blur-md bg-primary/20 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                              <span className="text-primary font-bold relative z-10">{i + 1}</span>
                            </div>
                            {i < 2 && <div className="absolute top-8 left-1/2 w-px h-12 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2"></div>}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground bg-clip-text ">{item.title}</h4>
                            <p className="text-sm text-foreground opacity-80 mt-1">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
                
                {/* Security Features card with enhanced visuals */}
                <Card className="overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md shadow-lg relative group hover:border-primary/20 transition-all duration-300">
                  {/* Subtle security animation in background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      
                      {/* Security pattern */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <path 
                          key={`sec-path-${i}`}
                          d={`M${10 + i * 20},10 Q${50},${30 + i * 10} ${90 - i * 20},90`}
                          stroke="url(#securityGradient)"
                          strokeWidth="0.5"
                          fill="none"
                          strokeDasharray="0.5,3"
                          className="animate-pulse-slow"
                          style={{ animationDelay: `${i * 0.5}s` }}
                        />
                      ))}
                    </svg>
                  </div>
                  
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/5">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Security Features</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Advanced Liveness Detection",
                          icon: <Fingerprint className="w-5 h-5 text-green-500" />,
                          delay: 0
                        },
                        {
                          title: "Zero-Knowledge Biometrics",
                          icon: <Lock className="w-5 h-5 text-green-500" />,
                          delay: 0.2
                        },
                        {
                          title: "End-to-End Encryption",
                          icon: <Shield className="w-5 h-5 text-green-500" />,
                          delay: 0.4
                        },
                        {
                          title: "Quantum-Resistant Algorithms",
                          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
                          delay: 0.6
                        }
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 group/item"
                          style={{ 
                            opacity: 10,
                            animation: 'fadeIn 0.5s forwards',
                            animationDelay: `${item.delay + 0.5}s`
                          }}
                        >
                          <div className="p-2 rounded-lg bg-green-500/10 group-hover/item:bg-green-500/20 transition-colors">
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium text-foreground">{item.title}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Security trust badge */}
                    <div className="mt-5 pt-4 border-t border-border/50">
                      <div className="text-xs text-foreground opacity-80 flex items-center justify-center gap-2">
                        <Shield className="w-3 h-3 text-primary" />
                        <span>ISO 27001 Certified | GDPR Compliant | SOC2 Type II</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
        
        {/* Animated progress indicator */}
        {stage !== ScanStage.INITIAL && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex gap-2 p-2 rounded-full bg-background/80 backdrop-blur-md border border-secondary/20 shadow-lg">
              {[ScanStage.INITIAL, ScanStage.SCANNING, ScanStage.PAYMENT].map((s, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    stage > s ? 'bg-green-500' : 
                    stage === s ? 'bg-primary animate-pulse' : 
                    'bg-muted'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScanPage;