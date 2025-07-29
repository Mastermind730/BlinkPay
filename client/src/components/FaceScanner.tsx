import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Webcam from "react-webcam";
import { CheckCircle } from "lucide-react";

interface FaceScannerProps {
  onScanComplete?: (result: {
    verified: boolean;
    username: string | null;
  }) => void;
  scanningText?: string;
  showLivenessDetection?: boolean;
}

interface LivenessResult {
  blinkDetected: boolean;
  headMovementDetected: boolean;
  depthAnalysisComplete: boolean;
  antiSpoofingVerified: boolean;
}

export function FaceScanner({
  onScanComplete,
  scanningText = "Scanning face",
  showLivenessDetection = false,
}: FaceScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [livenessChecks, setLivenessChecks] = useState<LivenessResult>({
    blinkDetected: false,
    headMovementDetected: false,
    depthAnalysisComplete: false,
    antiSpoofingVerified: false
  });
  const [statusMessage, setStatusMessage] = useState("Ready to start scanning");
  const webcamRef = useRef<Webcam>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startDetection = async () => {
    setScanning(true);
    setStatusMessage("Initializing camera...");
    setScanProgress(0);
    setLivenessChecks({
      blinkDetected: false,
      headMovementDetected: false,
      depthAnalysisComplete: false,
      antiSpoofingVerified: false
    });

    // Progress animation
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3.33;
      });
    }, 100);

    // Start periodic detection
    detectionIntervalRef.current = setInterval(async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      try {
        // First verify face
        const verificationResult = await sendFaceImageForVerification(imageSrc);
        
        // Then check liveness if enabled
        if (showLivenessDetection) {
          const livenessResult = await checkLiveness(imageSrc);
          setLivenessChecks(livenessResult);
          
          // Check if all liveness tests passed
          const allPassed = Object.values(livenessResult).every(Boolean);
          if (allPassed && verificationResult.verified) {
            stopDetection();
            setStatusMessage("Verification complete!");
            if (onScanComplete) onScanComplete(verificationResult);
          }
        } else {
          // If liveness not enabled, complete after first successful verification
          if (verificationResult.verified) {
            stopDetection();
            setStatusMessage("Verification complete!");
            if (onComplete) onComplete(verificationResult);
          }
        }
      } catch (error) {
        console.error("Detection error:", error);
        setStatusMessage("Error during detection");
      }
    }, 2000);

    return () => {
      clearInterval(progressInterval);
    };
  };

  const stopDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  // Sends the captured image to the FastAPI server for verification
  async function sendFaceImageForVerification(imageDataUrl: string) {
    const blob = await (await fetch(imageDataUrl)).blob();
    const formData = new FormData();
    formData.append("file", blob, "face.jpg");

    const response = await fetch("http://localhost:8000/verify-face", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to verify face");
    }

    return await response.json();
  }

  // Checks liveness features
  async function checkLiveness(imageDataUrl: string): Promise<LivenessResult> {
    const blob = await (await fetch(imageDataUrl)).blob();
    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    const response = await fetch("http://localhost:8000/liveness-check", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to check liveness");
    }

    return await response.json();
  }

  return (
    <Card className="w-full max-w-md mx-auto p-1 overflow-hidden glass-morphism bg-gradient-to-br from-background/50 to-background/30">
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          videoConstraints={{ facingMode: "user" }}
        />

        {/* Scanner UI elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-4 border-dashed border-secondary/60 rounded-full animate-spin-slow opacity-70" />
          <div className="absolute w-4/5 h-4/5 border-2 border-primary/40 rounded-full" />
          <div className="absolute w-3/5 h-3/5 border-2 border-primary/40 rounded-full" />
          <div className="absolute w-2/5 h-2/5 border-2 border-primary/40 rounded-full" />
        </div>

        {/* Scanner animation */}
        <div className="scanner-line z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5"></div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">{statusMessage}</p>
          <span className="text-xs text-muted-foreground">
            {Math.round(scanProgress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
            style={{ width: `${scanProgress}%` }}
          />
        </div>

        {showLivenessDetection && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Blink Detection</span>
              {livenessChecks.blinkDetected ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Head Movement</span>
              {livenessChecks.headMovementDetected ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">3D Depth Analysis</span>
              {livenessChecks.depthAnalysisComplete ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Anti-Spoofing</span>
              {livenessChecks.antiSpoofingVerified ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              )}
            </div>
          </div>
        )}

        {!scanning && (
          <button
            onClick={startDetection}
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Start Face Scan
          </button>
        )}
      </div>
    </Card>
  );
}