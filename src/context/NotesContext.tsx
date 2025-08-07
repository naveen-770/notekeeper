import { createContext, useContext, useState, useEffect } from "react";
import type { Tag, Note } from "../types";

interface NotesContextType {
  notes: Note[];
  tags: Tag[];
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const local = localStorage.getItem("notes");
    return local
      ? JSON.parse(local)
      : [
          {
            id: "1",
            title: "Sample",
            body: "This is sample note",
            tags: [{ id: "t1", label: "Work" }],
          },
        ];
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<Tag[]>([
    { id: "t1", label: "Work" },
    { id: "t2", label: "Personal" },
  ]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (item: Note) => {
    setNotes((prev) => {
      return [...prev, item];
    });
  };

  const updateNote = (updatedNote: Note) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <NotesContext.Provider value={{ notes, tags, addNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { NotesProvider, useNotes };
