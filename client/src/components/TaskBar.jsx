import { useState, useEffect } from "react";

const ALL_APPS = {
  terminal: { label: "Terminal", icon: "📺" },
  storage: { label: "Storage", icon: "📂" },
  gallery: { label: "Gallery", icon: "🖼️" },
  notes: { label: "Notes", icon: "🗒️" },
  settings: { label: "Settings", icon: "⚙️" },
};

export const TaskBar = ({
  openWindows = [],
  activeWindowId,
  onOpenWindow,
  onFocusWindow,
  onMinimizeWindow,
  pinnedApps = [],
  onTogglePin,
}) => {
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

  // Union of open windows and pinned apps to compute visible taskbar tabs
  const visibleAppIds = Array.from(
    new Set([...openWindows.map((w) => w.id), ...pinnedApps])
  );

  return (
    <div className="flex items-center justify-between fixed bottom-0 w-full bg-os-panel text-os-text h-40 px-8 border-t border-t-os-border-light select-none z-[100]">
      
      {/* Left side: Launcher and open/pinned apps */}
      <div className="flex items-center h-full gap-4">
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
        <div className="w-[2px] h-[16px] border-l border-l-os-border-dark border-r border-r-os-border-light mx-8"></div>

        {/* Dynamic App Tabs */}
        <div className="flex items-center gap-8 h-full">
          {visibleAppIds.map((appId) => {
            const app = ALL_APPS[appId];
            if (!app) return null;

            const openWin = openWindows.find((w) => w.id === appId);
            const isOpen = !!openWin;
            const isActive = activeWindowId === appId;
            const isPinned = pinnedApps.includes(appId);

            // Click action matching operating system taskbar behavior
            const handleClick = () => {
              if (isOpen) {
                if (openWin.isMinimized) {
                  onFocusWindow(appId); // Restore and focus
                } else if (isActive) {
                  onMinimizeWindow(appId); // Minimize active window
                } else {
                  onFocusWindow(appId); // Focus background window
                }
              } else {
                onOpenWindow(appId, app.label);
              }
            };

            return (
              <div
                key={appId}
                onClick={handleClick}
                className={`px-12 py-8 font-sans text-[10px] flex items-center gap-8 cursor-pointer select-none border border-transparent h-fit ${
                  isActive
                    ? "bg-os-window os-bevel-in"
                    : "bg-os-panel os-bevel-out"
                } ${!isOpen ? "opacity-60" : "opacity-100"}`}
              >
                <span className="text-xs">{app.icon}</span>
                <span className={`font-semibold ${!isOpen ? "italic" : ""}`}>
                  {app.label}
                </span>

                {/* Pinned Pushpin Toggle button */}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(appId);
                  }}
                  className={`ml-4 cursor-pointer text-[10px] hover:scale-125 transition-transform ${
                    isPinned ? "opacity-100" : "opacity-20 hover:opacity-80"
                  }`}
                  title={isPinned ? "Unpin from Taskbar" : "Pin to Taskbar"}
                >
                  📌
                </span>
              </div>
            );
          })}
        </div>
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
