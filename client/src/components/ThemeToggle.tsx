
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-transform hover:scale-110"
    >
      {theme === "light" ? (
        <Sun className="h-6 w-6 text-primary animate-in" />
      ) : (
        <Moon className="h-6 w-6 text-primary animate-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
