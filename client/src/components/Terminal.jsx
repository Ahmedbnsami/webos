import { useState, useEffect, useRef } from "react";

// Simple mock terminal UI. It captures user input and displays a command history.
// For now commands are just echoed back. This can be extended to call a backend later.
export const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Auto‑focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Mock response – echo the command
    const response = `> ${input}\n${input}`;
    setHistory((prev) => [...prev, response]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-os-bg text-os-text font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1 bg-os-window border-b border-b-os-border-dark">
        <span className="font-bold">Terminal</span>
        <span className="text-xs opacity-60">$</span>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {history.length === 0 ? (
          <div className="opacity-50">Welcome to WebOS Terminal. Type commands below.</div>
        ) : (
          history.map((entry, idx) => (
            <pre key={idx} className="whitespace-pre-wrap">{entry}</pre>
          ))
        )}
      </div>

      {/* Input line */}
      <form onSubmit={handleSubmit} className="flex border-t border-t-os-border-dark">
        <span className="px-2 py-1 bg-os-window">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-os-bg text-os-text outline-none px-2 py-1"
          placeholder="Enter command…"
        />
      </form>
    </div>
  );
};
