
import { Header } from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-10 animate-fade-in">{children}</main>
      <footer className="py-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2025 BlinkPay — Secure facial recognition payments</p>
        </div>
      </footer>
    </div>
  );
}
