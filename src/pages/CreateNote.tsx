/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { useState, type FormEvent } from "react";
import type { Note } from "../types";
import { v4 as uuidv4 } from "uuid";

const CreateNote = () => {
  const { addNote, tags } = useNotes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newNote: Note = {
      id: uuidv4(),
      title: title,
      body: body,
      tags: tags.filter((tag) => selectedTags.includes(tag.id)),
    };

    addNote(newNote);
    navigate("/");
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((tag) => tag !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={body}
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
            <span>{tag.label}</span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Save Note
      </button>
    </form>
  );
};

export default CreateNote;
