import { useState, useEffect } from "react";

export const TaskBar = () => {
  const [time, setTime] = useState("");

  // Ticking clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12
      setTime(`${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between fixed bottom-0 w-full bg-os-panel text-os-text h-40 px-8 border-t border-t-os-border-light select-none">
      
      {/* Left side: Launcher and open apps */}
      <div className="flex items-center h-full">
        {/* Launcher Button */}
        <button className="bg-os-panel os-bevel-out active:os-bevel-in px-12 py-8 font-bold font-sans text-[10px] tracking-wide flex items-center gap-4 cursor-pointer select-none">
          {/* 2x2 Grid Icon */}
          <span className="grid grid-cols-2 gap-[2px] w-[10px] h-[10px] shrink-0">
            <span className="bg-os-text"></span>
            <span className="bg-os-text"></span>
            <span className="bg-os-text"></span>
            <span className="bg-os-text"></span>
          </span>
          LAUNCHER
        </button>

        {/* Vertical Divider */}
        <div className="w-[2px] h-[16px] border-l border-l-os-border-dark border-r border-r-os-border-light mx-12"></div>

        {/* Active Application tab (Notes) */}
        <button className="bg-os-window os-bevel-in px-12 py-8 font-sans text-[10px] flex items-center gap-8 cursor-pointer text-left">
          <span className="text-xs">🗒️</span>
          <span className="font-semibold text-os-text opacity-40">Notes</span>
        </button>
      </div>

      {/* Right side: System Tray */}
      <div className="os-bevel-in bg-os-panel px-12 py-8 font-sans text-[10px] text-os-text flex items-center gap-16 select-none">
        <span className="cursor-pointer text-xs">🔊</span>
        <span className="cursor-pointer text-xs">📶</span>
        <span className="font-mono tracking-wide font-semibold">{time}</span>
      </div>

    </div>
  );
};
