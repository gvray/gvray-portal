"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import IconButton from "@/components/ui/IconButton";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      srLabel={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      glow
      className="theme-toggle text-text-primary duration-300"
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-500 ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </IconButton>
  );
}
