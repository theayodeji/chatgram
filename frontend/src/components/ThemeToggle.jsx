import React, { useEffect } from "react";
import useThemeStore from "../store/useThemeStore";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.querySelector(".icon").addEventListener("click", function () {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
  }, [theme]);

  return (
    <div className="icon cursor-pointer">
        {theme !== "light" ? (
            <SunIcon />
        ) : (
            <MoonIcon />
        )}
      
    </div>
  );
};

export default ThemeToggle;
