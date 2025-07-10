import React from "react";

export function Toast({ message, show, type = "error" }) {
  return (
    <div
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-50
        px-6 py-3 rounded-lg shadow-lg
        text-white text-sm font-semibold
        transition-all duration-300
        ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        ${type === "error" ? "bg-gray-600" : "bg-gray-600"}
      `}
    >
      {message}
    </div>
  );
}