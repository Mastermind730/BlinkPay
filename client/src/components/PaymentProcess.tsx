
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {BrowserProvider, ethers} from "ethers";


enum PaymentStatus {
  PREPARING,
  CONFIRMING,
  PROCESSING,
  COMPLETE
}

interface PaymentProcessProps {
  payeeName?: string;
  payeeWallet?: string;
}

export function PaymentProcess({ payeeName = "Alex Chen", payeeWallet = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" }: PaymentProcessProps) {
  const [amount, setAmount] = useState("0.05");
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.PREPARING);
  const [processingStep, setProcessingStep] = useState(0);
  const [provider,setProvider]=useState<BrowserProvider| null>(null);
  const [transactionHash,setHash]=useState<string|null>();
  const { toast } = useToast();


  // setting the provider using ethers.js
 useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);
      } catch (error) {
        console.error("Error initializing provider:", error);
        toast({
          title: "Wallet Error",
          description: "Failed to connect to wallet provider",
          variant: "destructive"
        });
      }
    }
  }, []);

 const sendPayment = async () => {
  if (!provider) {
    toast({
      title: "Wallet Not Connected",
      description: "Please connect your wallet first",
      variant: "destructive"
    });
    return null;
  }

  try {
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({
      to: payeeWallet,
      value: ethers.parseEther(amount),
    });
    const reciept=await tx.wait();
    console.log(tx.hash);
    setHash(tx.hash);
    return tx;
  } catch (error) {
    console.error("Transaction failed:", error);
    toast({
      title: "Transaction Failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    return null;
  }
};
  const shortenWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };



   const handleSubmit = async () => { 
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to send.",
        variant: "destructive"
      });
      return;
    }
    
    const tx = await sendPayment();
    if (tx) {
      setStatus(PaymentStatus.CONFIRMING);
    }
  };

  const confirmPayment = () => {
    setStatus(PaymentStatus.PROCESSING);
    
    // Simulate transaction steps
    const steps = [
      "Retrieving wallet details",
      "Preparing transaction",
      "Signing transaction",
      "Broadcasting to network",
      "Awaiting confirmation"
    ];
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length - 1) {
        setProcessingStep(++step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStatus(PaymentStatus.COMPLETE);
          toast({
            title: "Payment Successful",
            description: `You've sent ${amount} ETH to ${payeeName}.`,
          });
        }, 1500);
      }
    }, 800);
    
    return () => clearInterval(interval);
  };

  const getStatusBadge = () => {
    switch (status) {
      case PaymentStatus.PREPARING:
        return <Badge variant="outline">New Payment</Badge>;
      case PaymentStatus.CONFIRMING:
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Awaiting Confirmation</Badge>;
      case PaymentStatus.PROCESSING:
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Processing</Badge>;
      case PaymentStatus.COMPLETE:
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Complete</Badge>;
    }
  };

  const renderContent = () => {
    switch (status) {
      case PaymentStatus.PREPARING:
        return (
          <div className="space-y-4 animate-in">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <div className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-lg font-medium">
                  {payeeName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{payeeName}</p>
                  <p className="text-xs text-muted-foreground">{shortenWalletAddress(payeeWallet)}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (ETH)</Label>
              <Input 
                id="amount" 
                type="number"
                min="0.0001"
                step="0.001"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="0.00"
              />
            </div>
          </div>
        );
        
      case PaymentStatus.CONFIRMING:
        return (
          <div className="space-y-4 animate-in">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Recipient:</span>
                <span className="font-medium">{payeeName}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Wallet:</span>
                <span className="font-mono text-xs">{shortenWalletAddress(payeeWallet)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">{amount} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network Fee:</span>
                <span className="font-medium">0.0005 ETH</span>
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 flex justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="font-bold">{(parseFloat(amount) + 0.0005).toFixed(4)} ETH</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Please confirm the payment details before proceeding.
            </p>
          </div>
        );
        
      case PaymentStatus.PROCESSING:
        { const steps = [
          "Retrieving wallet details",
          "Preparing transaction",
          "Signing transaction",
          "Broadcasting to network",
          "Awaiting confirmation"
        ];
        
        return (
          <div className="py-4 space-y-6 animate-in">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-t-primary border-primary/30 animate-spin" />
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    processingStep > index 
                      ? "bg-green-500 text-white" 
                      : processingStep === index 
                        ? "bg-blue-500 text-white animate-pulse" 
                        : "bg-muted"
                  }`}>
                    {processingStep > index ? (
                      <Check className="h-4 w-4" />
                    ) : processingStep === index ? (
                      <Clock className="h-3 w-3" />
                    ) : null}
                  </div>
                  <span className={`text-sm ${processingStep >= index ? "text-foreground" : "text-muted-foreground"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Please do not close this window while the transaction is being processed.
            </p>
          </div>
        ); }
        
      case PaymentStatus.COMPLETE:
        return (
          <div className="py-8 flex flex-col items-center space-y-5 animate-in">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-1">Payment Complete</h3>
              <p className="text-sm text-muted-foreground">
                You've successfully sent {amount} ETH to {payeeName}
              </p>
            </div>
           <div className="space-y-1 w-full text-center">
        <p className="text-xs text-muted-foreground">Transaction Hash</p>
        <p className="text-xs font-mono bg-muted/50 p-2 rounded-md break-all">
          {transactionHash || "0x..."}
        </p>
      </div>
      <Button variant="outline" asChild className="mt-4">
        <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
          View on Etherscan
        </a>
      </Button>
            <Button variant="outline" asChild className="mt-4">
              <a href="/">Return Home</a>
            </Button>
          </div>
        );
    }
  };

  const renderFooter = () => {
    switch (status) {
      case PaymentStatus.PREPARING:
        return (
          <Button className="w-full" onClick={handleSubmit}>
            Continue
          </Button>
        );
      case PaymentStatus.CONFIRMING:
        return (
          <div className="w-full grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => setStatus(PaymentStatus.PREPARING)}>
              Back
            </Button>
            <Button onClick={confirmPayment}>
              Confirm Payment
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-background/80 backdrop-blur-lg border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payment</CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
      {renderFooter() && (
        <CardFooter>
          {renderFooter()}
        </CardFooter>
      )}
    </Card>
  );
}
