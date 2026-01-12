import React from "react";

function previewText(content, maxLen = 90) {
  const oneLine = (content || "").replace(/\s+/g, " ").trim();
  if (!oneLine) return "No content";
  if (oneLine.length <= maxLen) return oneLine;
  return `${oneLine.slice(0, maxLen)}…`;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    // "Jan 12, 2026"
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
  } catch (_e) {
    return "";
  }
}

// PUBLIC_INTERFACE
export default function NotesList({ notes, selectedId, onSelect, onEdit, onDelete }) {
  /** Sidebar list of notes with selection and item actions. */
  if (!notes || notes.length === 0) {
    return (
      <div className="notesList">
        <div className="card" style={{ boxShadow: "var(--shadow-sm)" }}>
          <h3 className="cardTitle" style={{ fontSize: 16 }}>
            No notes
          </h3>
          <p className="muted">Create your first note using “Add Note”.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notesList" role="list" aria-label="Notes list">
      {notes.map((note) => {
        const isSelected = note.id === selectedId;

        return (
          <div
            key={note.id}
            className={`noteItem ${isSelected ? "noteItemSelected" : ""}`}
            role="listitem"
            tabIndex={0}
            onClick={() => onSelect(note.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(note.id);
            }}
            aria-label={`Note: ${note.title || "Untitled"}`}
          >
            <div>
              <div className="noteTitleRow">
                <h3 className="noteTitle">{note.title || "Untitled"}</h3>
              </div>
              <p className="notePreview">{previewText(note.content)}</p>
              <div className="noteMeta">Updated {formatDate(note.updatedAt || note.createdAt)}</div>
            </div>

            <div className="noteActions" aria-label="Note actions">
              <button
                type="button"
                className="iconBtn"
                title="Edit note"
                aria-label="Edit note"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note.id);
                }}
              >
                ✎
              </button>

              <button
                type="button"
                className="iconBtn iconBtnDanger"
                title="Delete note"
                aria-label="Delete note"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
              >
                🗑
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
