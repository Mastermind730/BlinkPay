
import UserEnrollment  from "@/components/UserEnrollment";
import { Layout } from "@/components/Layout";

const Enroll = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-lg opacity-50 animate-pulse"></div>
              <h1 className="relative text-4xl font-bold tracking-tight z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                User Enrollment
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Register your facial biometrics to start making secure crypto payments with just a glance.
          </p>
        </div>
        
        <div className="mt-10 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl -z-10 transform rotate-1 scale-105 blur-sm"></div>
          <UserEnrollment />
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in">
          <div className="group p-6 rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text group-hover:text-transparent transition-all duration-300">Secure</h3>
            <p className="text-sm text-muted-foreground">
              Your facial data is protected with advanced encryption and zero-knowledge proof technology.
            </p>
          </div>
          
          <div className="group p-6 rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/5 hover:-translate-y-1" style={{ transitionDelay: "0.1s" }}>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-secondary" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text group-hover:text-transparent transition-all duration-300">Simple</h3>
            <p className="text-sm text-muted-foreground">
              No more typing wallet addresses. Just scan a face and send payment instantly.
            </p>
          </div>
          
          <div className="group p-6 rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1" style={{ transitionDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-accent" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text group-hover:text-transparent transition-all duration-300">Innovative</h3>
            <p className="text-sm text-muted-foreground">
              Combining blockchain technology with biometric security for the future of payments.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Enroll;
