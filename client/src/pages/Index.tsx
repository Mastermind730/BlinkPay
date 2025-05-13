
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(40%_40%_at_50%_60%,rgba(59,130,246,0.1),rgba(99,102,241,0.05),transparent)]" />
        
        <div className="container max-w-6xl mx-auto px-4 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 lg:pr-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Pay with your face,
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mt-2">
                    secured by blockchain.
                  </span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  BlinkPay combines facial recognition and blockchain technology for secure,
                  instant cryptocurrency payments. No more typing long wallet addresses.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Link to="/enroll">Enroll Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/scan">Make a Payment</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 rounded-lg border border-border/40 bg-card/50">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-center text-muted-foreground">Secure</div>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border border-border/40 bg-card/50">
                  <div className="text-2xl font-bold text-secondary">3s</div>
                  <div className="text-sm text-center text-muted-foreground">Recognition</div>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border border-border/40 bg-card/50">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-center text-muted-foreground">Available</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl p-1">
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                  <div className="aspect-[4/3] relative">
                    {/* Face scan animation */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-dashed border-primary/30 animate-spin-slow" />
                      <div className="absolute w-40 h-40 md:w-56 md:h-56 border-2 border-secondary/30 rounded-full animate-pulse" />
                      <div className="absolute w-28 h-28 md:w-40 md:h-40 border-2 border-secondary/30 rounded-full animate-pulse" />
                      
                      {/* Face outline */}
                      <svg 
                        className="absolute w-40 h-40 md:w-56 md:h-56 animate-float" 
                        viewBox="0 0 100 100" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M50,10 C28,10 15,30 15,50 C15,75 35,90 50,90 C65,90 85,75 85,50 C85,30 72,10 50,10 Z" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1"
                          className="text-primary/60"
                        />
                        <circle cx="35" cy="40" r="5" className="text-secondary/80 fill-current" />
                        <circle cx="65" cy="40" r="5" className="text-secondary/80 fill-current" />
                        <path 
                          d="M30,60 Q50,68 70,60" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          className="text-primary/60"
                        />
                      </svg>
                      
                      {/* Scanning animation */}
                      <div className="scanner-line"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-card/80 backdrop-blur-sm shadow-lg border border-border/30 animate-float z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Identity Verified</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-card/80 backdrop-blur-sm shadow-lg border border-border/30 animate-float z-10 delay-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Payment Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How BlinkPay Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining facial recognition with blockchain for secure, frictionless payments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-primary" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M17 8h.01" />
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M16 2v2" />
                  <path d="M8 2v2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">1. User Enrollment</h3>
              <p className="text-muted-foreground">
                Register your facial biometrics securely and link it to your blockchain wallets through our zero-knowledge proof system.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-primary" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M15 8h.01" />
                  <path d="M11 12a4 4 0 0 1 0-8H7a4 4 0 0 1 0 8h4Z" />
                  <path d="M7 12h8" />
                  <path d="M13 12a4 4 0 0 1 0 8h4a4 4 0 0 1 0-8h-4Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">2. Payment Initiation</h3>
              <p className="text-muted-foreground">
                To send crypto, scan the recipient's face. Our AI verifies identity and retrieves the linked wallet address instantly.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-primary" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">3. Transaction Authorization</h3>
              <p className="text-muted-foreground">
                Confirm the amount and complete the transaction with multi-factor authentication for enhanced security.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Advanced Security Features</h2>
                <p className="text-xl text-muted-foreground">
                  BlinkPay employs cutting-edge technology to ensure your identity and transactions are always protected.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
                      <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
                      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                      <path d="M2 16h.01" />
                      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                      <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Liveness Detection</h3>
                    <p className="text-muted-foreground">
                      Advanced anti-spoofing technology prevents photo and video fraud attempts.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-secondary" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Multi-factor Authentication</h3>
                    <p className="text-muted-foreground">
                      Additional layers of security including PIN or hardware wallet approval.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-accent" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Encrypted Templates</h3>
                    <p className="text-muted-foreground">
                      Only mathematical representations of facial features are stored, never actual images.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Link to="/enroll">Get Started Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative lg:pl-10">
              <div className="bg-gradient-radial from-primary/5 to-transparent absolute inset-0 -z-10" />
              
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-card row-span-2 animate-float delay-100">
                  <div className="aspect-[3/4] relative bg-gradient-to-br from-primary/10 to-secondary/10 p-5 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-14 w-14 text-primary/50" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
                
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-card animate-float delay-300">
                  <div className="aspect-square relative bg-gradient-to-tr from-secondary/10 to-accent/10 p-5 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-10 w-10 text-secondary/50" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="m22 9-10 3L2 9l10-3 10 3" />
                      <path d="M12 12v9" />
                      <path d="m19 16-7 3-7-3" />
                    </svg>
                  </div>
                </div>
                
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-card animate-float">
                  <div className="aspect-square relative bg-gradient-to-bl from-accent/10 to-primary/10 p-5 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-10 w-10 text-accent/50" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v8"></path>
                      <rect width="20" height="12" x="2" y="10" rx="2"></rect>
                      <path d="m6 16 2 2 8-8"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-accent relative">
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent mix-blend-overlay" />
            <div className="p-10 md:p-16 relative z-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to experience the future of payments?
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Join BlinkPay today and start making secure facial recognition payments across multiple blockchains.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/enroll">Enroll Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Link to="/scan">Try a Demo</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M45.7,-77.8C58.9,-69.3,69.2,-56.3,77.7,-42.3C86.2,-28.4,93,-13.5,91.4,0.4C89.9,14.2,80.1,27.1,70,38.6C59.9,50.1,49.5,60.3,37.2,67.4C24.8,74.6,10.4,78.8,-2.9,76.8C-16.2,74.9,-28.4,66.9,-40.7,58.3C-53,49.8,-65.3,40.7,-73.7,28.3C-82.1,15.8,-86.7,0,-82.9,-13.5C-79.2,-27.1,-67.1,-38.3,-54.4,-47.1C-41.7,-55.8,-28.3,-62,-14.2,-69.8C-0.1,-77.6,12.7,-87.1,27.7,-86.3C42.6,-85.4,59.8,-74.2,77.3,-34.3C94.8,5.5,112.4,74.1,171.3,113.6" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
