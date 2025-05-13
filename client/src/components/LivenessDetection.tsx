
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function LivenessDetection() {
  const [livenessChecks, setLivenessChecks] = useState({
    blinkDetected: false,
    headMovementDetected: false,
    depthAnalysisComplete: false,
    antiSpoofingVerified: false
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setLivenessChecks(prev => ({ ...prev, blinkDetected: true })), 1000),
      setTimeout(() => setLivenessChecks(prev => ({ ...prev, headMovementDetected: true })), 2000),
      setTimeout(() => setLivenessChecks(prev => ({ ...prev, depthAnalysisComplete: true })), 2800),
      setTimeout(() => setLivenessChecks(prev => ({ ...prev, antiSpoofingVerified: true })), 3500)
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <Card className="backdrop-blur-lg bg-background/50 border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Liveness Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <LivenessCheckItem 
            label="Blink Detection" 
            complete={livenessChecks.blinkDetected} 
          />
          <LivenessCheckItem 
            label="Head Movement Analysis" 
            complete={livenessChecks.headMovementDetected} 
          />
          <LivenessCheckItem 
            label="3D Depth Analysis" 
            complete={livenessChecks.depthAnalysisComplete} 
          />
          <LivenessCheckItem 
            label="Anti-Spoofing Verification" 
            complete={livenessChecks.antiSpoofingVerified} 
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface LivenessCheckItemProps {
  label: string;
  complete: boolean;
}

function LivenessCheckItem({ label, complete }: LivenessCheckItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {complete ? (
          <div className="h-4 w-4 text-green-500">
            <CheckCircle className="h-4 w-4" />
          </div>
        ) : (
          <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        )}
        <span className="text-sm">{label}</span>
      </div>
      <span className={`text-xs ${complete ? 'text-green-500' : 'text-muted-foreground'}`}>
        {complete ? 'Verified' : 'Checking...'}
      </span>
    </div>
  );
}
