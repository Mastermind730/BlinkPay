import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaceScanner } from "./FaceScanner";
import { useToast } from "@/components/ui/use-toast";
import { Loader, CheckCircle, User, Mail, Wallet, Scan } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

enum EnrollmentStage {
  INFO,
  FACE_SCAN,
  WALLET_CONNECT,
  COMPLETE
}

// Define interfaces for component props
interface ProgressCircleProps {
  active: boolean;
  completed: boolean;
  num: number;
  icon: React.ReactNode;
}

interface ProgressTrackProps {
  active: boolean;
}

export default function UserEnrollment() {
  const [stage, setStage] = useState<EnrollmentStage>(EnrollmentStage.INFO);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [animating, setAnimating] = useState<boolean>(false);
  const { toast } = useToast();

  // Define typed interface for mouse position
  interface MousePosition {
    x: number;
    y: number;
  }

  // Background animation
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNextStage = (): void => {
    if (stage === EnrollmentStage.INFO) {
      if (!name || !email) {
        toast({
          title: "Missing information",
          description: "Please provide your name and email to continue.",
          variant: "destructive"
        });
        return;
      }
    }

    setAnimating(true);
    setTimeout(() => {
      setStage(prev => {
        const next = prev + 1;
        if (next > EnrollmentStage.COMPLETE) {
          return EnrollmentStage.COMPLETE;
        }
        return next;
      });
      setAnimating(false);
    }, 600);

    if (stage === EnrollmentStage.WALLET_CONNECT) {
      toast({
        title: "Enrollment Complete",
        description: "Your face biometrics have been securely registered.",
      });
    }
  };

  const stageIcons = [
    <User key="user" className="h-5 w-5" />,
    <Scan key="scan" className="h-5 w-5" />,
    <Wallet key="wallet" className="h-5 w-5" />,
    <CheckCircle key="check" className="h-5 w-5" />
  ];

  const renderStageContent = (): React.ReactNode => {
    switch (stage) {
      case EnrollmentStage.INFO:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-primary font-medium">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <div className="relative">
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                  placeholder="Enter your full name"
                  className="pl-3 transition-all border-primary/20 focus:border-primary/50 bg-background/60 backdrop-blur-sm"
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: name ? `${Math.min(100, name.length * 5)}%` : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-primary font-medium">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  className="pl-3 transition-all border-primary/20 focus:border-primary/50 bg-background/60 backdrop-blur-sm"
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: email ? `${Math.min(100, email.length * 3)}%` : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        );

      case EnrollmentStage.FACE_SCAN:
        return (
          <motion.div 
            className="py-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-4 mb-6">
              <div className="inline-flex rounded-full bg-primary/10 p-3 mx-auto">
                <Scan className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Please look directly at the camera and follow the instructions.
              </p>
            </div>
            <FaceScanner 
              onScanComplete={handleNextStage} 
              scanningText="Enrolling face biometrics"
              showLivenessDetection
            />
          </motion.div>
        );

      case EnrollmentStage.WALLET_CONNECT:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-4 mb-6">
              <div className="inline-flex rounded-full bg-primary/10 p-3 mx-auto">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Connect your blockchain wallet to link with your biometric profile.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="flex items-center justify-between w-full p-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 group"
                  onClick={handleNextStage}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 784.37 1277.39">
                      <motion.path 
                        fill="currentColor" 
                        d="M392.07 0L383.5 29.11 383.5 873.74 392.07 882.29 784.13 654.54z" 
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                      />
                      <motion.path 
                        fill="currentColor" 
                        d="M392.07 0L0 654.54 392.07 882.29 392.07 472.33z" 
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                      />
                      <motion.path 
                        fill="currentColor" 
                        d="M392.07 956.52L387.24 962.41 387.24 1263.3 392.07 1277.38 784.37 729z" 
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                      />
                      <motion.path 
                        fill="currentColor" 
                        d="M392.07 1277.38L392.07 956.52 0 729z" 
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
                      />
                      <motion.path 
                        fill="currentColor" 
                        d="M392.07 882.29L784.13 654.54 392.07 472.33z" 
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", delay: 0.1 }}
                      />
                      <motion.path 
                        fill="currentColor" 
                        d="M0 654.54L392.07 882.29 392.07 472.33z" 
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
                      />
                    </svg>
                    <ConnectButton chainStatus="icon" accountStatus="avatar" />
                  </div>
                  <motion.div 
                    className="h-6 w-6 rounded-full border-2 border-white flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="h-2 w-2 bg-white rounded-full" 
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="flex items-center justify-between w-full p-6 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 hover:from-purple-500/20 hover:to-fuchsia-500/20 border border-purple-500/20 group"
                  onClick={handleNextStage}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-purple-500" viewBox="0 0 398 312">
                      <motion.path 
                        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" 
                        fill="currentColor"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
                      />
                      <motion.path 
                        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" 
                        fill="currentColor"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                      />
                      <motion.path 
                        d="M333.1 120.1c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7z" 
                        fill="currentColor"
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                      />
                    </svg>
                    <span className="font-medium text-foreground">Connect Solana Wallet</span>
                  </div>
                  <motion.div 
                    className="h-6 w-6 rounded-full border-2 border-purple-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="h-2 w-2 bg-purple-500 rounded-full" 
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        );

      case EnrollmentStage.COMPLETE:
        return (
          <motion.div 
            className="py-8 flex flex-col items-center space-y-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div 
              className="rounded-full bg-primary/10 p-5"
              animate={{ 
                boxShadow: ["0 0 0 0px rgba(74, 222, 128, 0.2)", "0 0 0 15px rgba(74, 222, 128, 0)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <CheckCircle className="h-12 w-12 text-primary" />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    border: ["2px solid rgba(74, 222, 128, 0)", "2px solid rgba(74, 222, 128, 0.5)", "2px solid rgba(74, 222, 128, 0)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
            <div className="text-center">
              <motion.h3 
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Enrollment Complete
              </motion.h3>
              <motion.p 
                className="text-sm text-muted-foreground max-w-xs mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Your face biometrics have been securely linked to your wallet. You can now make payments just by looking at the camera.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                asChild 
                className="mt-4 px-8 py-6 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <a href="/scan">Make a Payment</a>
              </Button>
            </motion.div>
          </motion.div>
        );
    }
  };

  // Progress circle component
  const ProgressCircle = ({ active, completed, num, icon }: ProgressCircleProps): React.ReactElement => {
    return (
      <motion.div 
        className={`flex flex-col items-center gap-2 ${completed ? "text-primary" : active ? "text-primary/80" : "text-muted-foreground"}`}
      >
        <motion.div 
          className={`w-12 h-12 rounded-full flex items-center justify-center relative
          ${completed ? "bg-primary text-primary-foreground" : active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {completed ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <CheckCircle className="h-5 w-5" />
            </motion.div>
          ) : (
            <>
              {icon}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                initial={{ scale: active ? 1.2 : 1, opacity: active ? 1 : 0 }}
                animate={{ scale: active ? [1, 1.2, 1] : 1, opacity: active ? 1 : 0 }}
                transition={{ duration: 2, repeat: active ? Infinity : 0 }}
              />
            </>
          )}
        </motion.div>
        <span className="text-xs uppercase font-medium">
          {["Info", "Face", "Wallet", "Done"][num]}
        </span>
      </motion.div>
    );
  };

  // Track between progress circles
  const ProgressTrack = ({ active }: ProgressTrackProps): React.ReactElement => {
    return (
      <div className="relative flex-1 h-1 bg-muted">
        <motion.div 
          className="absolute h-1 bg-primary left-0 top-0"
          initial={{ width: "0%" }}
          animate={{ width: active ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 blur-3xl"
          animate={{
            x: [mousePosition.x/10, mousePosition.x/10 + 50, mousePosition.x/10],
            y: [mousePosition.y/10, mousePosition.y/10 - 50, mousePosition.y/10],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
          initial={{ top: "20%", right: "10%" }}
          animate={{
            x: [mousePosition.x/15, mousePosition.x/15 - 50, mousePosition.x/15],
            y: [mousePosition.y/15, mousePosition.y/15 + 50, mousePosition.y/15],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-3xl"
          initial={{ bottom: "10%", left: "10%" }}
          animate={{
            x: [mousePosition.x/20, mousePosition.x/20 + 70, mousePosition.x/20],
            y: [mousePosition.y/20, mousePosition.y/20 - 70, mousePosition.y/20],
          }}
          transition={{ duration: 13, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div 
        className="w-full max-w-md mx-auto z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full shadow-2xl bg-background/60 backdrop-blur-xl border border-white/10 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          <CardHeader className="relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-center text-xl md:text-2xl font-bold">
                {stage === EnrollmentStage.COMPLETE ? (
                  <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    Welcome to BlinkPay
                  </span>
                ) : (
                  "User Enrollment"
                )}
              </CardTitle>
            </motion.div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-8">
              <div className="relative pt-4">
                <div className="flex justify-between items-center">
                  <ProgressCircle 
                    active={stage === EnrollmentStage.INFO} 
                    completed={stage > EnrollmentStage.INFO}
                    num={0}
                    icon={stageIcons[0]}
                  />
                  <ProgressTrack active={stage > EnrollmentStage.INFO} />
                  <ProgressCircle 
                    active={stage === EnrollmentStage.FACE_SCAN} 
                    completed={stage > EnrollmentStage.FACE_SCAN}
                    num={1}
                    icon={stageIcons[1]}
                  />
                  <ProgressTrack active={stage > EnrollmentStage.FACE_SCAN} />
                  <ProgressCircle 
                    active={stage === EnrollmentStage.WALLET_CONNECT} 
                    completed={stage > EnrollmentStage.WALLET_CONNECT}
                    num={2} 
                    icon={stageIcons[2]}
                  />
                  <ProgressTrack active={stage > EnrollmentStage.WALLET_CONNECT} />
                  <ProgressCircle 
                    active={stage === EnrollmentStage.COMPLETE} 
                    completed={stage >= EnrollmentStage.COMPLETE}
                    num={3}
                    icon={stageIcons[3]} 
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <div key={stage} className="min-h-[300px] flex items-center">
                  {renderStageContent()}
                </div>
              </AnimatePresence>
            </div>
          </CardContent>
          
          {stage < EnrollmentStage.FACE_SCAN && (
            <CardFooter className="pb-6">
              <motion.div
                className="w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  className="w-full py-6 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  onClick={handleNextStage}
                  disabled={animating}
                >
                  {animating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Loader className="h-4 w-4" />
                    </motion.div>
                  ) : null}
                  Continue
                </Button>
              </motion.div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
}