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
        <h1 className="text-2xl font-bold mb-4">Note Not Found</h1>
        <Link to="/" className="text-blue-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <Link
          to={`/edit/${note.id}`}
          className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded transition"
        >
          Edit
        </Link>
      </div>

      {note.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {note.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
            >
              #{tag.label}
            </span>
          ))}
        </div>
      )}

      <p className="whitespace-pre-wrap text-gray-800">{note.body}</p>

      <Link to="/" className="text-blue-600 underline text-sm block mt-4">
        ← Back to Home
      </Link>
    </div>
  );
};

export default ViewNote;
