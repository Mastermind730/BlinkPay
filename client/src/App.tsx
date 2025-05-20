
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Enroll from "./pages/Enroll";
import Scan from "./pages/Scan";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { config } from "./utils/config";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

const App = () => (
      <WagmiProvider config={config}>

  <QueryClientProvider client={queryClient}>
    <RainbowKitProvider modalSize="compact">
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    </RainbowKitProvider>
  </QueryClientProvider>
  </WagmiProvider>
);

export default App;
