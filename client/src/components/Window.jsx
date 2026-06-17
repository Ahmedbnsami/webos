import { useState, useEffect, useRef } from "react";

export const Window = ({
  title,
  isActive,
  isMinimized,
  onMinimize,
  onClose,
  onFocus,
  children,
  defaultX = 200,
  defaultY = 120,
}) => {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (isMaximized) return; // Disable dragging when maximized
    if (e.button !== 0) return;
    if (e.target.closest("button")) return;

    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Compute dynamic window dimensions and display properties
  const windowStyle = isMaximized
    ? {
        zIndex: isActive ? 50 : 10,
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 40px)",
        display: isMinimized ? "none" : "flex",
      }
    : {
        zIndex: isActive ? 50 : 10,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "500px",
        display: isMinimized ? "none" : "flex",
      };

  return (
    <div
      onClick={onFocus}
      style={windowStyle}
      className="bg-os-window os-bevel-out os-window-shadow flex flex-col p-[3px] select-none font-sans"
    >
      {/* Title Bar */}
      <div 
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between p-4 bg-os-panel text-os-text font-bold border-b border-b-os-border-dark cursor-move select-none"
      >
        <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-wider select-none">
          <span className="text-xs">🗒️</span>
          <span>{title}</span>
        </div>
        
        {/* Minimize, Maximize, Close Buttons */}
        <div className="flex gap-4">
          {/* Minimize Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-[16px] h-[16px] bg-os-panel text-os-text text-[9px] font-mono flex items-center justify-center os-bevel-out active:os-bevel-in cursor-pointer select-none font-bold"
          >
            _
          </button>
          
          {/* Maximize Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(!isMaximized);
            }}
            className="w-[16px] h-[16px] bg-os-panel text-os-text text-[9px] font-mono flex items-center justify-center os-bevel-out active:os-bevel-in cursor-pointer select-none font-bold"
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-[16px] h-[16px] bg-os-panel text-os-text text-[9px] font-mono flex items-center justify-center os-bevel-out active:os-bevel-in cursor-pointer select-none font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="bg-os-window flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
};
