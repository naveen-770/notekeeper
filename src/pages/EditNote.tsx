// src/pages/EditNote.tsx

import { type FormEvent, useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { useNavigate, useParams } from "react-router-dom";
import { type Note } from "../types";

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
    return <p>Note not found</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={body}
        placeholder="Note body"
        onChange={(e) => setBody(e.target.value)}
      />

      <div>
        {tags.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => toggleTag(tag.id)}
            />
            {tag.label}
          </label>
        ))}
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditNote;
