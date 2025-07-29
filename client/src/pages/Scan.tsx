import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { FaceScanner } from "@/components/FaceScanner";
import { LivenessDetection } from "@/components/LivenessDetection";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { 
  Scan, 
  Shield, 
  ChevronRight, 
  Fingerprint, 
  CheckCircle2,
  Lock,
  ArrowRight,
  Bitcoin,
  Wallet,
  Axis3DIcon
} from "lucide-react";

enum ScanStage {
  INITIAL,
  SCANNING,
  PAYMENT
}

interface VerifiedUser {
  verified: boolean;
  name?: string;
  wallet_address?: string;
  confidence?: number;
  user_id?: string;
}

const CryptoPaymentProcess = ({ recipientName, walletAddress }: { recipientName: string, walletAddress: string }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-secondary/30 shadow-xl bg-gradient-to-br from-background via-background/95 to-background/90 relative">
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
              <Bitcoin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Crypto Payment</h3>
              <p className="text-sm text-foreground opacity-70">Secure blockchain transaction</p>
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
              <span className="text-xl font-bold text-primary">
                {recipientName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-foreground">{recipientName}</h4>
            <p className="text-sm text-foreground opacity-70">Wallet Address: {walletAddress}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Biometric Verified</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">On-chain ✓</span>
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
            defaultValue="0.10"
            placeholder="Enter amount"
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-foreground opacity-70">
          <span>Network: Ethereum</span>
          <span>≈ 0.00042 ETH</span>
        </div>
      </div>

      {/* Crypto payment options */}
      <div className="p-6 border-b border-border">
        <label className="block text-sm font-medium text-foreground opacity-80 mb-3">Select Token</label>
        <div className="grid grid-cols-3 gap-3">
          {["ETH", "USDC", "USDT"].map((token) => (
            <div 
              key={token} 
              className={`p-3 rounded-xl border border-border bg-muted/20 text-center cursor-pointer transition-all hover:border-primary/50`}
            >
              <span className="text-sm font-medium text-foreground">{token}</span>
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
            Send Crypto Payment
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </div>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
        </button>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-foreground opacity-70 text-sm">
          <Lock className="w-4 h-4" />
          <span>Secured by blockchain technology</span>
        </div>
      </div>
    </div>
  );
};

const ScanPage = () => {
  const [stage, setStage] = useState<ScanStage>(ScanStage.INITIAL);
  const [animateIn, setAnimateIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [verifiedUser, setVerifiedUser] = useState<VerifiedUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef(null);

  // Handle mouse movement for interactive gradients
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    
    if (stage !== ScanStage.INITIAL) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [stage]);

  const handleStartScan = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setStage(ScanStage.SCANNING);
      setAnimateIn(true);
    }, 300);
  };

  // Helper function to convert different image formats to blob
 

  const handleScanComplete = async (imageData: string) => {
  console.log('Scan complete called with image data:', imageData);
  
  setIsLoading(true);
  setError(null);
  
  try {
    // Simplified blob conversion - assuming imageData is a data URL
    const blob = await fetch(imageData).then(res => res.blob());
    
    console.log('Converted to blob:', {
      size: blob.size,
      type: blob.type,
      sizeInMB: (blob.size / (1024 * 1024)).toFixed(2)
    });

    // Validate blob
    // if (!blob.type.startsWith('image/')) {
    //   throw new Error('Invalid image format');
    // }

    // Create FormData
    const formData = new FormData();
    formData.append('file', blob, 'face_scan.jpg');
    
    console.log('Sending request to backend...');
    
    // Make API request - using fetch instead of axios for consistency
    const response = await fetch("http://localhost:8000/verify-face", {
      method: "POST",
      body: formData,
      // Let browser set Content-Type with boundary automatically
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.message || 'Verification failed');
    }

    const result = await response.json();
    console.log('Verification result:', result);
    
    if (result.verified) {
      setVerifiedUser({
        verified: true,
        name: result.name,
        wallet_address: result.wallet_address,
        confidence: result.confidence,
        user_id: result.user_id
      });
      
      // Move to payment stage
      setTimeout(() => {
        setStage(ScanStage.PAYMENT);
      }, 1000);
    } else {
      setError(result.message || 'Face not recognized. Please try again.');
    }
  } catch (err) {
    console.error('Verification error:', err);
    setError(err instanceof Error ? err.message : 'Verification failed');
  } finally {
    setIsLoading(false);
  }
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
          </svg>
        </div>

        {/* Interactive title section with glowing effect */}
        <div className={`max-w-2xl mx-auto mb-10 text-center relative transition-all duration-700 transform ${animateIn ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-conic from-primary via-secondary to-accent to-primary rounded-full blur-xl opacity-70 animate-spin-slow"></div>
            <div className="relative z-10 bg-background/80 backdrop-blur-sm rounded-full px-8 py-3 border border-secondary/20">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                {stage === ScanStage.PAYMENT 
                  ? "Complete Crypto Payment" 
                  : stage === ScanStage.SCANNING
                  ? "Verifying Identity"
                  : "Crypto Biometric Pay"
                }
              </h1>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto relative">
            <span className="absolute -left-6 top-1/2 h-px w-4 bg-gradient-to-r from-transparent to-primary/50"></span>
            {stage === ScanStage.INITIAL 
              ? "Send crypto securely using facial recognition." 
              : stage === ScanStage.SCANNING 
                ? "Scanning and verifying recipient's identity on-chain." 
                : "Recipient verified. Complete your crypto transfer."
            }
            <span className="absolute -right-6 top-1/2 h-px w-4 bg-gradient-to-l from-transparent to-primary/50"></span>
          </p>
        </div>
        
        {/* Error message display */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-center">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        {/* Success message display */}
        {verifiedUser && stage === ScanStage.SCANNING && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-500 text-center">
            <p className="font-medium">
              ✓ Identity verified! Found {verifiedUser.name} 
              {verifiedUser.confidence && ` (${(verifiedUser.confidence * 100).toFixed(1)}% confidence)`}
            </p>
          </div>
        )}
        
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6 transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`lg:col-span-${stage === ScanStage.PAYMENT ? "2" : "3"}`}>
            {stage === ScanStage.INITIAL ? (
              <Card className="p-8 bg-gradient-to-br from-background via-background/95 to-background/90 border border-secondary/20 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-primary/10 rounded-2xl overflow-hidden relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-secondary/10 to-primary/0 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
                
                <div className="mb-10 relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-conic from-primary via-secondary to-accent mx-auto flex items-center justify-center relative overflow-hidden group transition-all duration-500 hover:scale-105">
                    <div className="absolute inset-0 bg-primary/10 scale-0 rounded-full animate-ripple"></div>
                    <div className="absolute inset-0 bg-accent/10 scale-0 rounded-full animate-ripple" style={{ animationDelay: "1s" }}></div>
                    <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full animate-ripple" style={{ animationDelay: "2s" }}></div>
                    
                    <div className="absolute inset-2 rounded-full bg-gradient-radial from-background via-background/90 to-background/80 flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Scan 
                        className="h-16 w-16 text-primary/90 drop-shadow-[0_0_6px_rgba(var(--primary-rgb),0.5)] animate-pulse-slow" 
                      />
                    </div>
                    
                    <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-secondary/50 to-transparent animate-spin-slow"></div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Crypto Biometric Pay</h2>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Scan a face to send crypto instantly to their verified wallet address
                  </p>
                </div>
                
                <button 
                  onClick={handleStartScan}
                  className="group w-full py-4 px-6 rounded-xl font-medium relative overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity animate-pulse-slow"></div>
                  <div className="absolute inset-[1px] bg-gradient-to-br from-background/95 to-background/70 rounded-[9px] group-hover:opacity-0 transition-opacity"></div>
                  
                  <span className="relative z-10 flex items-center justify-center gap-3 font-medium text-lg group-hover:text-white transition-colors duration-300 text-primary">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:text-white transition-colors duration-300">
                      Begin Face Scan
                    </span>
                    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                </button>
              </Card>
            ) : (
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 rounded-3xl -z-10 transform rotate-1 scale-105 blur-lg animate-pulse-slow"></div>
                
                <div ref={scannerRef} className="rounded-2xl overflow-hidden border border-secondary/30 shadow-xl shadow-primary/5 relative">
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-border-flow"></div>
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-border-flow-vertical"></div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-border-flow" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-border-flow-vertical" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <FaceScanner 
                    onScanComplete={handleScanComplete}
                    scanningText={stage === ScanStage.SCANNING ? "Verifying On-Chain Identity" : "Identity Verified"}
                    showLivenessDetection={true}
                    isLoading={isLoading}
                  />
                  
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
                
                <div className="mt-4 p-4 rounded-xl border border-secondary/20 bg-gradient-to-br from-background to-background/80 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl"></div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Security Guidelines</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ensure proper lighting and keep your face centered in the frame for accurate verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar with status or payment form */}
          <div className={`lg:col-span-${stage === ScanStage.PAYMENT ? "3" : "2"}`}>
            {stage === ScanStage.INITIAL && (
              <Card className="p-6 bg-gradient-to-br from-background via-background/95 to-background/90 border border-secondary/20 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">How It Works</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      icon: <Scan className="h-5 w-5 text-primary" />,
                      title: "Face Scan",
                      description: "Scan the recipient's face to find their verified wallet address"
                    },
                    {
                      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                      title: "Identity Verification",
                      description: "We verify the identity matches our on-chain records"
                    },
                    {
                      icon: <Wallet className="h-5 w-5 text-secondary" />,
                      title: "Secure Payment",
                      description: "Send crypto directly to their wallet with one click"
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-lg mt-1">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{step.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-secondary/10">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <Lock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Privacy First</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Face data is processed locally and never stored on our servers
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {stage === ScanStage.SCANNING && (
              <Card className="p-6 bg-gradient-to-br from-background via-background/95 to-background/90 border border-secondary/20 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Axis3DIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Verification Status</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg mt-1 ${verifiedUser ? 'bg-green-500/10' : 'bg-secondary/10'}`}>
                      {verifiedUser ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-secondary animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Face Match</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {verifiedUser 
                          ? `Matched to ${verifiedUser.name} with ${(verifiedUser.confidence! * 100).toFixed(1)}% confidence`
                          : "Scanning facial features against on-chain identities"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg mt-1 ${verifiedUser ? 'bg-green-500/10' : 'bg-secondary/10'}`}>
                      {verifiedUser ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-secondary animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Liveness Check</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {verifiedUser 
                          ? "Confirmed real person (not a photo or video)"
                          : "Verifying this is a live person"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg mt-1 ${verifiedUser ? 'bg-green-500/10' : 'bg-secondary/10'}`}>
                      {verifiedUser ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-secondary animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Wallet Lookup</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {verifiedUser 
                          ? `Found verified wallet: ${verifiedUser.wallet_address?.slice(0, 6)}...${verifiedUser.wallet_address?.slice(-4)}`
                          : "Searching for registered wallet address"}
                      </p>
                    </div>
                  </div>
                </div>
                
                {isLoading && (
                  <div className="mt-6 pt-6 border-t border-secondary/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg animate-pulse">
                        <div className="h-5 w-5 bg-primary/20 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-secondary/20 rounded animate-pulse"></div>
                        <div className="h-3 w-48 bg-secondary/10 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}
            
            {stage === ScanStage.PAYMENT && verifiedUser && (
              <CryptoPaymentProcess 
                recipientName={verifiedUser.name || "Verified User"} 
                walletAddress={verifiedUser.wallet_address || "0x000...0000"} 
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScanPage;