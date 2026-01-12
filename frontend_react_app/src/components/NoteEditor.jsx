import React, { useEffect, useMemo, useRef, useState } from "react";

// PUBLIC_INTERFACE
export default function NoteEditor({ mode, initialTitle, initialContent, onSave, onCancel }) {
  /** Note editor for creating or editing a note (controlled form + validation). */
  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");
  const [touched, setTouched] = useState(false);

  const titleRef = useRef(null);

  useEffect(() => {
    // Focus title on open for better UX.
    if (titleRef.current) titleRef.current.focus();
  }, []);

  const titleError = useMemo(() => {
    if (!touched) return null;
    if (!title.trim()) return "Title is required.";
    return null;
  }, [touched, title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      content,
    });
  };

  return (
    <div className="card">
      <div className="noteViewHeader">
        <div>
          <h2 className="cardTitle">{mode === "create" ? "New note" : "Edit note"}</h2>
          <p className="muted">Your notes are stored locally in this browser (localStorage).</p>
        </div>
      </div>

      <form className="editorForm" onSubmit={handleSubmit}>
        <div>
          <p className="fieldLabel">Title</p>
          <input
            ref={titleRef}
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g., Meeting notes"
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "title-error" : undefined}
          />
        </div>

        <div>
          <p className="fieldLabel">Content</p>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note…"
          />
        </div>

        {titleError ? (
          <div id="title-error" className="validationError" role="alert">
            {titleError}
          </div>
        ) : null}

        <div className="editorActions">
          <button type="button" className="btn btnGhost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btnPrimary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
