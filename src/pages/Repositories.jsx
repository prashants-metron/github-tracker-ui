import React, { useEffect, useState } from "react";
import { getRepos } from "../services/githubApi";

const Repositories = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10); // Customize if needed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) {
      fetchRepos();
    }
  }, [username, page]);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getRepos(username, page, size);
      setRepos(res.data);
    } catch (err) {
      setError("Failed to load repositories.");
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <h2>Repositories</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !repos.length && <p>No repositories found.</p>}

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong>: {repo.description || "No description"}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={prevPage} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 1rem" }}>Page {page}</span>
        <button onClick={nextPage} disabled={repos.length < size}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Repositories;
