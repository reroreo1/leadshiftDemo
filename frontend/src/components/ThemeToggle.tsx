import React from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "components/Switch";
import { cn } from "utils/cn";

interface Props {
  className?: string;
}

export function ThemeToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

