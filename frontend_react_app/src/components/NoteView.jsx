import React from "react";

function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (_e) {
    return "";
  }
}

// PUBLIC_INTERFACE
export default function NoteView({ note, noteNumber, onEdit, onDelete }) {
  /** Read-only note view. */
  return (
    <div className="card">
      <div className="noteViewHeader">
        <div>
          <h2 className="noteViewTitle">{note.title || "Untitled"}</h2>
          <p className="noteViewMeta">
            {typeof noteNumber === "number" ? `Note ${noteNumber} • ` : ""}
            Updated {formatDateTime(note.updatedAt || note.createdAt)}
          </p>
        </div>

        <div className="editorActions" style={{ justifyContent: "flex-start" }}>
          <button type="button" className="btn btnGhost btnSmall" onClick={onEdit}>
            Edit
          </button>
          <button type="button" className="btn btnDanger btnSmall" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="noteContent">{note.content || "No content"}</div>
    </div>
  );
}
