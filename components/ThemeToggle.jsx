"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className={`theme-toggle-thumb ${isDark ? "is-dark" : "is-light"}`}>
        {isDark ? <Moon size={15} /> : <Sun size={15} />}
      </span>
      <span className="theme-toggle-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
