import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PaymentProcess } from "@/components/PaymentProcess";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Payment = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // This is a fallback in case someone navigates directly to /payment
    // In normal flow, this would be accessed after face scanning
    // const fallbackTimer = setTimeout(() => {
    //   navigate("/scan");
    // }, 100);
    
    // Animation sequence timer
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(loadTimer);
    };
  }, [navigate]);

  // Particles configuration
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: 2 + Math.random() * 6,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  // Orbital elements configuration
  const orbitals = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    size: 200 + i * 100,
    duration: 30 + i * 15,
    delay: i * 2,
    direction: i % 2 === 0 ? 1 : -1,
  }));

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-10 relative min-h-screen flex flex-col items-center justify-center">
        {/* Advanced Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-slate-950 to-slate-900">
          {/* Main glow elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
            className="absolute top-3/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          />
          
          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`, 
                opacity: 0,
              }}
              animate={{ 
                x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`, `${(particle.x - 10) % 100}%`, `${particle.x}%`],
                y: [`${particle.y}%`, `${(particle.y - 20) % 100}%`, `${(particle.y + 10) % 100}%`, `${particle.y}%`],
                opacity: [0, particle.opacity, particle.opacity, 0]
              }}
              transition={{ 
                duration: particle.duration, 
                repeat: Infinity, 
                delay: particle.delay,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1]
              }}
              className="absolute rounded-full bg-white"
              style={{ width: particle.size, height: particle.size }}
            />
          ))}
          
          {/* Orbital elements */}
          {orbitals.map((orbital) => (
            <motion.div
              key={orbital.id}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.1, rotate: 360 * orbital.direction }}
              transition={{ 
                opacity: { duration: 3 },
                rotate: { duration: orbital.duration, repeat: Infinity, ease: "linear" },
                delay: orbital.delay
              }}
              className="absolute top-1/2 left-1/2 rounded-full border border-white/10"
              style={{ 
                width: orbital.size, 
                height: orbital.size, 
                marginLeft: -orbital.size/2, 
                marginTop: -orbital.size/2
              }}
            >
              <motion.div 
                className="absolute w-4 h-4 bg-primary rounded-full blur-sm"
                style={{ left: '50%', marginLeft: -8, top: -2 }}
              />
            </motion.div>
          ))}
          
          {/* Sacred geometry vector pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="50%" cy="50%" r="30%" fill="none" stroke="url(#gradient)" strokeWidth="0.5" />
            <circle cx="50%" cy="50%" r="20%" fill="none" stroke="url(#gradient)" strokeWidth="0.5" />
            <circle cx="50%" cy="50%" r="10%" fill="none" stroke="url(#gradient)" strokeWidth="0.5" />
          </svg>
        </div>
        
        {/* Header with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }} 
          className="max-w-2xl mx-auto mb-10 text-center"
        >
          <div className="relative mb-6 inline-block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: [0.9, 1.05, 1] }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-xl opacity-30 rounded-lg"
            />
            <motion.div
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary px-6 py-2"
            >
              Complete Your Payment
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg text-muted-foreground"
          >
            <span className="inline-block">
              Recipient identified
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >_</motion.span>
            </span>
            {" "}Complete your payment securely.
          </motion.p>
        </motion.div>
        
        {/* Main payment component with animated entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full mt-10 relative"
        >
          {/* Animated background effect for the payment card */}
          <div className="absolute inset-0 -z-10">
            <motion.div 
              initial={{ opacity: 0.3, rotate: 1 }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                rotate: [1, 1.5, 1],
                scale: [1.05, 1.07, 1.05]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-2xl blur-md"
            />
            <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/30 rounded-2xl" />
          </div>
          
          {/* Card border glow effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <motion.div 
              initial={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary))" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 p-[1px] rounded-2xl"
              style={{ backgroundSize: "200% 100%" }}
            >
              <div className="absolute inset-0 bg-slate-900/90 rounded-[calc(1rem-1px)]" />
            </motion.div>
            
            {/* Actual payment content */}
            <div className="relative py-8 px-4 sm:px-8">
              <PaymentProcess />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Security indicators with animated entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            {
              icon: (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              ),
              text: "End-to-end encrypted",
              delay: 0
            },
            {
              icon: (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
              text: "Verified connection",
              delay: 0.1
            },
            {
              icon: (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              text: "Real-time processing",
              delay: 0.2
            },
            {
              icon: (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              ),
              text: "Protected transaction",
              delay: 0.3
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + item.delay }}
              className="flex items-center gap-2 text-sm bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 shadow-lg"
            >
              <motion.div 
                initial={{ color: "rgb(34, 197, 94)" }} 
                animate={{ color: ["rgb(34, 197, 94)", "rgb(99, 102, 241)", "rgb(34, 197, 94)"] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-green-500"
              >
                {item.icon}
              </motion.div>
              <span className="text-slate-300">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Floating 3D card effect in the background */}
        <div className="absolute -z-5 opacity-30 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ rotateY: 0, rotateX: 0 }}
            animate={{ rotateY: [0, 10, 0, -10, 0], rotateX: [0, 5, 0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              perspective: "1000px", 
              transformStyle: "preserve-3d",
              width: "500px",
              height: "300px",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginLeft: "-250px",
              marginTop: "-150px",
            }}
          >
            <div className="absolute inset-0 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;