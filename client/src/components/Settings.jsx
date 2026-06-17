import { useState, useEffect } from "react";

// Simple Settings app – demonstrates theme toggle and placeholder options.
export const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Persist theme preference across refreshes using localStorage (optional).
    const saved = localStorage.getItem("webos_theme");
    return saved ? saved === "dark" : false;
  });

  // Apply theme class to <html> element for visual effect (you can define styles elsewhere).
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("webos_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("webos_theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col h-full bg-os-bg text-os-text p-6 space-y-6">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="flex items-center gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
            className="form-checkbox h-4 w-4 text-os-accent"
          />
          <span>Dark Mode</span>
        </label>
      </div>
      <hr className="border-t border-os-border-dark" />
      <div className="text-sm opacity-70">Other settings can be added here.</div>
    </div>
  );
};
