import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { notes } = useNotes();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Notes</h1>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + New Note
        </Link>
      </div>
      {notes.length === 0 && (
        <p className="text-gray-500">No notes available. Create one!</p>
      )}

      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              className="block p-4 border border-gray-300 rounded hover:bg-gray-50 transition"
              to={`/note/${note.id}`}
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {note.body.substring(0, 100)}...
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {note.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                  >
                    #{tag.label}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
