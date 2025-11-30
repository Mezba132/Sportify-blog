import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostAsync } from "../../features/blog/blog_thunks";

export default function PostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !title.trim() ||
      !content.trim() ||
      !author.trim() ||
      !category.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    dispatch(
      addPostAsync({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        category: category.trim(),
      })
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 700, margin: "1rem auto", display: "grid", gap: 8 }}
    >
      <h2>New Post</h2>
      {error && <div style={{ color: "crimson" }}>{error}</div>}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={6}
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">Post</button>
      </div>
    </form>
  );
}
