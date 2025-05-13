
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface FaceScannerProps {
  onScanComplete?: () => void;
  scanningText?: string;
  showLivenessDetection?: boolean;
}

export function FaceScanner({ 
  onScanComplete, 
  scanningText = "Scanning face",
  showLivenessDetection = false
}: FaceScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (scanning) return;

    setScanning(true);
    const timer = setTimeout(() => {
      setScanning(false);
      if (onScanComplete) onScanComplete();
    }, 3000);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3.33;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onScanComplete]);

  return (
    <Card className="w-full max-w-md mx-auto p-1 overflow-hidden glass-morphism bg-gradient-to-br from-background/50 to-background/30">
      <div className="relative aspect-square rounded-md overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-4 border-dashed border-secondary/60 rounded-full animate-spin-slow opacity-70" />
          <div className="absolute w-4/5 h-4/5 border-2 border-primary/40 rounded-full" />
          <div className="absolute w-3/5 h-3/5 border-2 border-primary/40 rounded-full" />
          <div className="absolute w-2/5 h-2/5 border-2 border-primary/40 rounded-full" />
        </div>

        {/* Face outline placeholder */}
        <svg 
          className="absolute inset-0 w-full h-full p-12 animate-float" 
          viewBox="0 0 100 100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M50,10 C28,10 15,30 15,50 C15,75 35,90 50,90 C65,90 85,75 85,50 C85,30 72,10 50,10 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-primary/40"
          />
          {/* Eyes */}
          <circle cx="35" cy="40" r="5" className="text-secondary fill-current" />
          <circle cx="65" cy="40" r="5" className="text-secondary fill-current" />
          
          {showLivenessDetection && (
            <>
              <path 
                d="M30,60 Q50,70 70,60" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-accent"
              />
              <line x1="30" y1="30" x2="40" y2="35" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
              <line x1="70" y1="30" x2="60" y2="35" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
            </>
          )}
        </svg>

        {/* Scanner animation */}
        <div className="scanner-line z-10"></div>
        
        {/* Camera effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5"></div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">{scanningText}</p>
          <span className="text-xs text-muted-foreground">{Math.round(scanProgress)}%</span>
        </div>
        <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
            style={{ width: `${scanProgress}%` }}
          />
        </div>
        {showLivenessDetection && (
          <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
            <span>Checking liveness</span>
            <span>Analyzing facial features</span>
          </div>
        )}
      </div>
    </Card>
  );
}
