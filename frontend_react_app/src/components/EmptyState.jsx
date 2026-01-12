import React from "react";

// PUBLIC_INTERFACE
export default function EmptyState({ onAddNote }) {
  /** Empty state shown when the user has no notes. */
  return (
    <div className="card">
      <h2 className="cardTitle">Create your first note</h2>
      <p className="muted">
        This app runs entirely in your browser. Notes are saved to localStorage, so they persist
        across reloads on this device.
      </p>
      <div className="editorActions" style={{ justifyContent: "flex-start", marginTop: 12 }}>
        <button type="button" className="btn btnPrimary" onClick={onAddNote}>
          Add Note
        </button>
      </div>
    </div>
  );
}
