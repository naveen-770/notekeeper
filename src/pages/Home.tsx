import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { notes } = useNotes();
  return (
    <div>
      <h1>All Notes</h1>

      {notes.length === 0 && <p>No notes available. Create one!</p>}

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>
              <h2>{note.title}</h2>
              <p>{note.body.substring(0, 100)}...</p>

              {note.tags.map((tag) => (
                <li key={tag.id}>{tag.label}</li>
              ))}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
