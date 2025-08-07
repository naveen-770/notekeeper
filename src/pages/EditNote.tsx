import { type FormEvent, useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { useNavigate, useParams } from "react-router-dom";
import type { Note } from "../types";

const EditNote = () => {
  const { id } = useParams();
  const { notes, tags, updateNote } = useNotes();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === id);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setSelectedTags(note.tags.map((tag) => tag.id));
    }
  }, [note]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!note) return;

    const updatedNote: Note = {
      ...note,
      title,
      body,
      tags: tags.filter((tag) => selectedTags.includes(tag.id)),
    };

    updateNote(updatedNote);
    navigate("/");
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (!note) {
    return <p className="text-gray-500">Note not found.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <textarea
          placeholder="Write your note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 h-40"
          required
        />

        <div>
          <p className="font-medium mb-1">Tags:</p>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                  className="accent-blue-600"
                />
                {tag.label}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditNote;
