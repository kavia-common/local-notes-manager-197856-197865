import React from "react";

// PUBLIC_INTERFACE
export default function Header({ onAddNote, noteCount }) {
  /** Top header bar with branding and primary action. */
  return (
    <header className="header">
      <div className="headerInner">
        <div className="brand">
          <h1 className="brandTitle">Local Notes</h1>
          <p className="brandMeta">
            {noteCount === 0 ? "No notes yet" : `${noteCount} note${noteCount === 1 ? "" : "s"}`}
          </p>
        </div>

        <button className="btn btnPrimary" onClick={onAddNote} type="button">
          Add Note
        </button>
      </div>
    </header>
  );
}
