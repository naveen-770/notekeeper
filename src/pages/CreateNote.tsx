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
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="w-full border border-gray-300 rounded px-4 py-2"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={body}
          className="w-full border border-gray-300 rounded px-4 py-2 h-40"
          onChange={(e) => setBody(e.target.value)}
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
                <span>{tag.label}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
