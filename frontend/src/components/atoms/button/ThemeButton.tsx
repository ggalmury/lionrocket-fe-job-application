import { useEffect, useState } from "react";
import clsx from "clsx";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme as Theme;
  }

  const isSystemThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return isSystemThemeDark ? "dark" : "light";
};

const ThemeButton = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      className={clsx("relative flex h-7 w-14 items-center rounded-full transition-colors", isDark ? "bg-gray-600" : "bg-primary-600")}
      title={isDark ? "라이트 모드" : "다크 모드"}
      onClick={toggleTheme}
    >
      <span className={clsx("absolute top-1/2 -translate-y-1/2 text-sm", isDark ? "left-1" : "right-1")}>{isDark ? "🌙" : "☀️"}</span>

      <span className={clsx("absolute top-1/2 h-5 w-5 rounded-full bg-white -translate-y-1/2", isDark ? "right-1" : "left-1")} />
    </button>
  );
};

export default ThemeButton;
