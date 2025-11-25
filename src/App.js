import React, { useState } from "react";

export default function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // --- Simple Authorization ---
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setUser({ name: "admin" });
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // --- Blog Logic ---
  const handleAddPost = () => {
    if (!newPost.trim()) return;
    setPosts([
      ...posts,
      { id: Date.now(), text: newPost }
    ]);
    setNewPost("");
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = () => {
    setPosts(
      posts.map((p) => (p.id === editingId ? { ...p, text: editingText } : p))
    );
    setEditingId(null);
    setEditingText("");
  };

  // --- UI ---
  if (!user) {
    return (
      <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <button onClick={handleLogin} style={{ padding: "8px 12px" }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>Simple Blog (Authorized User: {user.name})</h2>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Write a post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleAddPost}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((p) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            {editingId === p.id ? (
              <div>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ padding: 8, width: "100%" }}
                />
                <button onClick={handleSaveEdit} style={{ marginRight: 10 }}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{p.text}</span>
                <div>
                  <button
                    onClick={() => startEditing(p.id, p.text)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

