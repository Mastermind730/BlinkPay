
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full py-4 px-6 border-b border-border/40 backdrop-blur-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-gradient-to-tr from-primary to-accent w-10 h-10 flex items-center justify-center shadow-lg">
            <span className="font-bold text-white text-xl">BP</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            BlinkPay
          </h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/enroll" className="text-foreground/80 hover:text-primary transition-colors">
              Enroll
            </Link>
            <Link to="/scan" className="text-foreground/80 hover:text-primary transition-colors">
              Pay
            </Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
              Dashboard
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link to="/enroll">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
