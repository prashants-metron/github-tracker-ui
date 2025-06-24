import React, { useState } from "react";
import { getRepos } from "../services/githubApi";
import RepoList from "../components/RepoList";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // 🌙 Light/Dark mode toggle

  const fetchRepos = async (pg = 1) => {
    if (!username) return;
    setLoading(true);
    setFetched(false);
    try {
      const res = await getRepos(username, pg, 10);
      setRepos(res.data);
      setPage(pg);
    } catch (err) {
      console.error("Error fetching repos:", err);
    } finally {
      setFetched(true);
      setLoading(false);
    }
  };

  const themeStyles = getThemeStyles(darkMode); // get styles based on mode

  return (
    <div style={themeStyles.wrapper}>
      <div style={themeStyles.card}>
        <div style={themeStyles.headerRow}>
          <h1 style={themeStyles.heading}>GitHub Activity Tracker</h1>
          <button onClick={() => setDarkMode(!darkMode)} style={themeStyles.themeToggle}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div style={themeStyles.inputContainer}>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={themeStyles.input}
          />
          <button onClick={() => fetchRepos(1)} style={themeStyles.button}>
            Fetch Repos
          </button>
        </div>

        {loading && <p style={themeStyles.loading}>Loading...</p>}

        <RepoList
          repos={repos}
          page={page}
          onPageChange={fetchRepos}
          owner={username}
        />
      </div>
    </div>
  );
};

const getThemeStyles = (darkMode) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: darkMode ? "#121212" : "#f4f6f8",
    color: darkMode ? "#f0f0f0" : "#000",
    padding: "2rem",
    transition: "all 0.3s ease-in-out",
  },
  card: {
    background: darkMode ? "#1e1e1e" : "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    textAlign: "left",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
    gap: "10px",
  },
  input: {
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    width: "250px",
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
  },
  button: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loading: {
    fontStyle: "italic",
    color: darkMode ? "#aaa" : "#888",
    textAlign: "center",
  },
  themeToggle: {
    background: "none",
    border: "none",
    fontSize: "1.1rem",
    cursor: "pointer",
    color: darkMode ? "#ffc107" : "#333",
  },
});

export default Dashboard;
