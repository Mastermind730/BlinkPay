import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Webcam from "react-webcam";

interface FaceScannerProps {
  onScanComplete: (imageData: string) => void; // Changed to expect image data string
  scanningText?: string;
  showLivenessDetection?: boolean;
  isLoading?: boolean;
}

export function FaceScanner({
  onScanComplete,
  scanningText = "Scanning face",
  showLivenessDetection = false,
}: FaceScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (scanning) return;

    setScanning(true);
    setScanProgress(0);

    const timer = setTimeout(async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        try {
          const result = await sendFaceImageForVerification(imageSrc);
          if (onScanComplete) onScanComplete(result);
        } catch (error) {
          console.error("Face verification failed:", error);
          if (onScanComplete)
            onScanComplete({ verified: false, username: null });
        }
      }

      setScanning(false);
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
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          videoConstraints={{ facingMode: "user" }}
        />

        {/* Overlay and UI remains the same */}
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
          <p className="text-sm font-medium">{scanningText}</p>
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
          <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
            <span>Checking liveness</span>
            <span>Analyzing facial features</span>
          </div>
        )}
      </div>
    </Card>
  );
}

// Sends the captured image to the FastAPI server
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


