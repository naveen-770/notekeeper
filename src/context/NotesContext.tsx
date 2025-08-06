import { createContext, useContext, useState, useEffect } from "react";
import type { Tag, Note } from "../types";

interface NotesContextType {
  notes: Note[];
  tags: Tag[];
  addNote: (note: Note) => void;
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

  return (
    <NotesContext.Provider value={{ notes, tags, addNote }}>
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

export { NotesProvider, useNotes };
