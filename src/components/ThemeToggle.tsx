"use client";

import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      const next = media.matches ? "dark" : "light";
      setTheme(next);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Activer le mode jour" : "Activer le mode nuit"
      }
      title={theme === "dark" ? "Mode jour" : "Mode nuit"}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-solid)] text-[var(--fg)] shadow-sm transition hover:bg-[var(--surface)]"
    >
      {theme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="M4.2 6.2l1.4 1.4" />
          <path d="M18.4 17.4l1.4 1.4" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="M4.2 17.8l1.4-1.4" />
          <path d="M18.4 6.6l1.4-1.4" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M21 12.6A8.5 8.5 0 1 1 11.4 3 7 7 0 0 0 21 12.6z" />
        </svg>
      )}
    </button>
  );
}
