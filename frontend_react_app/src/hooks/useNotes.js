import { useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "../utils/storage";

const STORAGE_KEY = "local-notes";

function createId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeNotes(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((n) => n && typeof n === "object")
    .map((n) => ({
      id: typeof n.id === "string" ? n.id : createId(),
      title: typeof n.title === "string" ? n.title : "",
      content: typeof n.content === "string" ? n.content : "",
      createdAt: typeof n.createdAt === "string" ? n.createdAt : nowIso(),
      updatedAt: typeof n.updatedAt === "string" ? n.updatedAt : nowIso(),
    }));
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Notes CRUD store hook with localStorage persistence. */
  const [notes, setNotes] = useState(() => normalizeNotes(loadJson(STORAGE_KEY, [])));
  const [selectedId, setSelectedId] = useState(() => (notes[0]?.id ? notes[0].id : null));
  const [error, setError] = useState(null);

  // Keep selectedId valid when notes change.
  useEffect(() => {
    setSelectedId((prev) => {
      if (prev && notes.some((n) => n.id === prev)) return prev;
      return notes[0]?.id || null;
    });
  }, [notes]);

  // Persist notes
  useEffect(() => {
    const result = saveJson(STORAGE_KEY, notes);
    if (!result.ok) setError(result.error || "Failed to save notes.");
    else setError(null);
  }, [notes]);

  const selectedNote = useMemo(
    () => (selectedId ? notes.find((n) => n.id === selectedId) || null : null),
    [notes, selectedId]
  );

  // PUBLIC_INTERFACE
  const selectNote = (id) => {
    /** Select a note by id. */
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const addNote = ({ title, content }) => {
    /** Create a note; returns created note. */
    const trimmedTitle = (title || "").trim();
    const trimmedContent = content || "";

    const created = {
      id: createId(),
      title: trimmedTitle,
      content: trimmedContent,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    setNotes((prev) => [created, ...prev]);
    setSelectedId(created.id);
    return created;
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, { title, content }) => {
    /** Update note in place by id. */
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n;
        return {
          ...n,
          title: typeof title === "string" ? title : n.title,
          content: typeof content === "string" ? content : n.content,
          updatedAt: nowIso(),
        };
      })
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    /** Delete note by id. */
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId((prevSel) => (prevSel === id ? null : prevSel));
  };

  return {
    notes,
    selectedId,
    selectedNote,
    error,
    selectNote,
    addNote,
    updateNote,
    deleteNote,
  };
}
