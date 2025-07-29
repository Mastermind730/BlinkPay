import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function LivenessDetection() {
  const [livenessChecks, setLivenessChecks] = useState({
    blinkDetected: false,
    headMovementDetected: false,
    depthAnalysisComplete: false,
    antiSpoofingVerified: false
  });
  
  const [isDetecting, setIsDetecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Ready to start detection");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startDetection = async () => {
    setIsDetecting(true);
    setStatusMessage("Initializing camera...");
    
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' 
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setStatusMessage("Performing liveness checks...");
      
      // Start periodic detection
      detectionIntervalRef.current = setInterval(captureAndDetect, 2000);
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      setStatusMessage("Failed to access camera");
      setIsDetecting(false);
    }
  };

  const stopDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsDetecting(false);
    setStatusMessage("Detection stopped");
  };

  const captureAndDetect = async () => {
    if (!videoRef.current) return;
    
    try {
      // Capture frame from video
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      });
      
      if (!imageBlob) return;
      
      // Send to API
      const formData = new FormData();
      formData.append('file', imageBlob, 'frame.jpg');
      
      const response = await fetch('http://localhost:8000/detect-liveness', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      // Update state with results
      setLivenessChecks(prev => ({
        ...prev,
        blinkDetected: result.blinkDetected || prev.blinkDetected,
        headMovementDetected: result.headMovementDetected || prev.headMovementDetected,
        depthAnalysisComplete: result.depthAnalysisComplete || prev.depthAnalysisComplete,
        antiSpoofingVerified: result.antiSpoofingVerified || prev.antiSpoofingVerified
      }));
      
      // Check if all tests passed
      if (Object.values(result).every(Boolean)) {
        stopDetection();
        setStatusMessage("All checks passed successfully!");
      }
      
    } catch (error) {
      console.error("Detection error:", error);
      setStatusMessage("Detection error occurred");
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopDetection();
    };
  }, []);

  return (
    <Card className="backdrop-blur-lg bg-background/50 border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Liveness Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Video preview */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video 
              ref={videoRef} 
              className="w-full h-auto"
              playsInline
              muted
            />
            {!isDetecting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <p className="text-white">Camera preview will appear here</p>
              </div>
            )}
          </div>
          
          {/* Status message */}
          <p className="text-sm text-center text-muted-foreground">
            {statusMessage}
          </p>
          
          {/* Detection controls */}
          <div className="flex justify-center gap-2">
            {!isDetecting ? (
              <button
                onClick={startDetection}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Start Detection
              </button>
            ) : (
              <button
                onClick={stopDetection}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
              >
                Stop Detection
              </button>
            )}
          </div>
          
          {/* Check items */}
          <div className="space-y-3 pt-2">
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