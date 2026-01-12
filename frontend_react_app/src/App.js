import React, { useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import NoteView from "./components/NoteView";
import EmptyState from "./components/EmptyState";
import { useNotes } from "./hooks/useNotes";

// PUBLIC_INTERFACE
function App() {
  /** Main application component (single page notes app). */
  const { notes, selectedId, selectedNote, addNote, updateNote, deleteNote, selectNote, error } =
    useNotes();

  const [mode, setMode] = useState("view"); // "view" | "edit" | "create"

  const isEmpty = notes.length === 0;

  const selectedIndex = useMemo(() => notes.findIndex((n) => n.id === selectedId), [notes, selectedId]);

  const handleStartCreate = () => {
    setMode("create");
  };

  const handleSelect = (id) => {
    selectNote(id);
    setMode("view");
  };

  const handleStartEdit = (id) => {
    if (id) selectNote(id);
    setMode("edit");
  };

  const handleCancelEdit = () => {
    setMode("view");
  };

  const handleSaveCreate = ({ title, content }) => {
    const created = addNote({ title, content });
    // Select the created note and switch to view mode.
    if (created?.id) selectNote(created.id);
    setMode("view");
  };

  const handleSaveEdit = ({ title, content }) => {
    if (!selectedNote) return;
    updateNote(selectedNote.id, { title, content });
    setMode("view");
  };

  const handleDelete = (id) => {
    const note = notes.find((n) => n.id === id);
    const confirmText = note?.title ? `Delete “${note.title}”?` : "Delete this note?";
    // eslint-disable-next-line no-alert
    const ok = window.confirm(`${confirmText}\n\nThis cannot be undone.`);
    if (!ok) return;

    deleteNote(id);
    setMode("view");
  };

  const showEditor = mode === "create" || mode === "edit";

  return (
    <div className="app">
      <Header
        onAddNote={handleStartCreate}
        noteCount={notes.length}
      />

      <div className="layout">
        <aside className="sidebar" aria-label="Notes sidebar">
          <div className="sidebarHeader">
            <h2 className="sidebarTitle">Notes</h2>
            <button className="btn btnPrimary btnSmall" onClick={handleStartCreate} type="button">
              Add Note
            </button>
          </div>

          <NotesList
            notes={notes}
            selectedId={selectedId}
            onSelect={handleSelect}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />

          {error ? (
            <div className="errorBanner" role="status" aria-live="polite">
              {error}
            </div>
          ) : null}
        </aside>

        <main className="main" aria-label="Note main pane">
          {isEmpty ? (
            <EmptyState onAddNote={handleStartCreate} />
          ) : null}

          {!isEmpty && !selectedNote ? (
            <div className="card">
              <h2 className="cardTitle">Select a note</h2>
              <p className="muted">
                Choose a note from the list to view or edit it, or create a new note.
              </p>
            </div>
          ) : null}

          {!isEmpty && selectedNote && !showEditor ? (
            <NoteView
              note={selectedNote}
              noteNumber={selectedIndex >= 0 ? selectedIndex + 1 : undefined}
              onEdit={() => handleStartEdit(selectedNote.id)}
              onDelete={() => handleDelete(selectedNote.id)}
            />
          ) : null}

          {!isEmpty && showEditor ? (
            <NoteEditor
              key={mode === "create" ? "create" : selectedNote?.id || "edit"}
              mode={mode}
              initialTitle={mode === "edit" ? selectedNote?.title || "" : ""}
              initialContent={mode === "edit" ? selectedNote?.content || "" : ""}
              onCancel={handleCancelEdit}
              onSave={mode === "create" ? handleSaveCreate : handleSaveEdit}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default App;
