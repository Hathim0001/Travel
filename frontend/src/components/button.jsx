import React from "react";

export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {children}
    </button>
  );
}
