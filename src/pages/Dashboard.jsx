import React, { useState } from "react";
import { getRepos } from "../services/githubApi";
import RepoList from "../components/RepoList";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false); // <== NEW

const fetchRepos = async (pg = 1) => {
  if (!username) return;
  setLoading(true);
  setFetched(false); // reset before fetching
  try {
    const res = await getRepos(username, pg, 10);
    setRepos(res.data);
    setPage(pg);
  } catch (err) {
    console.error("Error fetching repos:", err);
  } finally {
    setFetched(true); // <== set after fetch completes
    setLoading(false);
  }
};


  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>GitHub Activity Tracker</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <button onClick={() => fetchRepos(1)} style={styles.button}>
            Fetch Repos
          </button>
        </div>

        {loading && <p style={styles.loading}>Loading...</p>}

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

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "2rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px", // Increased from 600px to 800px
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    textAlign: "center",
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
    border: "1px solid #ccc",
    width: "250px",
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
    color: "#888",
    textAlign: "center",
  },
};

export default Dashboard;