// src/pages/ViewNote.tsx

import { useParams, Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

const ViewNote = () => {
  const { id } = useParams();
  const { notes } = useNotes();

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return (
      <div>
        <h1>Note Not Found</h1>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.body}</p>
      {note.tags.length > 0 && (
        <ul>
          {note.tags.map((tag) => (
            <li key={tag.id}>#{tag.label}</li>
          ))}
        </ul>
      )}
      <Link to="/">← Back</Link>
    </div>
  );
};

export default ViewNote;
