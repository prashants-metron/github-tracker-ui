import React, { useEffect, useState } from "react";
import { getRepos } from "../services/githubApi";
import RepoList from "../components/RepoList";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultUsername = searchParams.get("username") || "";

  const [username, setUsername] = useState(defaultUsername);
  const [repos, setRepos] = useState([]);
//   const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const defaultPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(defaultPage);


  const fetchRepos = async (pg = 1) => {
    if (!username) return;
    setLoading(true);
    setFetched(false);
    try {
      const res = await getRepos(username, pg, 10);
      setRepos(res.data);
      setPage(pg);
      setSearchParams({ username, page: pg }); // ⬅️ also store page
    } catch (err) {
      console.error("Error fetching repos:", err);
    } finally {
      setFetched(true);
      setLoading(false);
    }
  };


  // 🟡 Auto-fetch if username is present on load
  useEffect(() => {
    if (username && !fetched) {
      fetchRepos(defaultPage); // ⬅️ use correct page
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // ⌨️ Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchRepos(1);
  };

  const themeStyles = getThemeStyles(darkMode);

  return (
    <div style={themeStyles.wrapper}>
      <div style={themeStyles.card}>
        <div style={themeStyles.headerRow}>
          <h1 style={themeStyles.heading}>GitHub Activity Tracker</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={themeStyles.themeToggle}
            title="Toggle light/dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div style={themeStyles.inputContainer}>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            style={themeStyles.input}
          />
          <button
            onClick={() => fetchRepos(1)}
            disabled={loading}
            style={{
              ...themeStyles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Fetch Repos"}
          </button>
        </div>

        {loading && <p style={themeStyles.loading}>Please wait, fetching repositories...</p>}

        <RepoList repos={repos} page={page} onPageChange={fetchRepos} owner={username} />
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
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "1.5rem",
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
    fontSize: "1.2rem",
    cursor: "pointer",
    color: darkMode ? "#ffc107" : "#333",
  },
});

export default Dashboard;
