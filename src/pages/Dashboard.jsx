import React, { useState } from "react";
import { getRepos } from "../services/githubApi";
import RepoList from "../components/RepoList";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async (pg = 1) => {
    if (!username) return;
    setLoading(true);
    try {
      const res = await getRepos(username, pg, 10);
      setRepos(res.data);
      setPage(pg);
    } catch (err) {
      console.error("Error fetching repos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>GitHub Activity Tracker</h1>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "0.5rem", width: "250px", marginRight: "10px" }}
      />
      <button onClick={() => fetchRepos(1)}>Fetch Repos</button>

      {loading && <p>Loading...</p>}

      <RepoList repos={repos} page={page} onPageChange={fetchRepos} />
    </div>
  );
};

export default Dashboard;
