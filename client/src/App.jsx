import { useState } from "react";
import { Settings } from "./components/Settings";
import { Terminal } from "./components/Terminal";
import { Desktop } from "./components/Desktop";
import { TaskBar } from "./components/TaskBar";
import { Window } from "./components/Window";

// Stateful, persistent Notes Application
const NotesAppContent = () => {
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState({});
  const [activeCategory, setActiveCategory] = useState("");

  const [lastEdited, setLastEdited] = useState("Just now");



  const handleTextChange = (e) => {
    const text = e.target.value;
    setNotes((prev) => ({
      ...prev,
      [activeCategory]: text,
    }));
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastEdited(`Today at ${time}`);
  };

  const handleAddCategory = () => {
    const name = window.prompt("Enter new category name:");
    if (!name) return;
    const formattedName = name.trim();
    if (formattedName && !categories.includes(formattedName)) {
      const updatedCategories = [...categories, formattedName];
      setCategories(updatedCategories);
      setNotes((prev) => ({
        ...prev,
        [formattedName]: "",
      }));
      setActiveCategory(formattedName);
      setLastEdited("Just now");
    }
  };

  const handleDeleteCategory = (catToDelete, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete note "${catToDelete}"?`)) return;

    const updatedCategories = categories.filter((c) => c !== catToDelete);
    setCategories(updatedCategories);

    const updatedNotes = { ...notes };
    delete updatedNotes[catToDelete];
    setNotes(updatedNotes);

    if (activeCategory === catToDelete) {
      setActiveCategory(updatedCategories.length > 0 ? updatedCategories[0] : "");
    }
  };

  const currentContent = activeCategory ? (notes[activeCategory] || "") : "";

  return (
    <div className="flex flex-col h-[300px] font-sans">
      {/* Upper area with sidebar and editor */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className="w-[130px] bg-os-window p-8 border-r border-r-os-border-dark flex flex-col justify-between select-none">
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[220px]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <div
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLastEdited("Just now");
                  }}
                  className={`px-8 py-4 text-left font-bold text-[10px] w-full cursor-pointer select-none truncate flex items-center justify-between group ${
                    isActive
                      ? "bg-os-accent text-white"
                      : "text-os-text hover:bg-gray-200"
                  }`}
                >
                  <span className="truncate pr-4">{cat}</span>
                  <button
                    onClick={(e) => handleDeleteCategory(cat, e)}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 font-sans font-bold text-[9px] px-2 cursor-pointer transition-opacity"
                    title="Delete Note"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
            {categories.length === 0 && (
              <span className="text-[9px] text-os-border-dark p-8 italic">No notes</span>
            )}
          </div>
          <button
            onClick={handleAddCategory}
            className="text-os-border-dark text-left font-semibold text-[9px] px-8 py-4 cursor-pointer hover:text-os-text select-none shrink-0"
          >
            + New Category
          </button>
        </div>

        {/* Right Editor Area */}
        <div className="flex-1 p-8 bg-os-window flex flex-col min-w-0">
          <div className="os-bevel-in bg-white flex-1 p-12 flex flex-col justify-between text-os-text">
            {activeCategory ? (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="text-[9px] font-bold text-os-border-dark tracking-wider mb-8 uppercase shrink-0">
                  Note Editor - {activeCategory}
                </div>
                {/* Editable Textarea */}
                <textarea
                  value={currentContent}
                  onChange={handleTextChange}
                  className="text-[11px] leading-relaxed select-text flex-1 w-full h-full resize-none border-none outline-none focus:ring-0 p-0 font-sans text-os-text"
                  placeholder="Type notes here..."
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center font-sans text-os-border-dark p-16 select-none">
                <span className="text-xl mb-4">🗒️</span>
                <span className="text-[10px] font-semibold">No active note selected.</span>
                <span className="text-[9px]">Click "+ New Category" on the left to create a note.</span>
              </div>
            )}
            {activeCategory && (
              <div className="text-[9px] text-os-border-dark text-right shrink-0 mt-4 select-none">
                Last edited: {lastEdited}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status bar */}
      <div className="h-[20px] border-t border-t-os-border-dark bg-os-window px-8 flex items-center text-[9px] text-os-border-dark font-sans select-none justify-between shrink-0">
        <span>
          {activeCategory 
            ? `UTF-8 | Line ${currentContent.split("\n").length}, Column ${currentContent.length} | Ready`
            : "UTF-8 | Ready"
          }
        </span>
      </div>
    </div>
  );
};

function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [pinnedApps, setPinnedApps] = useState(["notes"]);

  // Open a window (or restore if minimized)
  const handleOpenWindow = (id, title) => {
    const existing = openWindows.find((win) => win.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setOpenWindows(openWindows.map((w) => w.id === id ? { ...w, isMinimized: false } : w));
      }
      setActiveWindowId(id);
      return;
    }
    setOpenWindows([...openWindows, { id, title, isMinimized: false }]);
    setActiveWindowId(id);
  };

  // Close a window
  const handleCloseWindow = (id) => {
    const remaining = openWindows.filter((win) => win.id !== id);
    setOpenWindows(remaining);
    if (activeWindowId === id) {
      const activeCandidates = remaining.filter((w) => !w.isMinimized);
      setActiveWindowId(activeCandidates.length > 0 ? activeCandidates[activeCandidates.length - 1].id : null);
    }
  };

  // Focus/Restore a window
  const handleFocusWindow = (id) => {
    setOpenWindows(openWindows.map((w) => w.id === id ? { ...w, isMinimized: false } : w));
    setActiveWindowId(id);
  };

  // Minimize a window
  const handleMinimizeWindow = (id) => {
    setOpenWindows(openWindows.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) {
      const remainingOpen = openWindows.filter((w) => w.id !== id && !w.isMinimized);
      setActiveWindowId(remainingOpen.length > 0 ? remainingOpen[remainingOpen.length - 1].id : null);
    }
  };

  // Toggle pinning an app
  const handleTogglePin = (id) => {
    if (pinnedApps.includes(id)) {
      setPinnedApps(pinnedApps.filter((p) => p !== id));
    } else {
      setPinnedApps([...pinnedApps, id]);
    }
  };

  return (
    <div className="bg-os-bg os-grid-bg h-screen w-screen overflow-hidden relative select-none">
      
      {/* Desktop shortcuts */}
      <Desktop onOpenWindow={handleOpenWindow} />

      {/* Map and render currently open windows */}
      {openWindows.map((win, index) => (
        <Window
          key={win.id}
          title={win.title}
          isActive={activeWindowId === win.id}
          isMinimized={win.isMinimized}
          onMinimize={() => handleMinimizeWindow(win.id)}
          onClose={() => handleCloseWindow(win.id)}
          onFocus={() => handleFocusWindow(win.id)}
          defaultX={200 + index * 30}
          defaultY={120 + index * 25}
        >
          {/* Notes App View */}
          {win.id === "notes" && <NotesAppContent />}

          {/* Terminal View */}
          {win.id === "terminal" && <Terminal />}

          {/* Settings View */}
          {win.id === "settings" && <Settings />}

          {/* Simple mock views for other programs */}
          {win.id !== "notes" && win.id !== "terminal" && win.id !== "settings" && (
            <div className="p-16 text-xs text-os-text font-mono">
              <p className="font-bold mb-4 uppercase">{win.title} Area</p>
              <p className="text-os-border-dark">This application is under construction.</p>
            </div>
          )}
        </Window>
      ))}

      <TaskBar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onOpenWindow={handleOpenWindow}
        onFocusWindow={handleFocusWindow}
        onMinimizeWindow={handleMinimizeWindow}
        pinnedApps={pinnedApps}
        onTogglePin={handleTogglePin}
      />
    </div>
  );
}

export default App;
